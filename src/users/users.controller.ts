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

  //! Ruta para crear un usuario
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





  //! Ruta para chequear el token
  @UseGuards(TokenGuard)
  @Get('check-token')
  checkToken(@Request() req: Request): any {

    const user = req['user'] as User;

    console.log(user.id_user);

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
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }





  //! Ruta para eliminar un usuario por id
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
