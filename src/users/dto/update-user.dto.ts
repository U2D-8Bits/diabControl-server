/* eslint-disable prettier/prettier */


import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    user_name?: string

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    user_lastname?: string

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    user_username?: string

    @IsString()
    @MinLength(6)
    @IsOptional()
    @IsNotEmpty()
    user_password?: string

    @IsEmail()
    @IsOptional()
    @IsNotEmpty()
    user_email?: string

    @IsPhoneNumber('EC')
    @IsOptional()
    @IsNotEmpty()
    user_phone?: string

    @IsNumber()
    @IsOptional()
    @IsNotEmpty()
    user_age?: number;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    user_address?: string

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    user_birthdate?: string

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    user_genre?: string

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    user_ced?: string

    @IsBoolean()
    @IsOptional()
    @IsNotEmpty()
    user_status?: boolean

    @IsBoolean()
    @IsOptional()
    @IsNotEmpty()
    user_admin?: boolean

    @IsOptional()
    @IsNotEmpty()
    role_id?: number
}
