import { Injectable } from '@nestjs/common';
import { CreateMedcategoryDto } from './dto/create-medcategory.dto';
import { UpdateMedcategoryDto } from './dto/update-medcategory.dto';

@Injectable()
export class MedcategoriesService {
  create(createMedcategoryDto: CreateMedcategoryDto) {
    return 'This action adds a new medcategory';
  }

  findAll() {
    return `This action returns all medcategories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medcategory`;
  }

  update(id: number, updateMedcategoryDto: UpdateMedcategoryDto) {
    return `This action updates a #${id} medcategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} medcategory`;
  }
}
