import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ZoomService } from './zoom.service';
import { ZoomController } from './zoom.controller';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  providers: [ZoomService],
  controllers: [ZoomController],
})
export class ZoomModule {}
