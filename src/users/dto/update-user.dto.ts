/* eslint-disable prettier/prettier */


import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsEmail, IsPhoneNumber, IsString, Min, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsString()
    user_name?: string

    @IsString()
    user_lastname?: string

    @IsString()
    user_username?: string

    @IsString()
    @MinLength(6)
    user_password?: string

    @IsEmail()
    user_email?: string

    @IsPhoneNumber('EC')
    user_phone?: string

    @Min(10)
    user_ced?: number

    @IsBoolean()
    user_status?: boolean

    role_id?: number
}
