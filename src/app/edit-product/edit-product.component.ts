import { Component, Inject, OnInit } from '@angular/core';
import { Product } from '../entity/product';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  dialogRef: MatDialogRef<EditProductComponent>;
  prod: Product;

  constructor(dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) prod: Product) {
    this.dialogRef = dialogRef;
    this.prod = prod;
  }

  ngOnInit(): void {
    console.log(this.prod);
  }

  onSave(): void{
    this.dialogRef.close(this.prod);
  }

}
