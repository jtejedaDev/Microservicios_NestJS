import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, ParseIntPipe, ParseUUIDPipe } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ORDER_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { OrderPaginationDto, StatusDto } from './dto';
import { PaginationDto } from 'src/products/dto/pagination.dto';

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
  findAll(@Query() orderpaginationDto:OrderPaginationDto) {
    return this.orderClient.send('findAllOrders',orderpaginationDto).pipe(catchError(err=>{throw new RpcException(err)}));
  }

  @Get('id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderClient.send('findOneOrder',{id}).pipe(catchError(err=>{throw new RpcException(err)}));
  }


  @Get(':status')
  async findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto:PaginationDto) {
    return this.orderClient.send('findAllOrders',{
      ...paginationDto,
      status:statusDto.status,
    }).pipe(catchError(err=>{throw new RpcException(err)}));
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id:string,
    @Body() statusDto: StatusDto ){
      return this.orderClient.send('changeOrderStatus',{id, status:statusDto.status}).pipe(catchError(err=>{throw new RpcException(err)}));
    }

}
