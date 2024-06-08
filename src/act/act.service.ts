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
import * as path from 'path';
import { isUppercase } from 'class-validator';

@Injectable()
export class ActService {
  constructor(
    @InjectRepository(Act)
    private readonly actRepository: Repository<Act>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  //! Servicio para crear un Acta
  async create(createActDto: CreateActDto) {
    //* Destructuramos el createActDto
    const { id_patient, ...actData } = createActDto;

    //* Buscamos un usuario con el id del paciente
    const userPatient = await this.userRepository.findOne({
      where: { id_user: id_patient },
    });

    //* Verificamos que el paciente exista
    if (!userPatient) {
      throw new HttpException('El paciente no existe', HttpStatus.NOT_FOUND);
    }

    //* Creamos el acta

    const newAct = this.actRepository.create({
      ...actData,
      user: userPatient,
    });

    return await this.actRepository.save(newAct);
  }

  //! Servicio para listar todas las Actas
  async findAll() {
    //* Verificamos que exista algun acta, de ser que no lanzamos un mensaje notificandolo
    if ((await this.actRepository.find()).length === 0) {
      throw new HttpException('No existen actas', HttpStatus.NOT_FOUND);
    }

    //* Si existen actas, las devolvemos
    return await this.actRepository.find({
      relations: ['user'],
    });
  }

  //! Servicio para buscar un acta por su id
  async findOne(id: number) {
    //* Buscamos un acta por su id
    const actData = await this.actRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });

    //* Verificamos que exista el Acta
    if (!actData) {
      throw new HttpException(
        'El Acta no existe o no se puedo encontrar',
        HttpStatus.NOT_FOUND,
      );
    }

