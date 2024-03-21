export class MonthlySales {
    productAlias?: number;
    productName?: string;
    quantity?: number;

    constructor(productAlias: number, productName: string, quantity: number) {
        this.productAlias = productAlias ?? 0;
        this.productName = productName ?? 0;
        this.quantity = quantity ?? 0;
    }
}