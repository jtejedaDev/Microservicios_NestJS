import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, isString } from "class-validator";

export class CreateProductDto {
    
    @IsString()
    @IsOptional()    
    name?:string;
    
    @IsString()
    @IsOptional()
    description?:string;
    
    @IsNumber()
    @Type(()=> Number)
    price:number;
}
