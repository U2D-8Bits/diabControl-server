/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ActService } from './act.service';
import { ActController } from './act.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Act } from './entities/act.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Act, User]),
  ],
  controllers: [ActController],
  providers: [ActService],
})
export class ActModule {}
