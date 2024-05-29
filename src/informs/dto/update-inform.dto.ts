/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateInformDto } from './create-inform.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateInformDto extends PartialType(CreateInformDto) {
    @IsString()
    @IsOptional()
    inform_title?: string;

    @IsString()
    @IsOptional()
    inform_content?: string;

    @IsString()
    @IsOptional()
    id_user?: number;

}
