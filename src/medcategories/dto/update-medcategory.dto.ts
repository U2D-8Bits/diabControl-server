/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateMedcategoryDto } from './create-medcategory.dto';
import { IsString } from 'class-validator';

export class UpdateMedcategoryDto extends PartialType(CreateMedcategoryDto) {

    @IsString()
    name_category: string;
}
