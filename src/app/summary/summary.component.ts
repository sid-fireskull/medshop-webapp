import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { WeeklySales } from '../entity/weekly-sales';
import { SalesService } from '../services/sales.service';
import { ProductService } from '../services/product.service';
import { Product } from '../entity/product';
import { DatePipe } from '@angular/common';
import { Subject, iif } from 'rxjs';
import { UploadFileDialogComponent } from '../upload-file-dialog/upload-file-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { ReOrderSummary } from '../entity/re-order-summary';
import { DownloadService } from '../services/download.service';
import saveAs from 'file-saver';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  readonly DROPDOWN_NAME = "Product Name";
  readonly DROPDOWN_STOCK = "Stock";
  readonly DROPDOWN_REORDER = "Re-Order";
  datePipe: DatePipe;
  productService: ProductService;
  downloadService: DownloadService;
  salesService: SalesService;
  fileUploadDialog: MatDialog;
  toastrService: ToastrService;
  products: Product[] = [];
  stockMapper: Map<number, number> = new Map<number, number>();
  reOrderMapper = new Map<number, number>();
  arrangedSales = new Map<Date, WeeklySales[]>();
  weeklySales: WeeklySales[] = [];
  dataRows: any[] = [];
  summary: ReOrderSummary[] = [];
  selectedProduct: string = "";
  selectedProd: Product = new Product();
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  // @ViewChild(DataTableDirective)
  // dtElement: DataTableDirective;


  constructor(productService: ProductService, salesService: SalesService, datePipe: DatePipe, fileUploadDialog: MatDialog, toastrService: ToastrService, downloadService: DownloadService) {
    this.productService = productService;
    this.salesService = salesService;
    this.datePipe = datePipe;
    this.fileUploadDialog = fileUploadDialog;
    this.toastrService = toastrService;
    this.downloadService = downloadService;
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 25,
      lengthChange: false,
      language: {
        searchPlaceholder: "Search Product"
      },
    };
    this.retriveProducts();
    //this.getSummary(511);
  }

  // rerender() {
  //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //     // Destroy the table first in the current context
  //     dtInstance.destroy();

  //     // Call the dtTrigger to rerender again
  //     this.dtTrigger.next(null);

  //   });
  // }


  onSelectItem(item: Product): void {
    this.dataRows = [];
    console.log(this.dataRows.length);
    this.selectedProd = item;
    this.selectedProduct = item.productName;
    this.getSummary(item.productAlias);
  }

  sort(value: string): void {
    for (let i = 0; i < this.products.length; i++) {
      const prod: Product = this.products[i];
      let prodAlias = prod.productAlias ?? 0;
      this.products[i].reOrderQuantity = this.reOrderMapper.get(prodAlias) || 0;
      this.products[i].stockQuantity = this.stockMapper.get(prodAlias) || 0;
    }

    if (value === this.DROPDOWN_REORDER) {
      this.products.sort((first: Product, second: Product) =>
        second.reOrderQuantity - first.reOrderQuantity // Simple numerical comparison
      );
    } else if (value === this.DROPDOWN_STOCK) {
      this.products.sort((first: Product, second: Product) =>
        second.stockQuantity - first.stockQuantity
      );
    } else {
      this.products.sort((first: Product, second: Product) =>
        first.productName.localeCompare(second.productName) // Case-insensitive comparison
      );
    }
  }

  getSummary(prodAlias: number) {
    this.salesService.getSalesSummary(prodAlias).subscribe(res => {
      this.weeklySales = res;
      this.arrangedSales.clear();
      for (const element of this.weeklySales) {
        const dt: Date = new Date(element.year, element.month, 1);
        if (!this.arrangedSales.has(dt)) {
          const temp: WeeklySales[] = [element];
          this.arrangedSales.set(dt, temp);
        } else {
          this.arrangedSales.get(dt)?.push(element);
        }
      }
      this.getRows();
    });
  }

  retriveSummaryByProductAlias(productAlias: number) {
    this.salesService.getSalesSummary(productAlias).subscribe(res => {
      this.weeklySales = res;
    });
  }

  retriveProducts() {
    this.productService.getAllProducts().subscribe(res => {
      this.products = res;
      this.dtTrigger.next(null);
    });
  }

  uploadStocks() {
    this.fileUploadDialog.open(UploadFileDialogComponent, {
      height: '12.25rem',
      width: '37.5rem',
      panelClass: 'custom-dialog-style'
    }).afterClosed().subscribe(data => {
      if (data) {
        this.productService.uploadStockCSV(data).subscribe(res => {
          res.forEach(element => {
            //  console.log("[+] Stock Mapper: " + element.productAlias + " : " + element.quantity);
            this.stockMapper.set(element.productAlias, element.quantity);
          });
        })
      }
      else {
        console.log("No Data");
      }
    });
  }

  downloadCSV() {
    this.summary = [];
    console.log("[+] Before Iterator");
    for (let i = 0; i < this.products.length; i++) {
      var qty: number | undefined = 0
      if (this.stockMapper.has(this.products[i].productAlias))
        qty = this.stockMapper.get(this.products[i].productAlias);
      else
        qty = 0;
      console.log("StockQuantity: " + this.products[i].productAlias + " : " + this.stockMapper.has(this.products[i].productAlias));
      if (qty != undefined && qty > 0) {
        this.products[i].stockQuantity = qty;
      }
      else {
        this.products[i].stockQuantity = 0;
      }
    }
    // this.rerender();
    this.products.forEach((item) => {
      var element = new ReOrderSummary(item.productAlias, item.stockQuantity, item.reOrderQuantity);
      this.summary.push(element);
    });
    console.log(JSON.stringify(this.summary));
    this.downloadService.exportReOrderFile(this.summary)
      .subscribe(
        (blob) => saveAs(blob, 'reorder.csv'),
      );
  }


  getRows() {
    console.log(this.dataRows.length);
    this.arrangedSales.forEach((value, key) => {
      console.log("[+] Value: " + value);
      const cells: any[] = ["", 0, 0, 0, 0, 0, 0];
      const monthLabel = this.datePipe.transform(key, "MMM yyyy");
      cells[0] = monthLabel;

      for (let counter = 0; counter < value.length; counter++) {
        const qty = value[counter].quantity;
        switch (value[counter].week) {
          case 0:
            cells[2] = qty;
            break;
          case 1:
            cells[3] = qty;
            break;
          case 2:
            cells[4] = qty;
            break;
          case 3:
            cells[5] = qty;
            break;
          case 4:
            cells[6] = qty;
            break;
        }
      }

      const totalQty = this.calculateTotalQty(cells);
      cells[1] = totalQty ?? 0;
      this.dataRows.push(cells);
    });
    console.log("[+] Datarows after adding: " + this.dataRows.length);
  }


  calculateTotalQty(cells: any[]): number {
    let totalQty: number = 0;
    for (let i: number = 2; i < 7; i++) {
      totalQty = totalQty + cells[i];
    }
    return totalQty;
  }
}
