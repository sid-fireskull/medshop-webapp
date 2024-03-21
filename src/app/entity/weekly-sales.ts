export class WeeklySales {
    id?: number;
  productAlias?: number;
  week?: number;
  month: number;
  year: number;
  invoiceCount?: number;
  quantity?: number;
  createdAt?: string;
  lastUpdatedAt?: string;

  constructor(
    month: number,
    year: number,
    id?: number,
    productAlias?: number,
    week?: number,
    invoiceCount?: number,
    quantity?: number,
    createdAt?: string,
    lastUpdatedAt?: string
  ) {
    this.id = id;
    this.productAlias = productAlias;
    this.week = week;
    this.month = month;
    this.year = year;
    this.invoiceCount = invoiceCount;
    this.quantity = quantity;
    this.createdAt = createdAt;
    this.lastUpdatedAt = lastUpdatedAt;
  }

}