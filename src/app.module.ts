/* eslint-disable prettier/prettier */


import { Module } from '@nestjs/common';
import { RoleModule } from './role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { InformsModule } from './informs/informs.module';
import { FormsModule } from './forms/forms.module';
import { HistoriesModule } from './histories/histories.module';
import { ActModule } from './act/act.module';
import { FileModule } from './file/file.module';

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
    UsersModule,
    InformsModule,
    FormsModule,
    HistoriesModule,
    ActModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})




export class AppModule {
  


}
