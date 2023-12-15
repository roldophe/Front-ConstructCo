import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,  } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { JOB } from '../job/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }
  private apiServerUrl = environment.apiServerUrl;

  public getJobs(): Observable<JOB[]> {
    return this.http.get<JOB[]>(`${this.apiServerUrl}/api/v1/jobs`);
  }

}
