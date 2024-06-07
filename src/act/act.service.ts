/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateActDto } from './dto/create-act.dto';
import { UpdateActDto } from './dto/update-act.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Act } from './entities/act.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ActService {

  constructor(
    @InjectRepository(Act)
    private readonly actRepository: Repository<Act>,
    
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  //! Servicio para crear un Acta
  async create(createActDto: CreateActDto) {
    
    //* Destructuramos el createActDto
    const {id_patient, ...actData} = createActDto;

    //* Buscamos un usuario con el id del paciente
    const userPatient = await this.userRepository.findOne({
      where: {id_user: id_patient}
    })

    //* Verificamos que el paciente exista
    if( !userPatient){
      throw new HttpException('El paciente no existe', HttpStatus.NOT_FOUND);
    }

    //* Creamos el acta

    const newAct = this.actRepository.create({
      ...actData,
      user: userPatient
    })

    return await this.actRepository.save(newAct);
  }


  //! Servicio para listar todas las Actas
  async findAll() {
    
    //* Verificamos que exista algun acta, de ser que no lanzamos un mensaje notificandolo
    if( (await this.actRepository.find()).length === 0 ){
      throw new HttpException('No existen actas', HttpStatus.NOT_FOUND);
    }

    //* Si existen actas, las devolvemos
    return await this.actRepository.find({
      relations: ['user']
    })
    
  }


  //! Servicio para buscar un acta por su id
  async findOne(id: number) {
    
    //* Buscamos un acta por su id
    const actData = await this.actRepository.findOne({
      where: {'id': id},
      relations: ['user']
    })

    //* Verificamos que exista el Acta
    if( !actData ){
      throw new HttpException('El Acta no existe o no se puedo encontrar', HttpStatus.NOT_FOUND);
    }


    //* Si existe devolvemos la informacion del Acta
    return this.actRepository.findOne({
      where: {id},
      relations: ['user']
    })

  }


  //! Servicio para buscar un Acta por el id del usuario
  async findOneByPatientId(id: number){

    //* Buscamos el usuario
    const patientData = this.userRepository.findOne({
      where: {'id_user': id}
    });

    //* Verificamos que exista el usuario
    if( !patientData ){
      throw new HttpException('El Paciente no fue encontrado', HttpStatus.NOT_FOUND)
    }
    
    //* Buscamos el Acta atravez del id del paciente
    const actData = await this.actRepository.findOne({
      where: {user: {id_user: id}},
      relations: ['user']
    })

    //* Verficiamos que el Acta exista
    if( !actData){
      throw new HttpException('No existe un Acta registrada para este paciente', HttpStatus.NOT_FOUND)
    }

    //* Si existe el actData, lo retornamos
    return actData;
  }



  //! Servicio para actualizar un Acta por su ID
  async update(id: number, updateActDto: UpdateActDto) {

    //* Buscamos un acta por su id
    const actData = await this.actRepository.findOne({
      where: {id}
    })

    //* Verificamos que el actData exista
    if( !actData){
      throw new HttpException('El acta solicitado no existe o no fue encontrada', HttpStatus.NOT_FOUND)
    }

    Object.assign(actData, updateActDto);
    return await this.actRepository.save(actData)

  }



  //! Servicio para eliminar un Acta por su ID
  async remove(id: number) {
    //* Buscamos el acta por su id
    const actData = await this.actRepository.findOne({
      where: {id}
    })


    //* Verificamos que el acta exista
    if( !actData ){
      throw new HttpException('El acta no existe o no fue encontrada', HttpStatus.NOT_FOUND)
    }

    //* Si el acta existe la eliminamos
    return await this.actRepository.remove(actData)
  }
}
