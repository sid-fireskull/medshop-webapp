import { Injectable } from '@angular/core';
import { Product } from '../entity/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_VERSION, BASE_URL } from '../const/app.constants';
import { Status } from '../entity/status';
import { CustomException } from '../entity/custom-exception';
import { InsertionSummary } from '../entity/insertion-summary';
import { Information } from '../entity/information';
import { Stock } from '../entity/stock';
import { ReOrderSummary } from '../entity/re-order-summary';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getAllProducts() {
    return this.http.get<Product[]>(`${BASE_URL}/${API_VERSION}/products`);
  }

  addProduct(prod: Product) {
    return this.http.post<Information>(`${BASE_URL}/${API_VERSION}/prod`, prod);
  }

  updateProduct(prod: Product) {
    return this.http.put<Information>(`${BASE_URL}/${API_VERSION}/prod`, prod);
  }

  uploadProductCSV(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post<InsertionSummary>(`${BASE_URL}/${API_VERSION}/product`, formData, { headers });
  }

  uploadStockCSV(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post<Stock[]>(`${BASE_URL}/${API_VERSION}/stock`, formData, { headers });
  }

  //   exportReOrderCSV(summary: ReOrderSummary[])
  //   {
  //     this.http.get(url, { responseType: 'blob' })

  // .subscribe(

  // (blob) => saveAs(blob, 'file.pdf'),

  // (error) => {

  // const options = 'Failed to download file. Please try again later.';

  // this.snackBar.open(errorMessage, 'Dismiss', { duration: 5000 });

  // }

  // );
  //   }
}
