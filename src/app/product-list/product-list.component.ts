import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../entity/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input() products:Product[]=[];
  @Output()
  onProductClick = new EventEmitter<Product>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onSelectingProduct(prod:Product, index: number)
  {
    if(prod)
    this.onProductClick.emit(prod);
  }


}
