/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
  ) {}





  //! Metodo para crear un usuario con rol SuperAdmin
  async createSuperAdmin(createUserDto: CreateUserDto){
    //? Buscamos el rol por nombre
    const roleFound = await this.roleRepository.findOne({
      where: { role_name: 'superadmin' },
    })

    //? Si no existe el rol lanzamos un error
    if (!roleFound) {
      throw new HttpException('Rol no encontrado', HttpStatus.NOT_FOUND);
    }

    //? validamos que el username, email, cedula y telefono no existan en otro usuario
    const userFound = await this.userRepository.findOne({
      where: [
        { user_username: createUserDto.user_username },
        { user_email: createUserDto.user_email },
        { user_ced: createUserDto.user_ced },
        { user_phone: createUserDto.user_phone },
      ],
    });

    //? Si el username, email, cedula o telefono ya existen lanzamos un error
    switch (true) {
      case userFound?.user_username === createUserDto.user_username:
        throw new HttpException(
          'Nombre de usuario ya existe',
          HttpStatus.BAD_REQUEST,
        );
      case userFound?.user_email === createUserDto.user_email:
        throw new HttpException('Email ya existe', HttpStatus.BAD_REQUEST);
      case userFound?.user_ced === createUserDto.user_ced:
        throw new HttpException('Cedula ya existe', HttpStatus.BAD_REQUEST);
      case userFound?.user_phone === createUserDto.user_phone:
        throw new HttpException('Telefono ya existe', HttpStatus.BAD_REQUEST);
    }

    //? validamos que el username, email, cedula y telefono no sean de longitud 0
    if (
      createUserDto.user_username.length === 0 ||
      createUserDto.user_email.length === 0 ||
      createUserDto.user_ced.toString().length === 0 ||
      createUserDto.user_phone.length === 0
    ) {
      throw new HttpException(
        'Los campos no pueden ser vacios',
        HttpStatus.BAD_REQUEST,
      );
    }

    //? Creamos un nuevo usuario
    const newUser = this.userRepository.create(createUserDto);

    //? Guardamos el usuario
    const user = await this.userRepository.save(newUser);

    //? Retornamos el usuario
    return user;

  }





  //! Metodo para crear un usuario
  async create(createUserDto: CreateUserDto) {
    
      //? Buscamos el rol por id
      const roleFound = await this.roleRepository.findOne({
        where: { id_role: createUserDto.role_id },
      });

      //? Si no existe el rol lanzamos un error
      if (!roleFound) {
        throw new HttpException('Rol no encontrado', HttpStatus.NOT_FOUND);
      }

      //? validamos que el username, email, cedula y telefono no existan en otro usuario
      const userFound = await this.userRepository.findOne({
        where: [
          { user_username: createUserDto.user_username },
          { user_email: createUserDto.user_email },
          { user_ced: createUserDto.user_ced },
          { user_phone: createUserDto.user_phone },
        ],
      });

      //? Si el username, email, cedula o telefono ya existen lanzamos un error
      switch (true) {
        case userFound?.user_username === createUserDto.user_username:
          throw new HttpException(
            'Nombre de usuario ya existe',
            HttpStatus.BAD_REQUEST,
          );
        case userFound?.user_email === createUserDto.user_email:
          throw new HttpException('Email ya existe', HttpStatus.BAD_REQUEST);
        case userFound?.user_ced === createUserDto.user_ced:
          throw new HttpException('Cedula ya existe', HttpStatus.BAD_REQUEST);
        case userFound?.user_phone === createUserDto.user_phone:
          throw new HttpException('Telefono ya existe', HttpStatus.BAD_REQUEST);
      }

      //? validamos que el username, email, cedula y telefono no sean de longitud 0
      if (
        createUserDto.user_username.length === 0 ||
        createUserDto.user_email.length === 0 ||
        createUserDto.user_ced.toString().length === 0 ||
        createUserDto.user_phone.length === 0
      ) {
        throw new HttpException(
          'Los campos no pueden ser vacios',
          HttpStatus.BAD_REQUEST,
        );
      }

      //? Creamos un nuevo usuario
      const newUser = this.userRepository.create(createUserDto);

      //? Guardamos el usuario
      const user = await this.userRepository.save(newUser);

      //? Retornamos el usuario
      return user;
  }





  //! Metodo para loguear un usuario
  async loginUser(loginDto: LoginDto): Promise<any> {
    //? Buscamos el usuario por username
    const user = await this.userRepository.findOne({
      where: { user_username: loginDto.user_username },
    });

    //? Si no existe el usuario lanzamos un error
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    //? Si la contraseña no coincide lanzamos un error
    if (user.user_password !== loginDto.user_password) {
      throw new HttpException('Contraseña incorrecta', HttpStatus.BAD_REQUEST);
    }

    //? Verificamos que los campos no sean vacios
    if (
      loginDto.user_username.length === 0 ||
      loginDto.user_password.length === 0
    ) {
      throw new HttpException(
        'Los campos no pueden ser vacios',
        HttpStatus.BAD_REQUEST,
      );
    }

    //? Retornamos el usuario y el token
    return {
      user,
      token: this.getJwtToken({ id: user.id_user.toString() }),
    };
  }





  //! Metodo para listar todos los usuarios
  async findAll() {
    //? Si no existe ningun usuario lanzamos un error
    if ((await this.userRepository.find()).length === 0) {
      throw new HttpException('No existe ningun usuario', HttpStatus.NOT_FOUND);
    }

    //? Retornamos todos los usuarios
    return this.userRepository.find();
  }





  //! Metodo para listar todos los usuarios de rol paciente
  async findAllPacientes() {
    //? Si no existe ningun usuario lanzamos un error
    if ((await this.userRepository.find()).length === 0) {
      throw new HttpException('No existe ningun usuario', HttpStatus.NOT_FOUND);
    }

    //? Retornamos todos los usuarios
    return this.userRepository.find({where: {role_id: 2}});
  } 





  //! Metodo para listar todos los usuarios de rol medico
  async findAllMedicos(){
    //? Si no existe ningun usuario lanzamos un error
    if ((await this.userRepository.find()).length === 0) {
      throw new HttpException('No existe ningun usuario', HttpStatus.NOT_FOUND);
    }

    //? Retornamos todos los usuarios
    return this.userRepository.find({where: {role_id: 1}});
  }





  //! Metodo para buscar un usuario por id
  async findOne(id: number) {
    //? Buscamos el usuario por id
    const userFound = await this.userRepository.findOne({
      where: { id_user: id },
      relations: ['role'],
    });

    //? Si no existe el usuario lanzamos un error
    if (!userFound) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    //? Retornamos el usuario
    return userFound;
  }





  //! Metodo para buscar un usuario por ID  para usar en el Guard (AuthGuard)
  async findUserByID(id: number) {
    //? Buscamos el usuario por id
    const user = await this.userRepository.findOne({
      where: { id_user: id },
    });

    //? Si no existe el usuario lanzamos un error
    if (!user) {
      throw new UnauthorizedException();
    }

    //? Retornamos el usuario
    return user;
  }





  //! Metodo para actualizar un usuario por id
  async update(id: number, updateUserDto: UpdateUserDto) {

      //? Buscamos el usuario por id
      const userFound = await this.userRepository.findOne({
        where: { id_user: id },
      });

      //? Si no existe el usuario lanzamos un error
      if (!userFound) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }

      //? Buscamos el rol por id
      const roleFound = await this.roleRepository.findOne({
        where: { id_role: updateUserDto.role_id },
      });

      //? Si no existe el rol lanzamos un error
      if (!roleFound) {
        throw new HttpException('Rol no encontrado', HttpStatus.NOT_FOUND);
      }

      //? validamos que el username, email, cedula y telefono no existan en otro usuario pero si es del mismo usuario no lanzamos error
      const userFounded = await this.userRepository.findOne({
        where: [
          { user_username: updateUserDto.user_username },
          { user_email: updateUserDto.user_email },
          { user_ced: updateUserDto.user_ced },
          { user_phone: updateUserDto.user_phone },
        ],
      });

      //? Si el username, email, cedula o telefono ya existen lanzamos un error
      switch (true) {
        case userFounded?.user_username === updateUserDto.user_username &&
          userFounded?.id_user !== userFound.id_user:
          throw new HttpException(
            'Nombre de usuario ya existe',
            HttpStatus.BAD_REQUEST,
          );
        case userFounded?.user_email === updateUserDto.user_email &&
          userFounded?.id_user !== userFound.id_user:
          throw new HttpException('Email ya existe', HttpStatus.BAD_REQUEST);
        case userFounded?.user_ced === updateUserDto.user_ced &&
          userFounded?.id_user !== userFound.id_user:
          throw new HttpException('Cedula ya existe', HttpStatus.BAD_REQUEST);
        case userFounded?.user_phone === updateUserDto.user_phone &&
          userFounded?.id_user !== userFound.id_user:
          throw new HttpException('Telefono ya existe', HttpStatus.BAD_REQUEST);
      }


      //? validamos que el username, email, cedula y telefono no sean de longitud 0
      if (
        updateUserDto.user_username.length === 0 ||
        updateUserDto.user_email.length === 0 ||
        updateUserDto.user_ced.toString().length === 0 ||
        updateUserDto.user_phone.length === 0
      ) {
        throw new HttpException(
          'Los campos no pueden ser vacios',
          HttpStatus.BAD_REQUEST,
        );
      }

      //? Actualizamos el usuario
      const updatedUser = await this.userRepository.update(userFound, updateUserDto);

      //? Retornamos el usuario actualizado
      return updatedUser;
  }




  //! Metodo para cambiar el status de un usuario por id
  async changeStatus(id: number) {
    //? Buscamos el usuario por id
    const userFound = await this.userRepository.findOne({
      where: { id_user: id },
    });

    //? Si no existe el usuario lanzamos un error
    if (!userFound) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    //? Cambiamos el status del usuario
    userFound.user_status = !userFound.user_status;

    //? actualizamos el usuario
    await this.userRepository.update(userFound.id_user, userFound);

    //? Retornamos el usuario
    return userFound;
  }


  //! Metodo para eliminar un usuario por id
  async remove(id: number) {
    //? Buscamos el usuario por id
    const userFound = await this.userRepository.findOne({
      where: { id_user: id },
    });

    //? Si no existe el usuario lanzamos un error
    if (!userFound) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    //? Eliminamos el usuario y enviamo un mensaje
    await this.userRepository.delete(userFound);

    //? Retornamos un mensaje
    throw new HttpException('Usuario eliminado', HttpStatus.OK);
  }





  //! get Jason Web Token
  getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }




}
