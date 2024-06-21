import { IsEnum, IsOptional } from "class-validator";
import { PaginationDto } from "./pagination.dto";
import { OrderStatusList } from "src/orders/enum/order.enum";
import { OrderStatus } from "@prisma/client";

export class OrderPaginationDto extends PaginationDto{
    @IsOptional()
    @IsEnum( OrderStatusList, {
        message:`Valid status are ${ OrderStatusList }`
    })
    status: OrderStatus

}