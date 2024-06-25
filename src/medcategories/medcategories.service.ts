/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMedcategoryDto } from './dto/create-medcategory.dto';
import { UpdateMedcategoryDto } from './dto/update-medcategory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Medcategory } from './entities/medcategory.entity';
import { FindManyOptions, ILike, Repository } from 'typeorm';

@Injectable()
export class MedcategoriesService {

  constructor(
    @InjectRepository(Medcategory)
    private medcategoryRepository: Repository<Medcategory>
  ){}





  //! Servicio para crea una nueva categoria de medicamento
  async create(createMedcategoryDto: CreateMedcategoryDto) {
    
    //* Buscamos la categoria en base al nombre
    const newCategory = await this.medcategoryRepository.findOne({
      where: {name_category: createMedcategoryDto.name_category}
    })

    //* Si la categoria ya existe, lanzamos un error
    if( newCategory){
      throw new HttpException('Esta categoria ya existe', HttpStatus.BAD_REQUEST)
    }

    //* Creamos la nueva categoria en caso de que no exista
    const category = this.medcategoryRepository.create(createMedcategoryDto)


    //* Guardamos la categoria en la base de datos
    return await this.medcategoryRepository.save(category)

  }



  //! Servicio para listar todas las categorias de medicamentos
  async findAll() {
    
    if( (await this.medcategoryRepository.find()).length === 0 ){
      throw new HttpException('No hay categorias de medicamentos', HttpStatus.OK)
    }

    return await this.medcategoryRepository.find()

  }

    //! Servicio para mandar la cantidad de categorias de medicamentos registrados
    async countCategories(){
      return await this.medcategoryRepository.count()
    }


  //! Método para listar todas las categorias con paginación y busqueda
  async findAllCategoriesPaginated(page: number, limit: number, search: string){

    const options: FindManyOptions<Medcategory> = {
      skip: (page - 1) * limit,
      take: limit,
    }

    if(search){
      options.where = [
        {name_category: ILike(`%${search}%`)}
      ]
    }

    const [categories, total] = await this.medcategoryRepository.findAndCount(options)
    return {
      data: categories,
      total,
      page,
      limit
    }
  }


  //! Servicio para buscar una categoria por su id
  async findOne(id: number) {
    
    //* Buscamos la categoria en base al id
    const category = await this.medcategoryRepository.findOne({
      where: {id}
    })

    //* Si la categoria no existe, lanzamos un error
    if( !category){
      throw new HttpException('Esta categoria no existe', HttpStatus.NOT_FOUND)
    }

    return category

  }


  //! Servicio para buscar una categoria por su nombre
  async findOneByName(name: string){

    //* Buscamos la categoria en base al nombre
    const category = await this.medcategoryRepository.findOne({
      where: {name_category: name}
    })

    //* Si la categoria no existe, lanzamos un error
    if( !category){
      throw new HttpException('Esta categoria no existe', HttpStatus.NOT_FOUND)
    }

    return category
  }


  //! Servicio para actualizar una categoria
  async update(id: number, updateMedcategoryDto: UpdateMedcategoryDto) {
    
    //* Buscamos la categoria en base al id
    const category = await this.medcategoryRepository.findOne({
      where: {id}
    })

    //* Si la categoria no existe, lanzamos un error
    if( !category){
      throw new HttpException('Esta categoria no existe', HttpStatus.NOT_FOUND)
    }


    //* Actualizamos la categoria y retornamos la categoria actualizada
    Object.assign(category, updateMedcategoryDto)
    return await this.medcategoryRepository.save(category)

  }


  //! Servicio para eliminar una categoria
  async remove(id: number) {
    
    //* Buscamos la categoria en base al id
    const category = await this.medcategoryRepository.findOne({
      where: {id}
    })

    //* Si no existe la categoria, lanzamos un error
    if( !category){
      throw new HttpException('Esta categoria no existe', HttpStatus.NOT_FOUND)
    }

    //* Eliminamos la categoria
    return await this.medcategoryRepository.remove(category)

  }
}
