/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Medicine } from './entities/medicine.entity';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { Medcategory } from 'src/medcategories/entities/medcategory.entity';

@Injectable()
export class MedicinesService {

  constructor(
    @InjectRepository(Medicine) private medicineRepository: Repository<Medicine>,
    @InjectRepository(Medcategory) private medCategoryRepo: Repository<Medcategory>
  ){}



  //! Servicio para crear un nuevo medicamento
  async create(createMedicineDto: CreateMedicineDto) {
    
    const {idCategory, ...medData} = createMedicineDto;

    const category = await this.medCategoryRepo.findOne({
      where: {id: idCategory}
    })

    if( !category ){
      throw new HttpException('La categoria no existe', HttpStatus.BAD_REQUEST)
    }

    //Verificamos que el nombre generico del medicamento no exista
    const medicineExist = await this.medicineRepository.findOne({
      where: {generic_name: medData.generic_name}
    })

    if( medicineExist ){
      throw new HttpException('Ya existe un medicamento asociado a ese nombre genérico', HttpStatus.BAD_REQUEST)
    }

    const medicine = this.medicineRepository.create({
      ...medData,
      category: category
    })

    return await this.medicineRepository.save(medicine)

  }



  //! Servicio para listar todos los medicamentos
  async findAll() {
    
    if( (await this.medicineRepository.find()).length === 0 ){
      throw new HttpException('No hay medicamentos registrados', HttpStatus.OK)
    }

    return await this.medicineRepository.find({
      relations: ['category']
    })

  }


  //! Servicio para mandar la cantidad de medicamentos registrados
  async countMedicines(){
    return await this.medicineRepository.count()
  }



  //! Servicio para listar todos los medicamentos con paginación y busqueda
  async findAllMedicinesPaginated(page: number, limit: number, search: string){
    
    const options: FindManyOptions<Medicine> = {
      skip: (page - 1) * limit,
      take: limit,
      relations: ['category']
    }

    if(search){
      options.where = [
        {name_medicine: ILike(`%${search}%`)},
        { category: {name_category: ILike(`%${search}%`)} }
      ]
    }

    const [medicines, total] = await this.medicineRepository.findAndCount(options)
    return {
      data: medicines,
      total,
      page,
      limit
    }

  }



  //! Servicio para buscar un medicamento por su id
  async findOne(id: number) {
    
    const medicine = await this.medicineRepository.findOne({
      where: {id: id}
    })

    if( !medicine ){
      throw new HttpException('El medicamento no existe', HttpStatus.NOT_FOUND)
    }

    return await this.medicineRepository.findOne({
      where: {id: id},
      relations: ['category']
    })

  }


  //! Servicio para actualizar un medicamento por su id
  async update(id: number, updateMedicineDto: UpdateMedicineDto) {
    
    const {idCategory, ...medData} = updateMedicineDto;

    const category = await this.medCategoryRepo.findOne({
      where: {id: idCategory}
    })

    if( !category ){
      throw new HttpException('La categoria no existe', HttpStatus.BAD_REQUEST)
    }

    const medicine = await this.medicineRepository.findOne({
      where: {id: id}
    })

    if( !medicine ){
      throw new HttpException('El medicamento no existe', HttpStatus.NOT_FOUND)
    }

    //Verificamos que el nombre generico del medicamento no exista
    const medicineExist = await this.medicineRepository.findOne({
      where: {generic_name: medData.generic_name}
    })

    if( medicineExist && medicineExist.id !== id ){
      throw new HttpException('Ya existe un medicamento asociado a ese nombre genérico', HttpStatus.BAD_REQUEST)
    }

    this.medicineRepository.merge(medicine, {
      ...medData,
      category: category
    })

    Object.assign(medicine, updateMedicineDto)
    this.medicineRepository.save(medicine)

  }


  //! Servicio para eliminar un medicamento por su id
  async remove(id: number) {
    
    const medicine = await this.medicineRepository.findOne({
      where: {id: id}
    })

    if( !medicine ){
      throw new HttpException('El medicamento no existe', HttpStatus.NOT_FOUND)
    }

    return await this.medicineRepository.delete(medicine)

  }
}
