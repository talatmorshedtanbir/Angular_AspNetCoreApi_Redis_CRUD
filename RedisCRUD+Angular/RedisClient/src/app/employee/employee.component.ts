import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Employee } from './employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees : Array<Employee>= [];
  constructor (private dataService: DataService) {
    
  }
   dataSource = this.employees;
  ngOnInit(): void {
      this.dataService.get().subscribe((data: any) => this.employees = data.data);
  }
  displayedColumns = ["name", "userName", "salary", "mobileNumber"];
  editRecord(arg){
    console.log("Edit");
  }
  deleteRecord(arg){
    console.log("Delete");
  }
}
