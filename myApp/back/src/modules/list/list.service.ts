import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ListEntity } from './list.entity';
import { CategoriesEntity } from './categories/categories.entity';

@Injectable()
export class ListService {

  constructor(
    @InjectRepository(ListEntity)
    private listRepo: Repository<ListEntity>,
    @InjectRepository(CategoriesEntity)
    private categoryRepo: Repository<CategoriesEntity>,
  ) { }

  public async addItem(
    body: any
  ): Promise<ListEntity> {
    try {

      const newItem = await this.listRepo.save(this.listRepo.create({
        name: body.name,
        price: body.price,
        img: body.img,
        type: await this.categoryRepo.findOne({ where: { name: body.category } })
      }))

      if (!newItem) {
        throw new NotFoundException()
      }

      return newItem

    } catch (e) {
      throw new NotFoundException()
    }
  }

  public async addCategory(
    body: any
  ): Promise<CategoriesEntity> {
    try {

      const newCategory = await this.categoryRepo.save(this.categoryRepo.create({
        name: body.name
      }))

      if (!newCategory) {
        throw new NotFoundException()
      }

      return newCategory

    } catch (e) {
      throw new NotFoundException()
    }
  }

  async getAllList(): Promise<ListEntity[]> {
    const list = await this.listRepo.find({
      relations: {
        type: true
      }
    });

    if (!list) {
      throw new NotFoundException()
    }

    return list
  }

async getCategory(
    body: string
  ): Promise<any> {
    const list = await this.listRepo.find({
      where: {
        type: {
          name: body
        }
      },
      relations: {
        type: true
      },
    order: {
      name: 'DESC'
    }
    });

    if (!list || list.length == 0) {
      throw new NotFoundException()
    }

    return list
  }

  async getCategories() {
    const categories = await this.categoryRepo.find()

    if (!categories) {
      throw new NotFoundException()
    }

    return categories
  }

}
