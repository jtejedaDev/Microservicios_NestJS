import { Type } from 'class-transformer';
import { IsNumber, IsString, Min } from 'class-validator' //Libreria de nestJs que ayuda a validar entidades.

export class CreateProductDto {

    @IsString() // Validacion que admita solo string
    public name:string;


    //validacion obliga que sea solo numeros.
    @IsNumber({
        maxDecimalPlaces:4 //validacion que admita solo 4 decimales
    })
    @Min(0) 
    @Type(()=> Number) //transformamos de string a number el precio.
    public price:number;

}
