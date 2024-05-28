/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";

export class CreateInformDto {

    @IsString()
    @IsNotEmpty()
    inform_title: string;

    @IsString()
    @IsNotEmpty()
    inform_content: string;

    @IsString()
    @IsNotEmpty()
    id_user: number
}
