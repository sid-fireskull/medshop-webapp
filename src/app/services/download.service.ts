import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { ReOrderSummary } from '../entity/re-order-summary';
import { API_VERSION, BASE_URL } from '../const/app.constants';

// npm i --save-dev @types/file-saver
@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  private http: HttpClient

  constructor(http: HttpClient) {
    this.http = http;
  }

  exportReOrderFile(summary: ReOrderSummary[]) {
    return this.http.post(`${BASE_URL}/${API_VERSION}/export`, summary, { responseType: 'blob' });
  }
  
}
