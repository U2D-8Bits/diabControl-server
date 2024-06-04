/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateFormDto {

    @IsString()
    @IsNotEmpty()
    form_title: string;


    @IsString()
    @IsNotEmpty()
    form_diabetes_type: string;

    @IsString()
    @IsOptional()
    form_glucose_mesure_date: string;

    @IsNumber()
    @IsOptional()
    form_glucose_level: number;

    @IsString()
    @IsOptional()
    form_glucose_mesure_frequency: string;

    @IsNumber()
    @IsOptional()
    form_glucose_average_level: number;

    @IsOptional()
    form_eat_habits: boolean;

    @IsString()
    @IsOptional()
    form_eat_habits_description: string;

    @IsOptional()
    form_physical_activity: boolean;

    @IsString()
    @IsOptional()
    form_physical_activity_description: string;

    @IsString()
    @IsOptional()
    form_physical_activity_frequency: string;

    @IsOptional()
    form_blurred_vision: boolean;

    @IsOptional()
    form_slow_healing: boolean;

    @IsOptional()
    form_tingling_numbness: boolean;

    @IsOptional()
    form_extreme_faigue: boolean;

    @IsOptional()
    form_incresed_thirst: boolean;

    @IsString()
    @IsOptional()
    form_additional_questions: string;
    

    //Creamos un campo para el id del usuario
    @IsNumber()
    @IsNotEmpty()
    id_user: number;

}