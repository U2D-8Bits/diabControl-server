/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { User } from 'src/users/entities/user.entity';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/utils/multer/pdf-update.utils';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([File, User]),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    })
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
