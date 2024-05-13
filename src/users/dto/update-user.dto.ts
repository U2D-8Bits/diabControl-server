/* eslint-disable prettier/prettier */


import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsEmail, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsString()
    @IsOptional()
    user_name?: string

    @IsString()
    @IsOptional()
    user_lastname?: string

    @IsString()
    @IsOptional()
    user_username?: string

    @IsString()
    @MinLength(6)
    @IsOptional()
    user_password?: string

    @IsEmail()
    @IsOptional()
    user_email?: string

    @IsPhoneNumber('EC')
    @IsOptional()
    user_phone?: string

    @IsString()
    @IsOptional()
    user_ced: string

    @IsBoolean()
    @IsOptional()
    user_status?: boolean

    @IsOptional()
    role_id?: number
}
