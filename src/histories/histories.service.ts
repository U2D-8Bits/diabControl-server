/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { History } from './entities/history.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class HistoriesService {

  constructor(
    @InjectRepository(History)
    private readonly historyRepository: Repository<History>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  //! Servicio para crear una historia clinica
  async create(createHistoryDto: CreateHistoryDto) {
    //* Destructuramos el createHistoryDto
    const {medicoId, pacienteId, ...historyData} = createHistoryDto;

    //* Buscamos un usuario con el id del medico
    const userMedico = await this.userRepository.findOne({
      where: {id_user: medicoId}
    });

    //* verificamos que el medico exista
    if( !userMedico){
      throw new HttpException('El medico no existe', HttpStatus.NOT_FOUND);
    }

    //* Buscamos el usuario que es paciente
    const userPaciente = await this.userRepository.findOne({
      where: {id_user: pacienteId}
    });

    //* Verificamos que el userPaciente exista
    if( !userPaciente){
      throw new HttpException('El paciente no existe', HttpStatus.NOT_FOUND);
    }


    //* Creamos la historia clinica
    const newHistory = this.historyRepository.create({
      ...historyData,
      medico: userMedico,
      paciente: userPaciente
    })

    return await this.historyRepository.save(newHistory);
  }


  //! Servicio para listar todos los historiales clinicos
  async findAll() {

    return await this.historyRepository.find({
      relations: ['medico', 'paciente']
    });
  }

  //! Servicio para listar todas las historias clinicas de un paciente por su id
  async findAllByPacienteId(id: number) {
    
    //* Buscamos el paciente por su id
    const userPaciente = await this.userRepository.findOne({
      where: {id_user: id}
    });

    //* Verificamos que el paciente exista
    if( !userPaciente){
      throw new HttpException('El paciente no existe', HttpStatus.NOT_FOUND);
    }

    //* Retornamos todas las historias clinicas del paciente
    return await this.historyRepository.find({
      where: {paciente: userPaciente},
      relations: ['medico', 'paciente']
    });
  }


  //! Servicio para buscar un historial clinico por su id
  async findOne(id: number) {
    
    //* Buscamos por ID el historial clinico
    const historyFounded = await this.historyRepository.findOne({
      where: {id_medic_history: id},
      relations: ['medico', 'paciente']
    });

    //* Verificamos que exista el historial clinico
    if( !historyFounded){
      throw new HttpException('La historia clinica no existe', HttpStatus.NOT_FOUND);
    }

    //* Retornamos el historial clinico en caso de que exista, mostrando la relacion del paciente y del medico
    return this.historyRepository.findOne({
      where: {id_medic_history: id},
      relations: ['medico', 'paciente']
    })
  }



  //! Servicio para modificar la informacion de un historial clinico por su id
  async update(id: number, updateHistoryDto: UpdateHistoryDto) {
    
    //* buscamos el historial por su id
    const historyFounded = await this.historyRepository.findOne({
      where: {id_medic_history: id}
    })

    //* Verificamos que el historial clinico exista
    if( !historyFounded){
      throw new HttpException('La historia clinica no existe', HttpStatus.NOT_FOUND);
    }

    //* Actualizamos la informacion del historial clinico
    Object.assign(historyFounded, updateHistoryDto);
    return await this.historyRepository.save(historyFounded);

  }

  async remove(id: number) {
    const historyFounded = await this.historyRepository.findOne({
      where: {id_medic_history: id}
    })

    if( !historyFounded){
      throw new HttpException('La historia clinica no existe', HttpStatus.NOT_FOUND);
    }

    return await this.historyRepository.remove(historyFounded);
  }
}
