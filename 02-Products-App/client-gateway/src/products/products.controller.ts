import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PRODUCT_SERVICE } from 'src/config';


@Controller('products')
export class ProductsController {
  constructor(
    //Inyeccion de comunicacion con el microservicio 
    @Inject(PRODUCT_SERVICE) private readonly productClient:ClientProxy,
  ) {}

  @Post()
  createProduct(){
    return `create a producto`;
  }

  @Get()
  findAllProducts(@Query() paginationDto : PaginationDto){
    return this.productClient.send({ cmd: 'find_all_products' }, paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string){
    return 'Esta funcion regresa el producto' + id
  }


  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: string){
    return 'Esta funcion elimina el producto' + id
  }

  @Patch(':id')
  patchProduct(
    @Param('id', ParseIntPipe) id : string,
    @Body() body:any){
    return 'Esta funcion actualiza el producto '+ id;
  }


}
