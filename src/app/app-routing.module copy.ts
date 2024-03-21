import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { SalesComponent } from './sales/sales.component';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'login',  component:LoginComponent},
  {path:'products',  component:ProductsComponent},
  {path:'product/:id',  component:EditProductComponent},
  {path:'sales',  component:SalesComponent},
  {path:'summary',  component:SummaryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
