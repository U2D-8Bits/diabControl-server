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
      host: process.env.PGHOST,
      port: parseInt(process.env.PGPORT),
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.POSTGRES_DB,
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
    console.log(`Server running on PORT: ${process.env.PGPORT ?? 3000}`);
    console.log(`DB_HOST: ${process.env.PGHOST}`);
    console.log(`DB_PORT: ${process.env.PGPORT}`);
    console.log(`DB_USER: ${process.env.PGUSER}`);
    console.log(`DB_PASSWORD: ${process.env.PGPASSWORD}`);
    console.log(`DB_NAME: ${process.env.POSTGRES_DB}`);

    // Imprimimos en consola la ruta que se debe usar en postman
    console.log(`http://localhost:${process.env.PORT ?? 3000}/api/role`);
  }

}
