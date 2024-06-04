/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateHistoryDto } from './create-history.dto';
import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";


export class UpdateHistoryDto extends PartialType(CreateHistoryDto) {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    weight_patient?: number

    @IsOptional()
    @IsNumber()
    @IsPositive()
    tall_patient?: number

    @IsOptional()
    @IsNumber()
    @IsPositive()
    pulse_patient?: number

    @IsOptional()
    @IsNumber()
    @IsPositive()
    presure_patient?: number

    @IsOptional()
    @IsNumber()
    @IsPositive()
    frequency_patient?: number

    @IsOptional()
    @IsNumber()
    @IsPositive()
    temperature_patient?: number

    @IsOptional()
    @IsString()
    consult_reason?: string

    @IsOptional()
    @IsString()
    fisic_exam?: string

    @IsOptional()
    @IsString()
    recipe?: string

    @IsOptional()
    @IsString()
    current_illness?: string

    @IsOptional()
    @IsString()
    diagnostic?: string

    @IsOptional()
    @IsString()
    medic_indications?: string
}
