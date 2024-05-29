/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateFormDto {

    @IsString()
    @IsNotEmpty()
    form_title: string;


    @IsString()
    @IsNotEmpty()
    form_content: string;
    

    //Creamos un campo para el id del usuario
    @IsNumber()
    @IsNotEmpty()
    id_user: number;

}