    //* Si existe devolvemos la informacion del Acta
    return this.actRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  //! Servicio para buscar un Acta por el id del usuario
  async findOneByPatientId(id: number) {
    //* Buscamos el usuario
    const patientData = this.userRepository.findOne({
      where: { id_user: id },
    });

    //* Verificamos que exista el usuario
    if (!patientData) {
      throw new HttpException(
        'El Paciente no fue encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    //* Buscamos el Acta atravez del id del paciente
    const actData = await this.actRepository.findOne({
      where: { user: { id_user: id } },
      relations: ['user'],
    });

    //* Verficiamos que el Acta exista
    if (!actData) {
      return 'No se encontro ningun acta para este paciente'
    }

    //* Si existe el actData, lo retornamos
    return actData;
  }

  //! Servicio para actualizar un Acta por su ID
  async update(id: number, updateActDto: UpdateActDto) {
    //* Buscamos un acta por su id
    const actData = await this.actRepository.findOne({
      where: { id },
    });

    //* Verificamos que el actData exista
    if (!actData) {
      throw new HttpException(
        'El acta solicitado no existe o no fue encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    Object.assign(actData, updateActDto);
    return await this.actRepository.save(actData);
  }

  //! Generar un PDF con la informacion de un Acta
  //Generar PDF prueba
  async generarPDF(id: number): Promise<Buffer>  {

    const actData = await this.actRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!actData) {
      throw new Error('Acta not found');
    }

      const pdfBuffer: Buffer = await new Promise( resolve => {

        const doc =  new PDFDocument(
          {
            size: "A4",
            layout: "portrait",
            margins: { top: 30, bottom: 30, left: 30, right: 30 },
            bufferPages: true
          })

          //todo
          doc.font('Helvetica-Bold').fontSize(16).text('CONSULTORIO MEDICO MILAGRO', { align: 'center' });
          doc
            .font('Helvetica')
            .fontSize(11)
            .text(
              'CIUDAD VERDE MZ 104 C5 REFUGIO PAMBILAR ENTRE PODOCARPUS Y TIMALIES',
              { align: 'center' },
            );
          doc
            .font('Helvetica')
            .fontSize(11)
            .text('consultoriomedicomilagro@yahoo.com', { align: 'center' });
          doc
          .font('Helvetica')
          .fontSize(11)
          .text('Santo Domingo-Ecuador', { align: 'center' });
          doc.moveDown(2); // Agregar espacio después del encabezado
    
          doc
          .font('Helvetica-Bold')
          .fontSize(12)
          .text('CONSENTIMIENTO INFORMADO DE PACIENTES', {
            align: 'center',
          });
    
          // Generamos una tabla con la información del usuario
          doc.moveDown();
          doc
          .font('Helvetica')
          .fontSize(11)
          .text('DATOS DEL PACIENTE');
    
          // En una tabla colocamos la información del paciente
          doc.moveDown();
          const userData = [
            [
              'Nombre y Apellido:',
              actData.user.user_name + ' ' + actData.user.user_lastname,
            ],
            ['Cédula:', actData.user.user_ced],
            ['Teléfono:', actData.user.user_phone],
            ['Dirección de Domicilio:', actData.user.user_address],
            ['Correo Electrónico:', actData.user.user_email],
          ];
          userData.forEach((row) => {
            doc
            .font('Helvetica')
            .fontSize(10).text(row.join(' ')); // Ajusta el indent según lo desees
          });
    
          doc.moveDown();
          const additionalInfo = [
            ['Menor de Edad:', actData.minor_age ? 'Sí' : 'No'],
            ['Discapacidad:', actData.disability ? 'Sí' : 'No'],
            ['Analfabetismo:', actData.illiteracy ? 'Sí' : 'No'],
          ];
          additionalInfo.forEach((row) => {
            doc
            .font('Helvetica')
            .fontSize(10).text(row.join(' '));
          });
    
          doc.moveDown();
          doc
          .font('Helvetica')
          .fontSize(11).text('DATOS DEL TUTOR LEGAL O REPRESENTANTE');
    
          doc.moveDown();
          const tutorData = [
            ['Nombre y Apellido:', actData.tutor_names],
            ['Cédula:', actData.tutor_ced],
            ['Teléfono:', actData.tutor_phone],
            ['Correo Electrónico:', actData.tutor_email],
            ['Motivo de Representación:', actData.tutor_motive],
          ];
          tutorData.forEach((row) => {
            doc
            .font('Helvetica')
            .fontSize(10).text(row.join(' '));
          });
    
    
          doc.moveDown();
          // Colocamos un texto introductorio con tamaño 12, justificado y en negrita el primer párrafo
          doc
            .font('Helvetica')
            .fontSize(10)
            .text('El', { continued: true })
            .font('Helvetica-Bold')
            .text(' Consultorio Médico Milagro, ', { continued: true })
            .font('Helvetica')
            .text(
              'con domicilio en Santo Domingo, en Urb. Ciudad Verde Mz 104, C5, Calle Refugio el Pambilar, en calidad de Responsable del Tratamiento de acuerdo con el Reglamento General de Protección de Datos Personales y Garantía de los derechos digitales, en relación al tratamiento de sus datos personales, le informa sobre lo siguiente:',
              { align: 'justify' },
            );
    
          doc.moveDown();
          const items = [
            'Finalidad del tratamiento de datos: Los datos personales que nos facilite serán usados con el fin de conservar su historial clínico y prestarles un servicio adaptado a sus necesidades, así como gestionar la contabilidad y facturación de la clínica. De igual forma, si autoriza, le mantendremos informado sobre promociones, ofertas y temas de salud por los canales facilitados.',
            'Plazo de conservación: Los datos de su historial clínico y datos de facturación, serán conservados por los plazos legales establecidos. Los datos de contacto serán conservados mientras no solicite su derecho de supresión o baja.',
            'Legitimación: La legitimación es el cumplimiento de obligaciones legales y el consentimiento otorgado.',
            'Destinatarios: Sus datos podrán ser cedidos a Administraciones Públicas cuando resulte obligatorio por ley; así también a bancos y cajas de ahorro si realiza pagos con tarjeta, al laboratorio clínico que el Dispensario tiene convenio. Nos comprometemos a no ceder sus datos a ninguna otra empresa, entidad o persona física o jurídica, a menos que dicha cesión se realice por imperativo legal.',
            'Confidencialidad: Los datos personales que nos facilite serán tratados de forma confidencial. Nuestro personal se ha comprometido previamente al deber de secreto. Se han implantado medidas técnicas y organizativas para limitar el acceso exclusivamente a las personas autorizadas.',
            'Menores: Si el paciente fuera menor de 18 años, deberá autorizar su representante legal o titular de la patria potestad o tutela. Tenga en cuenta que podríamos solicitarle el documento de identidad para comprobar su edad, así como documentación para acreditar el motivo de representación cuando proceda.',
            'Derechos: Puede ejercitar sus derechos de acceso, rectificación, supresión, limitación, portabilidad y oposición sobre sus datos personales, solicitándolo por escrito al Consultorio Médico Milagro, acompañando copia de su documento de identidad.',
          ];
    
          items.forEach((item, index) => {
            doc
              .font('Helvetica')
              .fontSize(10)
              .text(`${index + 1}.- ${item}`, { align: 'justify' });
          });
    
          doc.moveDown();
          doc
            .font('Helvetica')
            .fontSize(10)
            .text(
              'Si desea más información sobre nuestra política de protección de datos consúltenos. Autorizo el tratamiento de mis datos personales para los fines indicados:',
              { align: 'justify' },
            );
    
          doc.moveDown();
    
          const currentDate = actData.created_at;
          // Obtenemos el día, el nombre del mes y el año
          const day = currentDate.getDate();
          const month = currentDate.toLocaleString('es', { month: 'long' });
          const year = currentDate.getFullYear();
    
          doc
            .font('Helvetica')
            .fontSize(10)
            .text('En Santo Domingo, a ' + day + ' de ' + month + ' de ' + year, {
              align: 'left',
            });
    
          doc.moveDown(3);
          doc
            .font('Helvetica')
            .fontSize(10)
            .text('________________________________', { align: 'right' });
          doc.moveDown();
          doc
            .font('Helvetica')
            .fontSize(10)
            .text('Firmado y Conforme', { align: 'right' });


          const buffer = []
          doc.on('data', buffer.push.bind(buffer))
          doc.on('end', () => {
              const data = Buffer.concat(buffer)
              resolve(data)
          })
          doc.end()


      })

      return pdfBuffer;
    
  }

  //! Servicio para eliminar un Acta por su ID
  async remove(id: number) {
    //* Buscamos el acta por su id
    const actData = await this.actRepository.findOne({
      where: { id },
    });

    //* Verificamos que el acta exista
    if (!actData) {
      throw new HttpException(
        'El acta no existe o no fue encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    //* Si el acta existe la eliminamos
    return await this.actRepository.remove(actData);
  }
}
