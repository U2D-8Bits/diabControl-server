/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { InformsService } from './informs.service';
import { InformsController } from './informs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inform } from './entities/inform.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inform])
  ],
  controllers: [InformsController],
  providers: [InformsService],
})
export class InformsModule {}
