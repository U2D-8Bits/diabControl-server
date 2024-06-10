/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";

export class CreateMedcategoryDto {
    @IsString()
    @IsNotEmpty()
    name_category: string;
}
