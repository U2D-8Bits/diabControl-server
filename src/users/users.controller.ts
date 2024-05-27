/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, LoginDto } from './dto';
import { AuthGuard } from './guards/auth/auth.guard';
import { User } from './entities/user.entity';
import { LoginResponse } from './interfaces';
import { TokenGuard } from './guards/auth/token.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private userService: UsersService,
  ) {}

  //! Ruta para crear un usuario superadmin
  @Post('superadmin')
  createSuperAdmin(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createSuperAdmin(createUserDto);
  }




  
  //! Ruta para crear un usuario
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }





  //! Ruta para loguear un usuario
  @Post('/login')
  loginUser(@Body() loginDto: LoginDto) {
    return this.usersService.loginUser(loginDto);
  }





  //! Ruta listar todos los usuarios
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req: Request) {
    return this.usersService.findAll();
  }



  //! Ruta para listar todos los usuarios de rol medico
  @UseGuards(TokenGuard)
  @Get('medics')
  findAllUsers(@Request() req: Request) {
    return this.usersService.findAllMedicos();
  }





  //! Ruta para listar los usuarios de rol paciente
  @UseGuards(AuthGuard)
  @Get('pacientes')
  findAllPacientes() {
    return this.userService.findAllPacientes();
  }




  //! Ruta para chequear el token
  @UseGuards(TokenGuard)
  @Get('check-token')
  checkToken(@Request() req: Request): any {

    const user = req['user'] as User;

    return {
      user,
      token: this.userService.getJwtToken({ id: user.id_user.toString() }),
    }
  }





  //! Ruta para buscar un usuario por id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }





  //! Ruta para actualizar un usuario por id
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }


  //! Ruta para cambiar el status de un usuario por id
  @UseGuards(AuthGuard)
  @Patch(':id/status')
  changeStatus(@Param('id', ParseIntPipe) id: number){
    return this.usersService.changeStatus(id);
  }



  //! Ruta para eliminar un usuario por id
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
