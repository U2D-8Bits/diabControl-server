/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateFileDto } from './create-file.dto';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateFileDto extends PartialType(CreateFileDto) {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    path?: string;

    @IsNumber()
    @IsOptional()
    user_id?: number;
}
