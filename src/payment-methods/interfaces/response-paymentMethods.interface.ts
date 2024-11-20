import { PaymentMethodEntity } from "../entities/payment-method.entity";

export interface ResponseAllPaymentMethods{
    page: number;
    lastPage: number;
    limit: number;
    total: number;
    data: PaymentMethodEntity[];
}