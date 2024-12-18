/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { History } from './entities/history.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class HistoriesService {
  constructor(
    @InjectRepository(History)
    private readonly historyRepository: Repository<History>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  //! Servicio para crear una historia clinica
  async create(createHistoryDto: CreateHistoryDto) {
    //* Destructuramos el createHistoryDto
    const { medicoId, pacienteId, ...historyData } = createHistoryDto;

    //* Buscamos un usuario con el id del medico
    const userMedico = await this.userRepository.findOne({
      where: { id_user: medicoId },
    });

    //* verificamos que el medico exista
    if (!userMedico) {
      throw new HttpException('El medico no existe', HttpStatus.NOT_FOUND);
    }

    //* Buscamos el usuario que es paciente
    const userPaciente = await this.userRepository.findOne({
      where: { id_user: pacienteId },
    });

    //* Verificamos que el userPaciente exista
    if (!userPaciente) {
      throw new HttpException('El paciente no existe', HttpStatus.NOT_FOUND);
    }

    //* Creamos la historia clinica
    const newHistory = this.historyRepository.create({
      ...historyData,
      medico: userMedico,
      paciente: userPaciente,
    });

    return await this.historyRepository.save(newHistory);
  }

  //! Servicio para listar todos los historiales clinicos
  async findAll() {
    //* Lanzamos un mensaje de que no existen historias clinicas
    if ((await this.historyRepository.find()).length === 0) {
      return 'No existen historias clinicas actualmente';
    }

    //* Si existen historias clinicas devolvemos el resultado
    return await this.historyRepository.find({
      relations: ['medico', 'paciente'],
    });
  }

  //! Servicio para listar todas las historias clinicas de un paciente por su id
  async findAllByPacienteId(id: number) {
    //* Buscamos el paciente por su id
    const userPaciente = await this.userRepository.findOne({
      where: { id_user: id },
    });

    //* Verificamos que el paciente exista
    if (!userPaciente) {
      throw new HttpException('El paciente no existe', HttpStatus.NOT_FOUND);
    }

    //* Buscamos los historiales por el id del paciente
    const historiesFounded = await this.historyRepository.find({
      where: { paciente: { id_user: id } },
      relations: ['medico', 'paciente'],
    });

    //* Verificamos que existan historiales clinicos
    if (historiesFounded.length === 0) {
      return 'El paciente no tiene historias clinicas';
    }

    //* Retornamos todas las historias clinicas del paciente
    return historiesFounded;
  }

  //! Servicio para listar todas las historias clínicas de un paciente por su id y con paginación
  async findAllByPacienteIdAndPagination(
    id: number,
    page: number,
    limit: number,
  ) {
    //* Buscamos el paciente por su id
    const userPaciente = await this.userRepository.findOne({
      where: { id_user: id },
    });

    //* Verificamos que el paciente exista
    if (!userPaciente) {
      throw new HttpException('El paciente no existe', HttpStatus.NOT_FOUND);
    }

    //* Buscamos los historiales por el id del paciente
    const options: FindManyOptions<History> = {
      where: { paciente: { id_user: id } },
      skip: (page - 1) * limit,
      take: limit,
      relations: ['medico', 'paciente'],
    };

    //* Buscamos los historiales del paciente
    const [historiesFounded, total] =
      await this.historyRepository.findAndCount(options);

    //* Verificamos que existan historiales clinicos
    if (historiesFounded.length === 0) {
      return 'El paciente no tiene historias clinicas';
    }

    //* Retornamos las historias clinicas del paciente con paginación
    return {
      data: historiesFounded,
      total,
      page,
      limit,
    };
  }


  //! Servicio para obtener todas las historias clinicas de un paciente por su id y solo tener los datos de los signos vitales
  async getSignalByPacienteId(id: number) {
    //* Buscamos el paciente por su id
    const userPaciente = this.userRepository.findOne({
      where: {id_user: id}
    })

    //* Verificamos que el paciente exista
    if (!userPaciente) {
      throw new HttpException('El paciente no existe', HttpStatus.NOT_FOUND);
    }

    //* Buscamos los historiales por el id del paciente
    const historiesFounded = this.historyRepository.find({
      where: { paciente: { id_user: id } },
      select: ['weight_patient', 'pulse_patient', 'presure_patient', 'frequency_patient', 'temperature_patient', 'created_at'],
    })

    //* Verificamos que existan historiales clinicos
    if ((await historiesFounded).length === 0) {
      return 'El paciente no tiene historias clinicas';
    }

    //* Retornamos las historias clinicas del paciente con solo los datos de los signos vitales (weight_patient, pulse_patient, presure_patient, frequency_patient, temperature_patient)
    return (await historiesFounded).map(history => ({
      weight: history.weight_patient,
      pulse: history.pulse_patient,
      pressure: history.presure_patient,
      frequency: history.frequency_patient,
      temperature: history.temperature_patient,
      date: history.created_at,
    }));

  }

  //! Servicio para buscar un historial clinico por su id
  async findOne(id: number) {
    //* Buscar por ID el historial clinico
    const historyFounded = await this.historyRepository.findOne({
      where: { id_medic_history: id },
      relations: ['medico', 'paciente'],
    });

    //* Verificar que exista el historial clinico
    if (!historyFounded) {
      throw new HttpException(
        'La historia clinica no existe',
        HttpStatus.NOT_FOUND,
      );
    }

    //* Retornar el historial clinico en caso de que exista, mostrando la relacion del paciente y del medico
    return historyFounded;
  }

  //! Servicio para modificar la informacion de un historial clinico por su id
  async update(id: number, updateHistoryDto: UpdateHistoryDto) {
    //* buscamos el historial por su id
    const historyFounded = await this.historyRepository.findOne({
      where: { id_medic_history: id },
    });

    //* Verificamos que el historial clinico exista
    if (!historyFounded) {
      throw new HttpException(
        'La historia clinica no existe',
        HttpStatus.NOT_FOUND,
      );
    }

    //* Actualizamos la informacion del historial clinico
    Object.assign(historyFounded, updateHistoryDto);
    return await this.historyRepository.save(historyFounded);
  }

  async remove(id: number) {
    const historyFounded = await this.historyRepository.findOne({
      where: { id_medic_history: id },
    });

    if (!historyFounded) {
      throw new HttpException(
        'La historia clinica no existe',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.historyRepository.remove(historyFounded);
  }
}
