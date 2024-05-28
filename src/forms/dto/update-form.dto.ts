/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateFormDto } from './create-form.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateFormDto extends PartialType(CreateFormDto) {

    @IsString()
    @IsOptional()
    form_title?: string;

    @IsString()
    @IsOptional()
    form_content?: string;


    @IsNumber()
    @IsOptional()
    id_user?: number
}
