/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MedcategoriesService } from './medcategories.service';
import { MedcategoriesController } from './medcategories.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medcategory } from './entities/medcategory.entity';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forFeature([Medcategory]),
  ],
  controllers: [MedcategoriesController],
  providers: [MedcategoriesService],
})
export class MedcategoriesModule {}
