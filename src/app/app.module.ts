import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { LoginComponent } from './login/login.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsComponent } from './products/products.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { UploadFileDialogComponent } from './upload-file-dialog/upload-file-dialog.component';
import { SalesComponent } from './sales/sales.component';
import { SummaryComponent } from './summary/summary.component';
import { GraphComponent } from './graph/graph.component';
import { FormsModule } from '@angular/forms';
import { SharedAngularMaterialModule } from './shared-angular-material-module/shared-angular-material-module.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpInterceptorBasicAuthService } from './services/http/http-interceptor-basic-auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationBarComponent,
    ProductListComponent,
    ProductsComponent,
    EditProductComponent,
    UploadFileDialogComponent,
    SalesComponent,
    SummaryComponent,
    GraphComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedAngularMaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    DataTablesModule,
    ToastrModule.forRoot()
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorBasicAuthService, multi: true },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
