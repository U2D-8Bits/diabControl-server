/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty } from "class-validator";

export class ResetPasswordDto {

    @IsEmail()
    @IsNotEmpty()
    user_email: string;
}