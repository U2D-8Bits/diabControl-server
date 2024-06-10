import { PartialType } from '@nestjs/mapped-types';
import { CreateMedcategoryDto } from './create-medcategory.dto';

export class UpdateMedcategoryDto extends PartialType(CreateMedcategoryDto) {}
