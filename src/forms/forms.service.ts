/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from './entities/form.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FormsService {

  constructor(
    @InjectRepository( Form )
    private formRepository: Repository<Form>,
    private userService: UsersService
  ) {}





  //! Metodo para crear un nuevo formulario
  async create(createFormDto: CreateFormDto, userId: number): Promise<Form> {

    //Verificamos que el usuario exista
    const userFounded = await this.userService.findOne(userId);
    //Si el usuario no existe, lanzamos un error
    if(!userFounded){
      throw new HttpException('No se encontraron registros', HttpStatus.NOT_FOUND);
    }

    //Si el usuario existe, creamos el formulario y lo asociamos al usuario
    const newForm = this.formRepository.create({ ...createFormDto, user: userFounded });
    //Guardamos el formulario en la base de datos
    return this.formRepository.save(newForm);
  }






  //! Metodo para listar todos los formularios
  async findAll(): Promise<Form[]> {
    
    //Verificamos que exista al menos un registro en la tabla
    const count = await this.formRepository.count();
    //Si no existe ningun formulario, lanzamos un error
    if(count === 0){
      throw new HttpException('No se encontraron registros', HttpStatus.NOT_FOUND);
    }

    //Si existen registros, los retornamos y mostramos los usuarios asociados solo por ID
    return this.formRepository.find({
      relations: ['user']
    });
  }





  //! Metodo para buscar un formulario por su id
  async findOne(id: number): Promise<Form> {
    //Verificamos que el formulario exista
    const formFounded = await this.formRepository.findOne({
      where: { id_form: id }
    });

    //Si no existe el formulario, lanzamos un error
    if(!formFounded){
      throw new HttpException('No se encontraron registros', HttpStatus.NOT_FOUND);
    }

    //Si existe el formulario, lo retornamos
    return formFounded;
  }





  //! Metodo para listar todos los formularios de un usuario en especifico
  async findAllByUser(id: number): Promise<Form[]> {
    //Verificamos que el usuario exista
    const userFounded = await this.userService.findOne(id);
    //Si no existe el usuario, lanzamos un error
    if(!userFounded){
      throw new HttpException('No se encontraron registros', HttpStatus.NOT_FOUND);
    }

    //Si existe el usuario, pero no tiene formularios asociados, lanzamos un error
    const count = await this.formRepository.count({
      where: { user: userFounded }
    });

    if(count === 0){
      throw new HttpException('No se encontraron registros', HttpStatus.NOT_FOUND);
    }

    //Si el usuario tiene formularios asociados, los retornamos
    return this.formRepository.find({
      where: { user: userFounded }
    });
  }





  //! Metodo para actualizar un formulario
  update(id: number, updateFormDto: UpdateFormDto) {
    
    //Verificamos que el formulario exista
    const formFounded = this.formRepository.findOne({
      where: { id_form: id }
    });

    //Si no existe el formulario, lanzamos un error
    if(!formFounded){
      throw new HttpException('No se encontraron registros', HttpStatus.NOT_FOUND);
    }

    //Si existe el formulario, lo actualizamos
    return this.formRepository.update(id, updateFormDto);
  }





  //! Metodo para eliminar un formulario
  remove(id: number) {
      
      //Verificamos que el formulario exista
      const formFounded = this.formRepository.findOne({
        where: { id_form: id }
      });
  
      //Si no existe el formulario, lanzamos un error
      if(!formFounded){
        throw new HttpException('No se encontraron registros', HttpStatus.NOT_FOUND);
      }
  
      //Si existe el formulario, lo eliminamos
      return this.formRepository.delete(id);
  }
}
