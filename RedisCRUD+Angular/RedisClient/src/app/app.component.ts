import { Component, OnInit } from '@angular/core';
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
  }
  createUpdateEmployee  (employee: any) {
    employee.id = Math.floor(Math.random() * 100) 
    employee.salary = parseInt(employee.salary);
    let employeeWithId = _.find(this.employees, (el => el.id === employee.id));
    if (employeeWithId) {
      const updateIndex = _.findIndex(this.employees, { id: employeeWithId.id });
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

