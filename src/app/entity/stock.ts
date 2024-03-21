export class Stock {
    productAlias: number;
    quantity: number;
  
    constructor(productAlias: number, quantity: number) {
      this.productAlias = productAlias;
      this.quantity = quantity;
    }
  }