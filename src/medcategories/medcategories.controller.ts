/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedcategoriesService } from './medcategories.service';
import { CreateMedcategoryDto } from './dto/create-medcategory.dto';
import { UpdateMedcategoryDto } from './dto/update-medcategory.dto';

@Controller('categories')
export class MedcategoriesController {
  constructor(private readonly medcategoriesService: MedcategoriesService) {}



  //? Controlador para crear una nueva categoria de medicamento
  @Post()
  create(@Body() createMedcategoryDto: CreateMedcategoryDto) {
    return this.medcategoriesService.create(createMedcategoryDto);
  }


  //? Controlador para listar todas las categorias de medicamentos
  @Get()
  findAll() {
    return this.medcategoriesService.findAll();
  }


  //? Controlador para buscar una categoria por su id
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.medcategoriesService.findOne(id);
  }

  //? Controlador para buscar una categoria por su nombre
  @Get('name/:name_category')
  findByName(@Param('name_category') name_category: string){
    return this.medcategoriesService.findOneByName(name_category)
  }


  //? Controlador para actualizar una categoria de medicamento
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMedcategoryDto: UpdateMedcategoryDto) {
    return this.medcategoriesService.update(id, updateMedcategoryDto);
  }



  //? Controlador para eliminar una categoria de medicamento
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.medcategoriesService.remove(id);
  }
}
