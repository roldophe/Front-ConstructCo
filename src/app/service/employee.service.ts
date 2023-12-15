import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { AddEmployee, Employee } from '../employee/employee';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService{

  constructor(private http: HttpClient) { }

  private apiServerUrl = environment.apiServerUrl;

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerUrl}/api/v1/employees`);
  }

  public addEmployee(employee: FormData): Observable<AddEmployee> {
   return this.http.post<AddEmployee>(`${this.apiServerUrl}/api/v1/employees`, employee);
  //  return this.http.post<AddEmployee>(`http://localhost:8080/api/v1/employees`, employee);
  }

  public updateEmployee(employeeUUID?: string , employee?: Employee): Observable<void> {
    return this.http.put<void>(`${this.apiServerUrl}/api/v1/employees/${employeeUUID}`, employee);
  }

  public deleteEmployee(employeeUUID: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/api/v1/employees/${employeeUUID}`);
  }
}
