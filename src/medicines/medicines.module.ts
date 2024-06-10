/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { MedicinesController } from './medicines.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medicine } from './entities/medicine.entity';
import { Medcategory } from 'src/medcategories/entities/medcategory.entity';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forFeature([Medicine, Medcategory]),
  ],
  controllers: [MedicinesController],
  providers: [MedicinesService],
})
export class MedicinesModule {}
