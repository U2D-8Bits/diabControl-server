/* eslint-disable prettier/prettier */

import { IsEmail, IsPhoneNumber, IsString, Min, MinLength } from "class-validator"


export class CreateUserDto {

    @IsString()
    user_name: string

    @IsString()
    user_lastname: string

    @IsString()
    user_username: string

    @IsString()
    @MinLength(6)
    user_password: string

    @IsEmail()
    user_email: string

    @IsPhoneNumber('EC')
    user_phone: string

    @Min(10)
    user_ced: number

    role: number
}
