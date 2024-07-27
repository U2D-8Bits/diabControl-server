/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateControlDto } from './dto/create-control.dto';
import { UpdateControlDto } from './dto/update-control.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Control } from './entities/control.entity';
import { Repository } from 'typeorm';
import { History } from 'src/histories/entities/history.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ControlService {

  constructor(
    @InjectRepository(Control)
    private readonly controlRepository: Repository<Control>,

    @InjectRepository(History)
    private readonly historyRepository: Repository<History>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}



  async create(createControlDto: CreateControlDto): Promise<Control> {
    const {patientId, medicId, historyId, ...rest} = createControlDto;

    const patient = await this.userRepository.findOne({
      where: {id_user: patientId}
    });

    if (!patient) {
      throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);
    }

    const medic = await this.userRepository.findOne({
      where: {id_user: medicId}
    });

    if (!medic) {
      throw new HttpException('Medic not found', HttpStatus.NOT_FOUND);
    }

    const history = await this.historyRepository.findOne({
      where: {id_medic_history: historyId}
    });

    if (!history) {
      throw new HttpException('History not found', HttpStatus.NOT_FOUND);
    }

    const id_control = `${patientId < 10 ? `0${patientId}` : patientId}${medicId < 10 ? `0${medicId}` : medicId}${historyId < 10 ? `0${historyId}` : historyId}`;




    const control = this.controlRepository.create({
      ...rest,
      id_control,
      medico: medic,
      paciente: patient,
      history: history
    });

    return await this.controlRepository.save(control);
  }


  //? Servicio para listar todas los controles de un paciente por su id y con paginación
  async findAllControlsByPatientId(patientId: number, page: number = 1, limit: number = 10) {

    const [controls, total] = await this.controlRepository.findAndCount({
      where: {paciente: { id_user: patientId} },
      take: limit,
      skip: (page - 1) * limit,
    });

    if (total === 0) {
      throw new HttpException('El paciente no tiene registrados controles actualmente', HttpStatus.NOT_FOUND);
    }

    return {
      data: controls,
      total,
      page,
      last_page: Math.ceil(total / limit)
    };
  }


  //? Funcion para obtener la data de un control por su id
  async findOne(id: number) {
    
    const control = await this.controlRepository.findOne({
      where: {id_medic_control: id},
      relations: ['medico', 'paciente', 'history']
    });

    if (!control) {
      throw new HttpException('Control not found', HttpStatus.NOT_FOUND);
    }

    return control;

  }

  //? Funcion para actualizar un control por su id

  async update(id: number, updateControlDto: UpdateControlDto) {
    
    const control = await this.controlRepository.findOne({
      where: {id_medic_control: id}
    });

    if (!control) {
      throw new HttpException('Control not found', HttpStatus.NOT_FOUND);
    }

    Object.assign(control, updateControlDto);
    return await this.controlRepository.save(control);

  }

  async remove(id: number) {
    
    const control = await this.controlRepository.findOne({
      where: {id_medic_control: id}
    });

    if (!control) {
      throw new HttpException('Control not found', HttpStatus.NOT_FOUND);
    }

    return await this.controlRepository.remove(control);
  }


  //? Servicio para obtener todos los controles de un paciente por su id y solo tener los datos de los signos vitales de las historias clínicas
  async getSignalsByPatientId(patientId: number) {
    const controls = await this.controlRepository.find({
      where: {paciente: {id_user: patientId}},
      select: ['history'],
      relations: ['history']
    });

    if (controls.length === 0) {
      throw new HttpException('El paciente no tiene registrados controles actualmente', HttpStatus.NOT_FOUND);
    }

    const historiesFounded = this.historyRepository.find({
      where: {paciente: {id_user: patientId}},
      select: ['weight_patient', 'pulse_patient', 'presure_patient', 'frequency_patient', 'temperature_patient', 'created_at'],
    })

    return (await historiesFounded).map(history => ({
      weight: history.weight_patient,
      pulse: history.pulse_patient,
      pressure: history.presure_patient,
      frequency: history.frequency_patient,
      temperature: history.temperature_patient,
      date: history.created_at,
    }));

  }
}
