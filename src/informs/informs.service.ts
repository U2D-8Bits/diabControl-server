import { Injectable } from '@nestjs/common';
import { CreateInformDto } from './dto/create-inform.dto';
import { UpdateInformDto } from './dto/update-inform.dto';

@Injectable()
export class InformsService {
  create(createInformDto: CreateInformDto) {
    return 'This action adds a new inform';
  }

  findAll() {
    return `This action returns all informs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inform`;
  }

  update(id: number, updateInformDto: UpdateInformDto) {
    return `This action updates a #${id} inform`;
  }

  remove(id: number) {
    return `This action removes a #${id} inform`;
  }
}
