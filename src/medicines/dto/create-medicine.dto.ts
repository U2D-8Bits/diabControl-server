/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMedicineDto {

    @IsString()
    @IsNotEmpty()
    name_medicine: string;

    @IsString()
    @IsNotEmpty()
    generic_name: string;

    @IsNumber()
    @IsNotEmpty()
    idCategory: number;
}
