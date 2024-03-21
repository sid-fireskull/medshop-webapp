export class ReOrderSummary {
    productAlias: number;
    quantity: number;
    reOrder: number;

    constructor(productAlias: number, quantity: number, reOrder: number) {
        this.productAlias = productAlias;
        this.quantity = quantity ?? 0;
        this.reOrder = reOrder ?? 0;
    }

}