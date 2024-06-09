/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { User } from 'src/users/entities/user.entity';
import { Express } from 'express'

@Injectable()
export class FileService {

  constructor(
    @InjectRepository(File) private fileRepository: Repository<File>,
    @InjectRepository(User) private userRepository: Repository<User>
  ){}



  //! Servicio para obtener un archivo por su id
  async create(userId: number, file: Express.Multer.File): Promise<File>{
    const user = await this.userRepository.findOne({
      where: {id_user: userId}
    })

    if( !user ){
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)
    }

    //Eliminar el archivo existente si el usuario ya tiene uno
    if( user.file ){
      await this.fileRepository.delete(user.file.id)
    }

    const newFile = this.fileRepository.create({
      filename: file.filename,
      path: file.path,
      user: user
    })

    await this.fileRepository.save(newFile);

    user.file = newFile;
    await this.userRepository.save(user)

    return newFile;
  }


  //! Servicio para obtener un archivo por id del usuario
  async getFileByUser(id: number){

    const user = await this.userRepository.findOne({
      where: {id_user: id},
      relations: ['file']
    })


    if( !user ) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)
    }

    if( !user.file ){
      throw new HttpException('Archivo no encontrado para este usuario', HttpStatus.NOT_FOUND)
    }

    return await this.fileRepository.findOne({
      where:{user: {id_user: id}},
      relations: ['user']
    })

  }



  //! Servicio para listar todos los archivos subido
  async findAll() {
    
    if( (await this.fileRepository.find() ).length === 0 ){
      throw new HttpException('No existen Archivos Subidos', HttpStatus.NOT_FOUND)
    }

    return await this.fileRepository.find({
      relations: ['user']
    });

  }


  //! Servicio para listar un archivo por su id
  async findOne(id: number) {
    
    const fileData = await this.fileRepository.findOne({
      where: {id}
    })

    if( !fileData ){
      throw new HttpException('No se ha encontrado o no existe el Archivo', HttpStatus.NOT_FOUND)
    }

    return await this.fileRepository.findOne({
      where: {id},
      relations: ['user']
    })
  }



  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }




  async remove(id: number): Promise<File> {
    
    const fileData = await this.fileRepository.findOne({
      where: {id: id}
    })

    if (!fileData){
      throw new HttpException('No se ha encontrado el Archivo', HttpStatus.NOT_FOUND)
    }

    return await this.fileRepository.remove(fileData)
    
  }
}
