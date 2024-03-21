export class Product {
    id?: number;
    attr?: string;
    marketingGroup?: string;
    productAlias: number;
    productName: string;
    vendor?: string;
    createdAt: string;
    lastUpdatedAt: string;
    stockQuantity: number;
    reOrderQuantity: number;

    constructor(id?: number, 
        attr?: string, 
        marketingGroup?: string, 
        productAlias?: number, 
        productName?: string, 
        vendor?: string,
        createdAt?: string,
        lastUpdatedAt?: string,
        stockQuantity?: number,
        reOrderQuantity?: number) {
        this.id = id ?? -1;
        this.marketingGroup = marketingGroup ?? "";
        this.attr = attr ?? "";
        this.productAlias = productAlias ?? -1;
        this.productName = productName ?? "";
        this.vendor = vendor ?? "";
        this.createdAt = createdAt ?? "";
        this.lastUpdatedAt = lastUpdatedAt ?? "";
        this.stockQuantity = stockQuantity ?? 0;
        this.reOrderQuantity = reOrderQuantity ?? 0;
    }
}