/* eslint-disable prettier/prettier */


import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, LoginDto } from './dto';
import { AuthGuard } from './guards/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}





  //! Ruta para crear un usuario
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }





  //! Ruta para loguear un usuario
  @Post('/login')
  loginUser(@Body() loginDto:LoginDto){
    return this.usersService.loginUser(loginDto);
  }





  //! Ruta listar todos los usuarios
  @UseGuards( AuthGuard )
  @Get()
  findAll() {
    return this.usersService.findAll();
  }





  //! Ruta para buscar un usuario por id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }





  //! Ruta para actualizar un usuario por id
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }





  //! Ruta para eliminar un usuario por id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
