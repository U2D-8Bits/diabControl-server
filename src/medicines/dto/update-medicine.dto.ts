/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicineDto } from './create-medicine.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMedicineDto extends PartialType(CreateMedicineDto) {
    @IsString()
    @IsOptional()
    name_medicine?: string;

    @IsString()
    @IsOptional()
    generic_name?: string;

    @IsNumber()
    @IsOptional()
    idCategory?: number;
}
