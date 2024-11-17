/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ControlService } from './control.service';
import { CreateControlDto } from './dto/create-control.dto';
import { UpdateControlDto } from './dto/update-control.dto';

@Controller('control')
export class ControlController {
  constructor(private readonly controlService: ControlService) {}

  @Post()
  create(@Body() createControlDto: CreateControlDto) {
    return this.controlService.create(createControlDto);
  }

  @Get('/paginated/:id')
  findAllControlsByPatientId(
    @Param('id') id: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ){
    return this.controlService.findAllControlsByPatientId(id, page, limit)
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.controlService.findOne(id);
  }

  @Get('reports/:id')
  getSignalsByIdPatient(
    @Param('id') id: number
  ){
    return this.controlService.getSignalsByPatientId(id)
  }

  @Get('asociated/:id')
  verifyAsociated(
    @Param('id') id: number,
  ){
    return this.controlService.checkControlByHistoryId(id)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateControlDto: UpdateControlDto) {
    return this.controlService.update(id, updateControlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.controlService.remove(id);
  }
}
