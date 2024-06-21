import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { OrderPaginationDto } from 'src/common/dto/order-pagination.dto';
import { ChangeOrderStatusDto } from './dto';


@Injectable()
export class OrdersService extends PrismaClient implements OnModuleInit{


  private readonly logger = new Logger('OrdersService');


  async  onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected');
  }

  //Metodo encargador para crear la orden en la db ordens
  create(createOrderDto: CreateOrderDto) {
    return this.order.create({
      data:createOrderDto
    });
  }

  //Metodo para buscar todas la ordenes 
  async findAll(orderPaginationDto : OrderPaginationDto) {
    const  { page, limit,status } = orderPaginationDto;
    const totalPages = await this.order.count({ where: { status : status } });
    const lastPage = Math.ceil( totalPages / limit );
   
    return {
      data: await this.order.findMany({
        skip: ( page - 1 ) * limit,
        take: limit,
        where:{
          status:status
        }
      }),
    
      meta:{
        total:totalPages,
        page:page,
        lastPage:lastPage
      }
    }
  }

 

  //Metodo para buscar registro por el uuid
 async  findOne(id: string) {
    const order = await this.order.findFirst({
      where:{id},
    });

    if(! order ){
      throw new RpcException({
        message:`Order with id #${id} not found`,
        status: HttpStatus.BAD_REQUEST
      });
    }
    return order;
  }
  async changeStatus(changeOrderStatusDto : ChangeOrderStatusDto){
    const { id,status } = changeOrderStatusDto;
    const order = await this.findOne(id);


    if ( order.status === status  ){
      return order;
    }

    return this.order.update({
      where:{id},
      data:{status:status},
    })
  }

}
