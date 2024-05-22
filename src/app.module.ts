/* eslint-disable prettier/prettier */


import { Module } from '@nestjs/common';
import { RoleModule } from './role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    RoleModule,
    UsersModule],
  controllers: [],
  providers: [],
})




export class AppModule {
  
  // Imprimimos en consola toda la información de la base de datos
  constructor() {
    console.log(`Server running on PORT: ${process.env.DB_PORT ?? 3000}`);
    console.log(`DB_HOST: ${process.env.DB_HOST}`);
    console.log(`DB_PORT: ${process.env.DB_PORT}`);
    console.log(`DB_USER: ${process.env.DB_USER}`);
    console.log(`DB_PASSWORD: ${process.env.DB_PASSWORD}`);
    console.log(`DB_NAME: ${process.env.DB_NAME}`);
  }

}
