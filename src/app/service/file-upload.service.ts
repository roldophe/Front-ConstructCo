import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { File } from '../file-upload/file';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  // API url 
  baseApiUrl = environment.apiServerUrl;

  previewUrl: SafeUrl | undefined;
  constructor(private http: HttpClient,private sanitizer: DomSanitizer) { }

  public getFiles(): Observable<File[]> {
    return this.http.get<File[]>(`${this.baseApiUrl}/api/v1/files`);
  }

  public getFileByName(fileName?:string): Observable<File> {
    return this.http.get<File>(`${this.baseApiUrl}/api/v1/files/${fileName}`);
  }


  // define function to upload files
  uploadFile(event: any): Observable<File> {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
    
      if (file.type === 'image/png' || file.type === 'image/jpeg') {
        const formData = new FormData();
        formData.append('file', file);
    
        return this.http.post<File>(`${this.baseApiUrl}/api/v1/files/single`, formData).pipe(
          catchError((error: any) => {
            console.error(error);
            alert('An error occurred while uploading the file.');
            return throwError(error); // Rethrow the error or throw a custom error
          })
        );
      } else {
        alert('Please select a file in JPEG or PNG format only.');
        return throwError('Invalid file type');
      }
    }
  
    return throwError('No file selected');
  }
  
}