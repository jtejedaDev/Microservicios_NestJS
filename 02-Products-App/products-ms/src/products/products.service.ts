import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  
  private readonly logger = new Logger('ProductsService');

  onModuleInit() {
    this.$connect();
    this.logger.log(`Database connected`);
  }
  
  //metodo para crear un producto en la db SQLite
  create(createProductDto: CreateProductDto) {
    return this.product.create({
      data: createProductDto
    });
  }

  //Metodo de busqueda de registros.
  async findAll( paginationDto : PaginationDto ) {
    const  { page, limit } = paginationDto;
    const totalPages = await this.product.count({ where: { available:true } });
    const lastPage = Math.ceil( totalPages / limit );
   
    return {
      data: await this.product.findMany({
        skip: ( page - 1 ) * limit,
        take: limit,
        where:{
          available: true,
        }
      }),
    
      meta:{
        total:totalPages,
        page:page,
        lastPage:lastPage
      }
    }
  }

  
  async findOne(id: number) {
    const product = await this.product.findFirst({
      where:{id, available:true},
    })

    if( !product ){
      throw new NotFoundException(`Product with id #${ id } not found`)
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    
   await this.findOne(id);
    
    return this.product.update({
      where:{id, available:true},
      data:updateProductDto,
    })

  }

  async remove(id: number) {
    const  logger = new Logger('Product');

    try{
     const product = await this.product.update({
      where:{id},
      data:{
        available: false
      }
     })
     return product
    }catch(error){
      logger.log(`Producto not found with id ${id} to delete`);
    }
  }
}
