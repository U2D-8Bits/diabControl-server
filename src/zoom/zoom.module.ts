import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ZoomService } from './zoom.service';
import { ZoomController } from './zoom.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [ZoomController],
  providers: [ZoomService],
})
export class ZoomModule {}
