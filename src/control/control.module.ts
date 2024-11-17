/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ControlService } from './control.service';
import { ControlController } from './control.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { History } from 'src/histories/entities/history.entity';
import { Control } from './entities/control.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Control, History, User])
  ],
  controllers: [ControlController],
  providers: [ControlService],
})
export class ControlModule {}
