/* eslint-disable prettier/prettier */

import { IsString } from "class-validator";


export class LoginDto {

    @IsString()
    user_username: string;

    @IsString()
    user_password: string;

}