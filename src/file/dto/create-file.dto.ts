/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber} from "class-validator";

export class CreateFileDto {
    @IsNumber()
    @IsNotEmpty()
    user_id: number;
}
