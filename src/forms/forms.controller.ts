/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { FormsService } from './forms.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { Form } from './entities/form.entity';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}



  //! Ruta para crear un formulario
  @Post()
  create(@Body() createFormDto: CreateFormDto) {
    return this.formsService.create(createFormDto, createFormDto.id_user);
  }





  //! Ruta para listar todos los formularios existentes
  @Get()
  findAll(): Promise<Form[]> {
    return this.formsService.findAll();
  }





  //! Metodo para buscar un formulario por su id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formsService.findOne(+id);
  }





  //! Metodo para listar todos los formularios de un usuario en especifico
  @Get('user/:id')
  findAllByUser(@Param('id', ParseIntPipe) id: number): Promise<Form[]> {
    return this.formsService.findAllByUser(id);
  }




  //! Metodo para actualizar un formulario por su id
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormDto: UpdateFormDto) {
    return this.formsService.update(+id, updateFormDto);
  }





  //! Metodo para eliminar un formulario por su id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formsService.remove(+id);
  }
}
