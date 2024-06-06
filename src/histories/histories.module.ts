/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { HistoriesService } from './histories.service';
import { HistoriesController } from './histories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { History } from './entities/history.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([History, User])
  ],
  controllers: [HistoriesController],
  providers: [HistoriesService],
})
export class HistoriesModule {}
