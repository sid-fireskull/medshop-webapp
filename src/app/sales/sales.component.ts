import { Component, OnInit } from '@angular/core';
import { SalesService } from '../services/sales.service';
import { MatDialog } from '@angular/material/dialog';
import { UploadFileDialogComponent } from '../upload-file-dialog/upload-file-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { InsertionSummary } from '../entity/insertion-summary';
import { Information } from '../entity/information';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  salesService: SalesService;
  fileUploadDialog: MatDialog;
  toastrService: ToastrService;

  constructor(salesService: SalesService, fileUploadDialog: MatDialog, toastrService: ToastrService) {
    this.salesService = salesService;
    this.fileUploadDialog = fileUploadDialog;
    this.toastrService = toastrService;
  }

  ngOnInit(): void {
  }

  uploadSales() {
    this.fileUploadDialog.open(UploadFileDialogComponent, {
      height: '12.25rem',
      width: '37.5rem',
      panelClass: 'custom-dialog-style'
    }).afterClosed().subscribe(data => {
      if (data) {
        this.salesService.uploadSalesCSV(data).subscribe(res => {
          if (res.hasOwnProperty('hasError')) {
            // If Server send a message
            let resp = <Information>res;
            resp instanceof Information && !resp.hasError ? this.toastrService.success(resp.message) : this.toastrService.error(resp.message);
            return;
          }

          // If Server send Insertion summary
          let resp = <InsertionSummary>res;
          this.toastrService.success(`Total Record: ${resp.totalRecord}`)
          this.toastrService.success(`Total Inserted Record: ${resp.totalInsertedRecord}`);
          this.toastrService.success(`Total Updated Record: ${resp.totalUpdatedRecord}`);
        })
      }
      else {
        console.log("No Data");
      }
    });
  }
}
