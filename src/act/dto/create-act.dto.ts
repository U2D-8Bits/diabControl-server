/* eslint-disable prettier/prettier */
import { IsBoolean, IsEmail, IsNumber, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class CreateActDto {

    @IsBoolean()
    minor_age: boolean;

    @IsBoolean()
    disability: boolean;

    @IsBoolean()
    illiteracy: boolean;

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
