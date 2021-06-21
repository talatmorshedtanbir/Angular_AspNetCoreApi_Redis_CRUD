import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../employee/employee';

@Component({
  selector: 'app-addupdate',
  templateUrl: './addupdate.component.html',
  styleUrls: ['./addupdate.component.css']
})
export class AddupdateComponent implements OnInit {
  @Output() employeeCreated = new EventEmitter<any>();
  @Input() employee: Employee;

  constructor() { 
    this.clearEmployee();
    this.employee = {
      id: 4440,
      name: "",
      userName: "",
      salary: 0,
      mobileNumber: ''
    };
    
  }

  ngOnInit(): void {
  }
  // Create an empty note object
  clearEmployee() {
    console.log("res");
    this.employee = {
      id: Math.random(),
      name: "",
      userName: '',
      salary: 0,
      mobileNumber: ''
    };
  };
  addUpdateEmployee (emp) {
    this.employeeCreated.emit(this.employee);
    this.clearEmployee();
  };
}
