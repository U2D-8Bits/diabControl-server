import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InformsService } from './informs.service';
import { CreateInformDto } from './dto/create-inform.dto';
import { UpdateInformDto } from './dto/update-inform.dto';

@Controller('informs')
export class InformsController {
  constructor(private readonly informsService: InformsService) {}

  @Post()
  create(@Body() createInformDto: CreateInformDto) {
    return this.informsService.create(createInformDto);
  }

  @Get()
  findAll() {
    return this.informsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.informsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInformDto: UpdateInformDto) {
    return this.informsService.update(+id, updateInformDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.informsService.remove(+id);
  }
}
