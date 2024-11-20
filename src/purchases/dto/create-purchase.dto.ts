import { IsEnum, IsNotEmpty } from "class-validator"
import { PurchaseStatus } from "./../../common/enums/purchase-status.enum"

export class CreatePurchaseDto {
    @IsNotEmpty()
    paymentMethodId:string

    @IsNotEmpty()
    @IsEnum(PurchaseStatus)
    status:PurchaseStatus
}
