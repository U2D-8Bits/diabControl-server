/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';

@Controller('medicines')
export class MedicinesController {
  constructor(private readonly medicinesService: MedicinesService) {}


  //? Controlador para crear un nuevo medicamento
  @Post()
  create(@Body() createMedicineDto: CreateMedicineDto) {
    return this.medicinesService.create(createMedicineDto);
  }


  //? Controlador para listar todos los medicamentos
  @Get()
  findAll() {
    return this.medicinesService.findAll();
  }

  //? Controlador para listar todos los medicamentos con paginación y busqueda
  @Get('paginated')
  findAllPaginated(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10, 
    @Query('search') search: string = ''
  ){
    return this.medicinesService.findAllMedicinesPaginated(page, limit, search)
  }


  //? Controlador para buscar un medicamento por su id
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.medicinesService.findOne(id);
  }



  //? Controlador para actualizar un medicamento por su id
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMedicineDto: UpdateMedicineDto) {
    return this.medicinesService.update(id, updateMedicineDto);
  }



  //? Controlador para eliminar un medicamento por su id
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.medicinesService.remove(id);
  }
}
