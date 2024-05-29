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
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}


  //! Metodo para crear un role de medico automaticamente
  async createMedicRole() {
    //? Buscamos si existe un role con el nombre de medico
    const roleExist = await this.roleRepository.findOne({
      where: { role_name: 'medico' },
    });

    //? Si existe un role con el nombre de medico lanzamos un error
    if (roleExist) {
      throw new HttpException(
        'El role de medico ya existe',
        HttpStatus.BAD_REQUEST,
      );
    }

    //? Creamos un nuevo role
    const newRole = this.roleRepository.create({
      role_name: 'medico',
      role_description: 'Rol de medico',
    });

    //? Guardamos el nuevo role
    return await this.roleRepository.save(newRole);
  }



  //! Metodo para crear un nuevo role
  async create(createRoleDto: CreateRoleDto) {
    //? Buscamos si existe un role con el mismo nombre
    const roleExist = await this.roleRepository.findOne({
      where: { role_name: createRoleDto.role_name },
    });

    //? Si existe un role con el mismo nombre lanzamos un error
    if (roleExist) {
      throw new HttpException(
        'El nombre del role ya existe',
        HttpStatus.BAD_REQUEST,
      );
    }

    //? Si el nombre del role es vacio lanzamos un error
    if (createRoleDto.role_name.length === 0) {
      throw new HttpException(
        'El nombre del role no puede ser vacio',
        HttpStatus.BAD_REQUEST,
      );
    }

    //? Creamos un nuevo role
    const newRole = this.roleRepository.create(createRoleDto);

    //? Guardamos el nuevo role
    return await this.roleRepository.save(newRole);
  }





  //! Metodo para listar todos los roles
  async findAll() {
    //? Buscamos si existen roles, si no existen lanzamos un error
    if ((await this.roleRepository.find()).length === 0) {
      throw new HttpException('No existe ningun role', HttpStatus.NOT_FOUND);
    }

    //? Retornamos todos los roles
    return await this.roleRepository.find();
  }





  //! Metodo para buscar un role por id
  async findOne(id: number) {
    //? Buscamos el role por id
    const role = await this.roleRepository.findOne({
      where: { id_role: id },
    });

    //? Si no existe el role lanzamos un error
    if (!role) {
      throw new HttpException('Role no encontrado', HttpStatus.NOT_FOUND);
    }

    //? Retornamos el role
    return role;
  }





  // ! Metodo para buscar el rol de medico por ID
  async findRoleByID(id: number) {
    //? Buscamos el role por id
    const role = await this.roleRepository.findOne({
      where: { id_role: id },
    });

    //? Si no existe el role lanzamos un error
    if (!role) {
      throw new HttpException('Role no encontrado', HttpStatus.NOT_FOUND);
    }

    //? Retornamos el role
    return role;
  }





  //! Metodo para actualizar un role
  async update(id: number, updateRoleDto: UpdateRoleDto) {
    //? Buscamos el role por id
    const roleFound = await this.roleRepository.findOne({
      where: { id_role: id },
    });

    //? Si no existe el role lanzamos un error
    if (!roleFound) {
      throw new HttpException('Role no encontrado', HttpStatus.NOT_FOUND);
    }

    //? Validamos que no exista otro role con el mismo nombre
    if (updateRoleDto.role_name) {
      const roleExist = await this.roleRepository.findOne({
        where: { role_name: updateRoleDto.role_name },
      });

      //? Si existe un role con el mismo nombre lanzamos un error
      if (roleExist) {
        throw new HttpException(
          'El nombre del role ya existe',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    //? Validamos que no envie un nombre de tamaño 0
    if (updateRoleDto.role_name.length === 0) {
      throw new HttpException(
        'El nombre del role no puede ser vacio',
        HttpStatus.BAD_REQUEST,
      );
    }

    //? Actualizamos el role con object.assign
    const updatedRole = await this.roleRepository.save(
      Object.assign(roleFound, updateRoleDto),
    );

    //? Retornamos el role actualizado
    return updatedRole;
  }





  //! Metodo para eliminar un role
  async remove(id: number) {
    //? Buscamos el role por id
    const rolefound = await this.roleRepository.findOne({
      where: { id_role: id },
    });

    //? Si no existe el role lanzamos un error
    if (!rolefound) {
      throw new HttpException('Role no encontrado', HttpStatus.NOT_FOUND);
    }

    //? Eliminamos el role
    await this.roleRepository.remove(rolefound);

    //? Retornamos un mensaje de eliminado
    throw new HttpException('Role eliminado', HttpStatus.OK);
  }



  
}
