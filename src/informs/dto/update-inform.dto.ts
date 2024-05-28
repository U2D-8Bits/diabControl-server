import { PartialType } from '@nestjs/mapped-types';
import { CreateInformDto } from './create-inform.dto';

export class UpdateInformDto extends PartialType(CreateInformDto) {}
