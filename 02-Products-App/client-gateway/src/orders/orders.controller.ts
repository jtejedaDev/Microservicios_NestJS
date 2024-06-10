import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, ParseIntPipe } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ORDER_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('orders')
export class OrdersController {
  constructor(
//Comunicacion con el microservicio Orders
@Inject(ORDER_SERVICE) private readonly orderClient:ClientProxy,

  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderClient.send('createOrder', createOrderDto).pipe(catchError(err=>{throw new RpcException(err)}));
  }

  @Get()
  findAll(@Query() paginationDto:PaginationDto) {
    return this.orderClient.send('findAllOrders',paginationDto).pipe(catchError(err=>{throw new RpcException(err)}));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.orderClient.send('findOneOrder',{id}).pipe(catchError(err=>{throw new RpcException(err)}));
  }

}
