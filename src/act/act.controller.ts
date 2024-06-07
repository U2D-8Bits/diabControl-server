import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActService } from './act.service';
import { CreateActDto } from './dto/create-act.dto';
import { UpdateActDto } from './dto/update-act.dto';

@Controller('act')
export class ActController {
  constructor(private readonly actService: ActService) {}

  @Post()
  create(@Body() createActDto: CreateActDto) {
    return this.actService.create(createActDto);
  }

  @Get()
  findAll() {
    return this.actService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActDto: UpdateActDto) {
    return this.actService.update(+id, updateActDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actService.remove(+id);
  }
}
