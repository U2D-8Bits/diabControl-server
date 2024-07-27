/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateControlDto } from './create-control.dto';
import { IsOptional, IsString } from "class-validator";

export class UpdateControlDto extends PartialType(CreateControlDto) {

    @IsOptional()
    @IsString()
    observation: string;

    @IsOptional()
    @IsString()
    date_control: string;
  
    @IsOptional()
    @IsString()
    recommendations: string;

}
