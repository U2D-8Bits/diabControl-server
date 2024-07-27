/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateControlDto {
  @IsNotEmpty()
  @IsNumber()
  patientId: number;

  @IsNotEmpty()
  @IsNumber()
  medicId: number;

  @IsNotEmpty()
  @IsNumber()
  historyId: number;

  @IsNotEmpty()
  @IsString()
  observation: string;

  @IsNotEmpty()
  @IsString()
  date_control: string;

  @IsNotEmpty()
  @IsString()
  recommendations: string;
}
