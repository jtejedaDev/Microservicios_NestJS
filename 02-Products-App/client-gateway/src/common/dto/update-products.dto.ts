import { PartialType } from "@nestjs/mapped-types";
import { CreateProductDto } from "./create-products.dto";
import { IsNumber, IsPositive } from "class-validator";

export class UpdateProductDto extends PartialType(CreateProductDto){
}