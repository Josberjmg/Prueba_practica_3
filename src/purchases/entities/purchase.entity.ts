import { Column, Entity, JoinColumn, ManyToOne } from "typeorm"
import { BaseEntity } from "./../../common/config/base.entity"
import { PurchaseStatus } from "./../../common/enums/purchase-status.enum"
import { PaymentMethodEntity } from "./../../payment-methods/entities/payment-method.entity"
import { CustomerEntity } from "./../../customers/entities/customer.entity"

@Entity("purchase")
export class PurchaseEntity extends BaseEntity {
    @Column({type:"varchar"})
    paymentMethodId:string

    @Column({type:"enum", enum: PurchaseStatus})
    status:PurchaseStatus

    @ManyToOne(()=> PaymentMethodEntity, (paymentMethods)=>paymentMethods.purchases)
    @JoinColumn({name: "payment_Method_Id"})
    paymentMethod:string

    @ManyToOne(()=> CustomerEntity, (customer)=>customer.purchase)
    @JoinColumn({name: "Customer_Id"})
    customer:string
}
