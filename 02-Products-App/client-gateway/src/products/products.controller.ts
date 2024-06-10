import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Inject, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateProductDto } from 'src/common/dto/create-products.dto';

import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateProductDto } from 'src/common/dto/update-products.dto';
import { PRODUCT_SERVICE } from 'src/config';


@Controller('products')
export class ProductsController {
  constructor(
    //Inyeccion de comunicacion con el microservicio 
    @Inject(PRODUCT_SERVICE) private readonly productClient:ClientProxy,
  ) {}

  @Post()
  createProduct(@Body() createProductDto : CreateProductDto){
    return this.productClient.send({ cmd:'create_product' }, createProductDto).pipe(catchError(err=>{ throw new RpcException(err) }))
  }

  @Get()
  findAllProducts(@Query() paginationDto : PaginationDto){
    return this.productClient.send({ cmd: 'find_all_products' }, paginationDto).pipe(catchError(err => { throw new RpcException(err) }))
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string){
    try {
      const product = await firstValueFrom(
      this.productClient.send({ cmd: 'find_one_product' }, { id })  );

      return product;
    } catch (error) {
      throw new RpcException(error);
    }
}


  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: string){
    return this.productClient.send({ cmd: 'delete_product' },{id}).pipe(catchError(err => { throw new RpcException(err) }));
  }

  @Patch(':id')
  patchProduct(
    @Param('id', ParseIntPipe) id : number,
    @Body() updateProductDto : UpdateProductDto){
    return this.productClient.send({cmd:'update_product'},{
      id, 
      ...updateProductDto
    }).pipe(
      catchError(err=> {throw new RpcException(err)})
    )
  }
}
