/* eslint-disable prettier/prettier */


import { Module } from '@nestjs/common';
import { RoleModule } from './role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { HistoriesModule } from './histories/histories.module';
import { ActModule } from './act/act.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MedicinesModule } from './medicines/medicines.module';
import { MedcategoriesModule } from './medcategories/medcategories.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ControlModule } from './control/control.module';
import { ZoomModule } from './zoom/zoom.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PGHOST,
      port: parseInt(process.env.PGPORT),
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'pdfs'), // Directorio donde se almacenan los archivos
      serveRoot: '/pdfs', // Ruta base para servir los archivos estáticos
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
      defaults: {
        from: '"nest-modules" <process.env.EMAIL_USER>',
      },
    }),
    RoleModule,
    UsersModule,
    HistoriesModule,
    ActModule,
    FileModule,
    MedicinesModule,
    MedcategoriesModule,
    ControlModule,
    ZoomModule,
  ],
  controllers: [],
  providers: [],
})




export class AppModule {
  


}
