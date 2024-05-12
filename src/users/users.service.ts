/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */


import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, LoginDto } from './dto';

import { JwtService } from '@nestjs/jwt';

import { LoginResponse, JwtPayload } from './interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/role/entities/role.entity';
import { RoleService } from 'src/role/role.service';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class UsersService {

  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ){}



  //! Metodo para crear un usuario
  async create(createUserDto: CreateUserDto) {
    
      
      //* Validamos que el rol exista
      const roleFound = await this.roleRepository.findOne({where: {id_role: createUserDto.role_id}});
      
      if(!roleFound){
        return new HttpException('Rol no encontrado', HttpStatus.NOT_FOUND);
      }

      const newUser = this.userRepository.create(createUserDto);

      return this.userRepository.save(newUser);
  }





  //! Metodo para loguear un usuario
  async loginUser(loginDto: LoginDto){
      
      // Sin asignar JWT
      const userFound = await this.userRepository.findOne({
        where: {user_username: loginDto.user_username, user_password: loginDto.user_password},
        relations: ['role']
      });

      if(!userFound){
        return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }

      // Validamos el login
      if(userFound.user_username !== loginDto.user_username || userFound.user_password !== loginDto.user_password){
        return new HttpException('Usuario o contraseña incorrectos', HttpStatus.UNAUTHORIZED);
      }

      // Asignamos JWT
      const payload: JwtPayload = {id: userFound.id_user.toString()};

      const token = this.getJWToken(payload);

      const loginResponse: LoginResponse = {
        user: userFound,
        token: token
      }

      return loginResponse;
  }





  //! Metodo para listar todos los usuarios
  findAll() {
    return this.userRepository.find();
  }





  //! Metodo para buscar un usuario por id
  async findOne(id: number) {
    
    // Buscamos el usuario por id y mostrado todo incluso la informacion del rol
    const userFound = await this.userRepository.findOne({
      where: {id_user: id},
      relations: ['role']
    });

    if(!userFound){
      return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    return userFound;

  }





  //! Metodo para actualizar un usuario por id
  async update(id: number, updateUserDto: UpdateUserDto) {
    
      const userFound = await this.userRepository.findOne({
        where: {id_user: id}
      });
  
      if(!userFound){
        return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }
      
      const roleFound = await this.roleRepository.findOne({
        where: {id_role: updateUserDto.role_id}
      });
  
      if(!roleFound){
        return new HttpException('Rol no encontrado', HttpStatus.NOT_FOUND);
      }
  
      const userUpdated = this.userRepository.update(id, updateUserDto);
  
      return userUpdated;
  }





  //! Metodo para eliminar un usuario por id
  async remove(id: number) {
      
      const userFound = await this.userRepository.findOne({
        where: {id_user: id}
      });
  
      if(!userFound){
        return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }
  
      return this.userRepository.remove(userFound);
  }





  //! Metodo para generar un token
  getJWToken(payload: JwtPayload){
    const token = this.jwtService.sign(payload);
    return token;
  }
}
