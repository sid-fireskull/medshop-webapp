import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InsertionSummary } from '../entity/insertion-summary';
import { API_VERSION, BASE_URL } from '../const/app.constants';
import { WeeklySales } from '../entity/weekly-sales';
import { MonthlySales } from '../entity/monthly-sales';
import { Information } from '../entity/information';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  uploadSalesCSV(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post<any>(`${BASE_URL}/${API_VERSION}/sales`, formData, { headers });
  }

  getSalesSummary(productAlias: number) {
    return this.http.get<WeeklySales[]>(`${BASE_URL}/${API_VERSION}/sales/summary/${productAlias}`);
  }

  getPreviousMonthSales() {
    return this.http.get<MonthlySales[]>(`${BASE_URL}/${API_VERSION}/sales/previousMonth`);
  }

}
