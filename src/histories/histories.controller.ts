/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
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

  //? Controlador para listar una historia clinica por su id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.historiesService.findOne(id);
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
