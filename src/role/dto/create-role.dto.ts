/* eslint-disable prettier/prettier */


import { IsString } from "class-validator";

export class CreateRoleDto {

    @IsString()
    role_name: string

    @IsString()
    role_description?: string

}
