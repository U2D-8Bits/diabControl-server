/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Form } from './entities/form.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Form]),
    UsersModule
  ],
  controllers: [FormsController],
  providers: [FormsService],
  exports: [FormsService]
})
export class FormsModule {}
