import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../service/file-upload.service';
import { File } from './file';
import { environment } from 'src/environments/environment.development';
import { DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  
  public files: File[] = []; // Variable to store files
  public file: File | null = null;
  public fileName: string | null=null;
  previewUrl: SafeUrl | undefined;
  // previewUrl = this.fileUploadService.previewUrl;
  baseApiUrl = environment.apiServerUrl;

  // Inject services  
  constructor(private fileUploadService: FileUploadService,private sanitizer: DomSanitizer) { }
  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };
  
  onChangeFile(event: any): void {
    this.fileUploadService.uploadFile(event).subscribe(
      (res: any) => {
        // Handle the response from the service here
        console.log(res);
        this.previewUrl = this.sanitizer.bypassSecurityTrustUrl(res.uri);
      },
      (error: any) => {
        // Handle the error here
        console.error(error);
      }
    );
  }
  ngOnInit(): void {
    this.getFiles();
    //this.getSingleFile('01ba59c4-90ba-409a-8ee4-e19caaaa56f7.jpg');
  }

  public getFiles(): void {
    this.fileUploadService.getFiles().subscribe(
      (files: File[]) => {
        this.files = files;
        console.log("FILES: ", this.files);
      },
      (error) => {
        console.error(error);
        alert(error.message);
      }
    );
  }

  public getSingleFile(fileName: string | undefined): void {
    this.fileUploadService.getFileByName(fileName).subscribe(
      (file: File) => {
        this.file = file;
        console.log('Single file', file);
      },
      (error) => {
        console.error(error);
        alert(error.message);
      }
    );
  }
}
