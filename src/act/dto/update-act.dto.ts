/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateActDto } from './create-act.dto';
import { IsBoolean, IsString, IsOptional, IsPhoneNumber, IsEmail, IsNumber } from 'class-validator';

export class UpdateActDto extends PartialType(CreateActDto) {
    
    @IsBoolean()
    @IsOptional()
    minor_age?: boolean;

    @IsBoolean()
    @IsOptional()
    disability?: boolean;

    @IsBoolean()
    @IsOptional()
    illiteracy?: boolean;

    @IsString()
    @IsOptional()
    tutor_names?: string;

    @IsString()
    @IsOptional()
    tutor_ced?: string;

    @IsPhoneNumber('EC')
    @IsOptional()
    tutor_phone?: string;

    @IsEmail()
    @IsOptional()
    tutor_email?: string;

    @IsString()
    @IsOptional()
    tutor_motive?: string

    @IsNumber()
    id_patient: number;
}
