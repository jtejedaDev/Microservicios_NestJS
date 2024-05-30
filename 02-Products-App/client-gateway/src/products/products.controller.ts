import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';


@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  createProduct(){
    return `create a producto`;
  }

  @Get()
  findAllProducts(){
    return 'Esta funcion regresa todo los productos'
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
