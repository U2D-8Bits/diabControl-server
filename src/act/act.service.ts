/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateActDto } from './dto/create-act.dto';
import { UpdateActDto } from './dto/update-act.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Act } from './entities/act.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';

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


  //! Generar un PDF con la informacion de un Acta
  async generatePDF(id: number){

    const pdfPath = `acta_${id}.pdf`;
    const doc = new PDFDocument({size: 'A4', margin: 50});
    
    const actData = await this.actRepository.findOne({
      where: {id},
      relations: ['user']
    })

    doc.pipe(fs.createWriteStream(pdfPath));

    // Colocamos un encabezado con el titulo del documento
    doc.fontSize(18).text('CONSULTORIO MEDICO MILAGRO', { align: 'center' });
    doc.fontSize(12).text('CIUDAD VERDE MZ 104 C5 REFUGIO PAMBILAR ENTRE PODOCARPUS Y TIMALIES', { align: 'center' });
    doc.fontSize(12).text('consultoriomedicomilagro@yahoo.com', { align: 'center' });
    doc.fontSize(12).text('Santo Domingo-Ecuador', { align: 'center' });
    doc.moveDown(2);  // Agregar espacio después del encabezado


    doc.fontSize(16).text('Consentimiento Informado de Paciente', {
      align: 'center'
    });

    // Generamos una tabla con la informacion del usuario
    doc.moveDown();
    doc.fontSize(15).text('Informacion del Paciente', {
      underline: true
    });

    //En una tabla colocamos la informacion del paciente
    doc.moveDown();
    doc.table(
      [
        ['Nombre y Apellido', 'Cedula', 'Telefono', 'Direccion de Domicilio', 'Correo Electronico'], 
        [actData.user.user_name + ' ' + actData.user.user_lastname, actData.user.user_ced, actData.user.user_phone, actData.user.user_address, actData.user.user_email]
      ]
    )

    doc.moveDown();
    doc.table(
      [
        [
          'Menor de Edad', 'Discapacidad', 'Analfabetismo'
        ],
        [
          actData.minor_age ? 'Si' : 'No',
          actData.disability ? 'Si' : 'No',
          actData.illiteracy ? 'Si' : 'No'
        ]
      ]
    )

    doc.moveDown();
    doc.fontSize(15).text('Informacion del Tutor Legal', {
      underline: true
    });


    doc.moveDown();
    doc.table(
      [
        ['Nombre y Apellido', 'Cedula', 'Telefono', 'Correo Electronico', 'Motivo de Representacion'], 
        [actData.tutor_names, actData.tutor_ced, actData.tutor_phone, actData.tutor_email, actData.tutor_motive]
      ]
    )

    doc.moveDown();
    doc.fontSize(15).text('Informacion del Acta', {
      underline: true
    });


    doc.moveDown();
    //Colocamos un texto introductorio con tamaño 12, justificado y en negrita el primer parrafo
    doc.font('Helvetica').fontSize(12).text('El', {continued: true}).font('Helvetica-Bold').text(' Consultorio Médico Milagro, ', {continued: true}).font('Helvetica').text('con domicilio en Santo Domingo, en Urb. Ciudad Verde Mz    104, C5, Calle Refugio el Pambilar, en calidad de Responsable del Tratamiento de acuerdo con el Reglamento General de Protección de Datos Personales y Garantía de los derechos digitales, en relación al tratamiento de sus datos personales, le informa sobre lo siguiente:', {align: 'justify'});

    doc.moveDown();
    const items = [
      'Finalidad del tratamiento de datos: Los datos personales que nos facilite serán usados con el fin de conservar su historial clínico y prestarles un servicio adaptado a sus necesidades, así como gestionar la contabilidad y facturación de la clínica. De igual forma, si autoriza, le mantendremos informado sobre promociones, ofertas y temas de salud por los canales facilitados.',
      'Plazo de conservación: Los datos de su historial clínico y datos de facturación, serán conservados por los plazos legales establecidos. Los datos de contacto serán conservados mientras no solicite su derecho de supresión o baja.',
      'Legitimación: La legitimación es el cumplimiento de obligaciones legales y el consentimiento otorgado.',
      'Destinatarios: Sus datos podrán ser cedidos a Administraciones Públicas cuando resulte obligatorio por ley; así también a bancos y cajas de ahorro si realiza pagos con tarjeta, al laboratorio clínico que el Dispensario tiene convenio. Nos comprometemos a no ceder sus datos a ninguna otra empresa, entidad o persona física o jurídica, a menos que dicha cesión se realice por imperativo legal.',
      'Confidencialidad: Los datos personales que nos facilite serán tratados de forma confidencial. Nuestro personal se ha comprometido previamente al deber de secreto. Se han implantado medidas técnicas y organizativas para limitar el acceso exclusivamente a las personas autorizadas.',
      'Menores: Si el paciente fuera menor de 18 años, deberá autorizar su representante legal o titular de la patria potestad o tutela. Tenga en cuenta que podríamos solicitarle el documento de identidad para comprobar su edad, así como documentación para acreditar el motivo de representación cuando proceda.',
      'Derechos: Puede ejercitar sus derechos de acceso, rectificación, supresión, limitación, portabilidad y oposición sobre sus datos personales, solicitándolo por escrito al Consultorio Médico Milagro, acompañando copia de su documento de identidad.'
    ]
    
    items.forEach( (item, index) =>{
      doc.font('Helvetica').fontSize(12).text(`${index + 1}.- ${item}`, {align: 'justify'});
    })


    doc.moveDown();
    doc.font('Helvetica').fontSize(12).text('Si desea más información sobre nuestra política de protección de datos consúltenos. Autorizo el tratamiento de mis datos personales para los fines indicados:', {align: 'justify'});

    doc.moveDown();

    const currentDate = actData.created_at;
    // Obtenemos el dia, el nombre del mes y el anio
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString('es', {month: 'long'});
    const year = currentDate.getFullYear();

    doc.font('Helvetica').fontSize(12).text('En Santo Domingo, a ' + day + ' de ' + month + ' de ' + year, {align: 'left'});

    doc.moveDown();
    doc.font('Helvetica').fontSize(12).text('________________________________', {align: 'right'});
    doc.moveDown();
    doc.font('Helvetica').fontSize(12).text('Firmado y Conforme', {align: 'right'});

    doc.end();
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
