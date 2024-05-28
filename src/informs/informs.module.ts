import { Module } from '@nestjs/common';
import { InformsService } from './informs.service';
import { InformsController } from './informs.controller';

@Module({
  controllers: [InformsController],
  providers: [InformsService],
})
export class InformsModule {}
