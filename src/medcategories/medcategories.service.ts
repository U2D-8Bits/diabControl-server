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





 //! Servicio para crear una nueva categoría de medicamento
 async create(createMedcategoryDto: CreateMedcategoryDto) {
  //* Convertimos el nombre de la categoría a minúsculas
  const normalizedCategoryName = createMedcategoryDto.name_category.toLowerCase();

  //* Verificamos si la categoría ya existe
  const existingCategory = await this.medcategoryRepository.findOne({
    where: { name_category: normalizedCategoryName },
  });

  //* Si la categoría ya existe, lanzamos un error
  if (existingCategory) {
    throw new HttpException('Esta categoría ya existe', HttpStatus.BAD_REQUEST);
  }

  //* Creamos la nueva categoría con el nombre normalizado
  const category = this.medcategoryRepository.create({
    ...createMedcategoryDto,
    name_category: normalizedCategoryName,
  });

  //* Guardamos la categoría en la base de datos
  return await this.medcategoryRepository.save(category);
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
    //* Función para normalizar el texto
    const normalizeText = (text: string): string => {
      return text.toLowerCase();
    };

    //* Verificamos directamente con un if que el id sea de una categoría existente
    const existingCategoryById = await this.medcategoryRepository.findOne({ where: { id } });
    if (!existingCategoryById) {
      throw new HttpException('Esta categoría no existe', HttpStatus.NOT_FOUND);
    }

    //* Normalizamos el nombre de la categoría
    const normalizedCategoryName = normalizeText(updateMedcategoryDto.name_category);

    //* Verificamos si la categoría con el nombre normalizado ya existe
    const existingCategoryByName = await this.medcategoryRepository.findOne({
      where: { name_category: normalizedCategoryName },
    });

    //* Si la categoría ya existe y es diferente de la que estamos actualizando, lanzamos un error
    if (existingCategoryByName && existingCategoryByName.id !== id) {
      throw new HttpException('Esta categoría ya existe', HttpStatus.BAD_REQUEST);
    }

    //* Actualizamos la categoría y retornamos la categoría actualizada
    Object.assign(existingCategoryById, {
      ...updateMedcategoryDto,
      name_category: normalizedCategoryName,
    });

    return await this.medcategoryRepository.save(existingCategoryById);
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
