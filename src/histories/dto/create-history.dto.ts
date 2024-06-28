/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";


export class CreateHistoryDto {
    
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

    @IsNotEmpty()
    @IsString()
    consult_reason: string

    @IsNotEmpty()
    @IsString()
    fisic_exam: string

    @IsNotEmpty()
    recipe: string[]

    @IsNotEmpty()
    @IsString()
    fenotype: string

    @IsNotEmpty()
    @IsString()
    current_illness: string

    @IsNotEmpty()
    @IsString()
    diagnostic: string

    @IsNotEmpty()
    @IsString()
    medic_indications: string

    @IsNotEmpty()
    @IsNumber()
    medicoId: number

    @IsNotEmpty()
    @IsNumber()
    pacienteId: number
}
