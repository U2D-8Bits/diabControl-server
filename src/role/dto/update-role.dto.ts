/* eslint-disable prettier/prettier */


import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import { IsString } from 'class-validator';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {

    @IsString()
    role_name?: string

    @IsString()
    role_description?: string

}
