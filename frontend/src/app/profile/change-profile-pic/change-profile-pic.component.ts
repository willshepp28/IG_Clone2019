import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UploadFileService } from '../../core/services/upload-file-service/upload-file.service';






@Component({
  selector: 'app-change-profile-pic',
  templateUrl: './change-profile-pic.component.html',
  styleUrls: ['./change-profile-pic.component.css']
})
export class ChangeProfilePicComponent implements OnInit {

  selectedFile: File = null;
  image: any;
 


  constructor(
    private uploadService: UploadFileService,
    private http: HttpClient
  ) { }

  ngOnInit() {
  }


  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  
    console.log(this.image);
  }

  onUpload(){

    const fd = new FormData();

    fd.append("image", this.selectedFile, this.selectedFile.name);
  
    console.log(`FD: ${fd}`);

    this.http.post<any>("http://localhost:3000/api/v1/imageUpload/changeProfile", fd)
      .subscribe(
        response => {console.log(response), this.image = response},
        error => console.log(error)
      )

  }

  

}
