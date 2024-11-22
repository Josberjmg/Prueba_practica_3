import { IsNotEmpty, IsNumber, IsString} from "class-validator"

export class CreateCustomerDto {

    @IsNotEmpty()
    @IsString()
    name:string
    
    @IsNotEmpty()
    @IsString()
    contact:string

    @IsNotEmpty()
    @IsString()
    address:string

    @IsNotEmpty()
    @IsString()
    city:string

    @IsNotEmpty()
    @IsNumber()
    postalCode:number

    @IsNotEmpty()
    @IsString()
    country:string
}
