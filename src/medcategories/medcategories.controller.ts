import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedcategoriesService } from './medcategories.service';
import { CreateMedcategoryDto } from './dto/create-medcategory.dto';
import { UpdateMedcategoryDto } from './dto/update-medcategory.dto';

@Controller('medcategories')
export class MedcategoriesController {
  constructor(private readonly medcategoriesService: MedcategoriesService) {}

  @Post()
  create(@Body() createMedcategoryDto: CreateMedcategoryDto) {
    return this.medcategoriesService.create(createMedcategoryDto);
  }

  @Get()
  findAll() {
    return this.medcategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medcategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedcategoryDto: UpdateMedcategoryDto) {
    return this.medcategoriesService.update(+id, updateMedcategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medcategoriesService.remove(+id);
  }
}
