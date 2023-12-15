import { JobService } from './../service/job.service';
import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from '../service/employee.service';
import { JOB } from '../job/job';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  
})
export class EmployeeComponent implements OnInit {
  
  public employees: Employee[] = [];
  public jobs:JOB[] = [];
  constructor(private employeeService: EmployeeService, private jobService:JobService) { }
  ngOnInit(): void {
    //  this.getEmployees();
    //  this.getJobs();
  }
  public getJobs(): void {
    this.jobService.getJobs().subscribe((job:JOB[]) => {
      this.jobs = job;
      console.log("JOBS: ",this.jobs)
    },
    (error) => {
      console.error(error); // Log the error to the console
      alert(error.message);
    })
  }
  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        console.log(this.employees);
      },
      (error) => {
        console.error(error); // Log the error to the console
        alert(error.message);
      }
    );
  }
}