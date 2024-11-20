import { PurchaseEntity } from "../entities/purchase.entity";


export interface ResponseAllPurchase{
    page: number;
    lastPage: number;
    limit: number;
    total: number;
    data: PurchaseEntity[];
}