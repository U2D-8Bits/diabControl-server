/* eslint-disable prettier/prettier */


import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RoleController {

  constructor(private readonly roleService: RoleService) {}

  //! Ruta para crear un role de medico automaticamente
  @Post('create-medic-role')
  createMedicRole() {
    return this.roleService.createMedicRole();
  }




  //! Ruta para crear un nuevo role
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }





  //! Ruta para listar todos los roles
  @Get()
  findAll() {
    return this.roleService.findAll();
  }





  //! Ruta para buscar un role por id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.findOne(id);
  }





  //! Ruta para actualizar un role
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }





  //! Ruta para eliminar un role
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.remove(id);
  }
}
