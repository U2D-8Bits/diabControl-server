/* eslint-disable prettier/prettier */

import { IsBoolean, IsDate, IsEmail, IsNumber, IsPhoneNumber, IsString, MinLength } from "class-validator"


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

    @IsString()
    user_address: string

    @IsDate()
    user_birthdate: Date

    @IsString()
    user_genre: string

    @IsString()
    user_ced: string

    @IsBoolean()
    user_status: boolean

    @IsNumber()
    role_id: number
}
