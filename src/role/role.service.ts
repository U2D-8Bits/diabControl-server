/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */


import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {

  constructor(
    @InjectRepository( Role ) private roleRepository: Repository<Role>,
  ) {}





  //! Metodo para crear un nuevo role
  async create(createRoleDto: CreateRoleDto) {

    const newRole = this.roleRepository.create( createRoleDto );
    
    // Valiidamos que no envie valores vacios
    if( !newRole.role_name ) {
      return new HttpException('No puede enviar valores vacios', HttpStatus.BAD_REQUEST);
    }

    // Guardamos el nuevo role y retornamos mensaje de exito
    await this.roleRepository.save( newRole );
    return new HttpException('Role creado con exito', HttpStatus.CREATED);

  }





  //! Metodo para listar todos los roles
  async findAll() {

    //* retornamos mensaje de que no existe ningun role
    if( (await this.roleRepository.find()).length === 0 ) {
      return new HttpException('No existe ningun role', HttpStatus.NOT_FOUND);
    }

    return await this.roleRepository.find();
  }





  //! Metodo para buscar un role por id
  async findOne(id: number) {
    
    const roleFound = await this.roleRepository.findOne({
      where: { id_role: id }
    });

    if( !roleFound ) {
      return new HttpException('Role no encontrado', HttpStatus.NOT_FOUND);
    }

    return roleFound;

  }





  //! Metodo para actualizar un role
  async update(id: number, updateRoleDto: UpdateRoleDto) {
    
    const roleFound = await this.roleRepository.findOne({
      where: { id_role: id }
    });

    if( !roleFound ) {
      return new HttpException('Role no encontrado', HttpStatus.NOT_FOUND);
    }

    // Validamos de que no pueda repetir el nombre de un role
    const roleExist = await this.roleRepository.findOne({
      where: { role_name: updateRoleDto.role_name }
    });

    if( roleExist ) {
      return new HttpException('El nombre del role ya existe', HttpStatus.BAD_REQUEST);
    }

    const udpateRole = Object.assign( roleFound, updateRoleDto );
    return await this.roleRepository.save( udpateRole );
  }





  //! Metodo para eliminar un role
  async remove(id: number) {
    
    const rolefound = await this.roleRepository.findOne({
      where: { id_role: id }
    });

    if( !rolefound ) {
      return new HttpException('Role no encontrado', HttpStatus.NOT_FOUND);
    }

    await this.roleRepository.remove( rolefound );
  }





}
