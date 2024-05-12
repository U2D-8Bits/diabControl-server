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
  async loginUser(loginDto: LoginDto): Promise<any>{

    
    const userFound = await this.userRepository.findOne({
      where: {user_username: loginDto.user_username}
    });

    if(!userFound){
      return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    } 

    if(userFound.user_password !== loginDto.user_password){
      return new HttpException('Contraseña incorrecta', HttpStatus.BAD_REQUEST);
    }

    return {
      userFound,
      token: this.getJwtToken({id: userFound.id_user.toString()})
    }
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





  //! Metodo para buscar un usuario por ID  para usar en el Guard (AuthGuard)
  async findUserByID(id: number){

    const user = await this.userRepository.findOne({
      where:{id_user: id}
    })

    return user;

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





  //! get Jason Web Token
  getJwtToken(payload: JwtPayload){
    const token = this.jwtService.sign(payload);
    return token;
  }
}
