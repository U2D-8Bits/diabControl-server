/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ActService } from './act.service';
import { CreateActDto } from './dto/create-act.dto';
import { UpdateActDto } from './dto/update-act.dto';

@Controller('act')
export class ActController {
  constructor(private readonly actService: ActService) {}


  //? Controlador para crear un nuevo Acta
  @Post()
  create(@Body() createActDto: CreateActDto) {
    return this.actService.create(createActDto);
  }


  //? Controlador para listar todas las Actas Existentes
  @Get()
  findAll() {
    return this.actService.findAll();
  }

  //? Controlador para obtener el Acta de un Paciente por su ID
  @Get('/patient/:id')
  finOneByPatientID(@Param('id', ParseIntPipe) id: number){
    return this.actService.findOneByPatientId(id)
  }



  //? Controlador para obtener un Acta por su ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.actService.findOne(id);
  }



  //? Controlador para actualizar un acta por su ID
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateActDto: UpdateActDto) {
    return this.actService.update(id, updateActDto);
  }



  //? Controlaador para eliminar un Acta por su ID
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.actService.remove(+id);
  }
}
