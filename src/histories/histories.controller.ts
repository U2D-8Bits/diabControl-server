/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { HistoriesService } from './histories.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';

@Controller('histories')
export class HistoriesController {
  constructor(private readonly historiesService: HistoriesService) {}

  //? Controlador para crear una historia clinica
  @Post()
  create(@Body() createHistoryDto: CreateHistoryDto) {
    return this.historiesService.create(createHistoryDto);
  }


  //? Controlador para listar todas las historias clinicas creadas
  @Get()
  findAll() {
    return this.historiesService.findAll();
  }


  //? Controlador para listar todas las historias clinicas de un paciente por su id
  @Get('/paciente/:id')
  findAllByPacienteId(@Param('id', ParseIntPipe) id: number){
    return this.historiesService.findAllByPacienteId(id);
  }


  //? Controlador para listar todas las historias clínicas de un paciente por su id con paginación
  @Get('/paciente/:id/paginated')
  findAllPaginated(
    @Param('id') id: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ){
    return this.historiesService.findAllByPacienteIdAndPagination(id, page, limit)
  }

  //? Controlador para listar una historia clinica por su id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.historiesService.findOne(id);
  }

  //? Controlador para obtener los signos vitales de las historias clinicas de un paciente por su id
  @Get(':id/signals')
  getSignalByPacienteId(@Param('id') id: number) {
    return this.historiesService.getSignalByPacienteId(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateHistoryDto: UpdateHistoryDto) {
    return this.historiesService.update(id, updateHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.historiesService.remove(id);
  }
}
