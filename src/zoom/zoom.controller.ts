import { Controller, Post, Body } from '@nestjs/common';
import { ZoomService } from './zoom.service';

@Controller('zoom')
export class ZoomController {
  constructor(private readonly zoomService: ZoomService) {}

  @Post('create-meeting')
  createMeeting(
    @Body('topic') topic: string,
    @Body('start_time') start_time: string,
    @Body('duration') duration: number,
  ) {
    return this.zoomService.createMeeting(topic, start_time, duration);
  }
}
