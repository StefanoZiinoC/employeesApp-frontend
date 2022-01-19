import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();

  }

  resetForm(form: NgForm) {
    form.reset();

  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(
     (res) => {
      this.employeeService.employees = res;
      console.log(this.employeeService.employees)
      
    },
    (err) => console.error(err)
    );
  }

  addEmployee(form: NgForm) {
    if (form.value._id) {
      this.employeeService.createEmployee(form.value).subscribe(
        res => console.log(res),
        err => console.error(err)
      )
    } else {
      this.employeeService.createEmployee(form.value).subscribe(
        res => {
          this.getEmployees();
          form.reset();
        },
        err => console.log(err)
      );
    }
  }

  deleteEmployee(id: string) {
      this.employeeService.deleteEmployee(id).subscribe(
        res => console.log(res),
        err => console.error(err)
      );
  }

  editEmployee(employee: Employee) {
    console.log(employee);
    
    this.employeeService.selectedEmployee = employee;
    
    this.employeeService.putEmployee(this.employeeService.selectedEmployee);
  }
}
