import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';
import { Employee } from './employee';
import * as _ from 'lodash';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees : Array<Employee>= [];;
  @Output() employeeEdited = new EventEmitter<any>();
  dataSource = this.employees;
  constructor (private dataService: DataService) {
  }

  ngOnInit(): void {
    this.fetchData();
  }

  ngOnChanges() {
}   

  displayedColumns = ["name", "userName", "salary", "mobileNumber", "options"];

  public editRecord(record) {
    this.employeeEdited.emit(record);
  }

  deleteRecord(employee){
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
