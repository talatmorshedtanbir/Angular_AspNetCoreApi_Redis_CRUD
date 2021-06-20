import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Employee } from './employee';
import * as _ from 'lodash';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees : Array<Employee>= [];
  currentEmployee: any;
  constructor (private dataService: DataService) {
    
  }
   dataSource = this.employees;
  ngOnInit(): void {
    this.fetchData();
  }
  displayedColumns = ["name", "userName", "salary", "mobileNumber", "options"];
  editRecord(arg){
    console.log(arg.employees[0].id);
  }

  deleteRecord(employee){
    console.log(employee)
    const deleteIndex = _.findIndex(this.employees, { userName: employee.userName });
    this.dataService.remove(employee).subscribe(
      result => {this.employees.splice(deleteIndex, 1);
        this.fetchData();}
    );
    
  }

  fetchData(){
    this.dataService.get().subscribe((data: any) => this.employees = data.data);
  }

  createUpdateEmployee  (employee: any) {
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
      console.log(employee);
    }
    this.currentEmployee = this.getDefaultEmployee();
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
