import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { Product } from '../entity/product';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../services/product.service';
import { UploadFileDialogComponent } from '../upload-file-dialog/upload-file-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { Information } from '../entity/information';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  productList: Product[] = [];
  private toastrService: ToastrService;
  private prodService: ProductService;
  private prodDialog: MatDialog;
  private fileUploadDialog: MatDialog;
  private snackBar: MatSnackBar;
  selectedProduct: Product;


  constructor(prodDialog: MatDialog,
    fileUploadDialog: MatDialog,
    snackBar: MatSnackBar,
    prodService: ProductService,
    toastrService: ToastrService
  ) {
    this.prodDialog = prodDialog;
    this.fileUploadDialog = fileUploadDialog;
    this.snackBar = snackBar;
    this.prodService = prodService;
    this.toastrService = toastrService;
    this.selectedProduct = new Product();
  }

  ngOnInit(): void {
    this.retriveProducts();
  }

  populateProductDetails(prod: Product) {
    this.selectedProduct = prod;
  }

  openUploadProductDialog() {
    this.fileUploadDialog.open(UploadFileDialogComponent, {
      height: '12.25rem',
      width: '37.5rem',
      panelClass: 'custom-dialog-style'
    }).afterClosed().subscribe(data => {
      if (data) {
        this.prodService.uploadProductCSV(data).subscribe(res => {
          this.toastrService.success(`Total Record: ${res.totalRecord}`)
          this.toastrService.success(`Total Inserted Record: ${res.totalInsertedRecord}`);
          this.toastrService.success(`Total Updated Record: ${res.totalUpdatedRecord}`);
          this.retriveProducts();
        })
      }
      else {
        console.log("No Data");
      }
    });
  }

  openEditProduct(prod: Product) {
    this.prodDialog.open<EditProductComponent, Product>(EditProductComponent, {
      data: prod,
      height: '26.25rem',
      width: '37.5rem',
      panelClass: 'custom-dialog-style'
    }).afterClosed().subscribe(data => {
      if (data) {
        this.prodService.updateProduct(data).subscribe(res => {
          this.conditionalToastDisplay(res);
          this.retriveProducts();
        })
      }
      else {
        console.log("No Data");
      }
    });
  }


  openAddProduct() {
    this.prodDialog.open<EditProductComponent, Product>(EditProductComponent, {
      data: new Product(),
      height: '26.25rem',
      width: '37.5rem',
      panelClass: 'custom-dialog-style'
    }).afterClosed().subscribe(data => {
      if (data) {
        console.log("[+] After Data Collected");
        this.prodService.addProduct(data).subscribe(res => {
          this.conditionalToastDisplay(res);
          this.retriveProducts();
        })
      }
      else {
        console.log("No Data");
      }
    });
  }

  retriveProducts(): void {
    this.prodService.getAllProducts().subscribe(
      res => {
        console.log(res);
        this.productList = res;
      }
    );
  }

  conditionalToastDisplay(res: Information) {
    !res.hasError ? this.toastrService.success(res.message) : this.toastrService.error(res.message);
  }
}
