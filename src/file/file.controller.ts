/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileService } from './file.service';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { v4 as uuidv4 } from 'uuid';
import { storage } from './storage.config';
import { diskStorage } from 'multer';
import { CreateFileDto } from './dto/create-file.dto';
import { response } from 'express';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  //? Controlador para subir archivos
  @Post('upload/:iduser')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Param('iduser') iduser: number, @UploadedFile() file: Express.Multer.File ){
    return this.fileService.create(iduser, file);
  }




  //? Comtrolador para obtener un archivo
  @Get('uploaded/:userId')
  async getFile(@Param('userId') userId: number){
    const file = await this.fileService.getFileByUser(userId);

    //Retornamos la url del archivo y el id del archivo
    return { 
      url: `http://localhost:3000/pdfs/${file.filename}`,
      // url: `https://diabcontrol-production.up.railway.app/pdfs/${file.filename}`,
      id: file.id
    };
  }


  //? controlador para listar todos los archivos
  @Get()
  findAll() {
    return this.fileService.findAll();
  }




  //? Controlador para actualizar el archivo
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateFileDto: UpdateFileDto) {
    return this.fileService.update(id, updateFileDto);
  }




  //? Controlador para eliminar el Archivo por su id
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.fileService.remove(id);
  }
}

