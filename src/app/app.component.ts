import { Component } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  loaderService: LoaderService;
  title = 'medshop-webapp';
  constructor(loaderService: LoaderService){
    this.loaderService=loaderService;
  }
}

