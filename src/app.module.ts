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
    RoleModule,
    UsersModule,
    HistoriesModule,
    ActModule,
    FileModule,
    MedicinesModule,
    MedcategoriesModule,
  ],
  controllers: [],
  providers: [],
})




export class AppModule {
  


}
