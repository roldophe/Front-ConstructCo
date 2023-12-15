import { AddEmployee, Employee} from './../employee';
import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { JobService } from 'src/app/service/job.service';
import { JOB } from 'src/app/job/job';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  providers: [EmployeeService]
})
export class EmployeeListComponent {
  public employees: Employee[] = [];
  public editEmployee: Employee | null = null;
  public deleteEmployee: Employee | null = null;

  jobs: JOB[] = [];

  protected baseImageUrl = environment.baseImageUrl;
  constructor(private employeeService: EmployeeService, private jobService:JobService) { }

  ngOnInit(): void {
    this.getEmployees();
    this.getJobs();
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
  public onAddEmployee(addForm: NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: AddEmployee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(JSON.stringify(error.error.errors));
        addForm.reset();
      }
    );
  }

  // public onAddEmployee(addForm: NgForm): void {
  //   console.log(addForm.value); // Log the form data
  
  //   document.getElementById('add-employee-form')?.click();
  
  //   this.employeeService.addEmployee(formData).subscribe(
  //     (response: AddEmployee) => {
  //       console.log(response);
  //       this.getEmployees();
  //       addForm.resetForm();
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.error("An error occurred: ", error);
  //       alert(error.error.errors); // Display the error message to the user
  //       addForm.resetForm();
  //     }
  //   );
  // }
  public onUpdateEmployee(employeeUUID?: string, employee?: Employee): void {
    console.log(employee); // Log the form data
    this.employeeService.updateEmployee(employeeUUID,employee).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
          console.error("An error occurred: ", error);
          alert(JSON.stringify(error.error.errors)); // Convert array of objects to a JSON string
        }
      
    );
  }

  public onDeleteEmployee(employeeUUID: string | undefined): void {
    if (employeeUUID) {
      this.employeeService.deleteEmployee(employeeUUID).subscribe(
        (response: void) => {
          console.log(response);
          this.getEmployees();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }
  public onOpenModal(employee: Employee | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
