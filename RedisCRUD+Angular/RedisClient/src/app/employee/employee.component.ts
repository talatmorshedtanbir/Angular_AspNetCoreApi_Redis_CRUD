import { Component, Input, OnInit } from '@angular/core';
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
  ngOnChanges() {
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
}
