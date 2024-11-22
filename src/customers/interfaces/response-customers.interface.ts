import { CustomerEntity } from "../entities/customer.entity";


export interface ResponseAllCustomers{
    page: number;
    lastPage: number;
    limit: number;
    total: number;
    data: CustomerEntity[];
}