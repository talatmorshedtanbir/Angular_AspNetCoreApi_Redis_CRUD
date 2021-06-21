import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from './data.service';
import { Employee } from './employee/employee';
import * as _ from 'lodash';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  employees : Array<Employee>= [];
  currentEmployee : Employee = this.getDefaultEmployee();

  title = 'RedisClient';
  constructor (private dataService: DataService) {
  }

  ngOnInit(){
    this.fetchData();
  }

  createUpdateEmployee  (employee: any) {
    let tempId = employee.id;
    employee.id = Math.floor(Math.random() * 100) 
    employee.salary = parseInt(employee.salary);
    let employeeWithId = _.find(this.employees, (el => el.id === tempId));
    if (employeeWithId) {
      employee.id = tempId;
      const updateIndex = _.findIndex(this.employees, { id: tempId });
      this.dataService.update(employee).subscribe(
        result => this.employees.splice(updateIndex, 1, employee)
      );
    } else {
      this.dataService.add(employee).subscribe(       
        employeeRecord => {
          employee.id = employeeRecord;
          this.employees.push(employee)
        }
      );
    }
    this.currentEmployee = this.getDefaultEmployee();
    window.location.reload();
  };

  updateEmployeeData(data){
    this.currentEmployee = data;
  }

  fetchData(){
    this.dataService.get().subscribe((data: any) => this.employees = data.data);
  }

  getDefaultEmployee(){
    return {
      id: 0,
      name: '',
      userName: '',
      salary: 0,
      mobileNumber: ''
    };
  }
}

