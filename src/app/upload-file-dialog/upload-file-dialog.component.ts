import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-file-dialog',
  templateUrl: './upload-file-dialog.component.html',
  styleUrls: ['./upload-file-dialog.component.css']
})
export class UploadFileDialogComponent implements OnInit {
  dialogRef: MatDialogRef<UploadFileDialogComponent>;
  selectedFile: any;

  constructor(dialogRef: MatDialogRef<UploadFileDialogComponent>) {
    this.dialogRef = dialogRef;
  }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  
  onSave() {
    this.dialogRef.close(this.selectedFile);
  }
}
