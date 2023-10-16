import { Controller, Get, Body, Post, Param, Res, Req, NotFoundException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ListService } from './list.service';
import { ListEntity } from './list.entity';
import { CategoriesEntity } from './categories/categories.entity';
import * as path from 'path';
import * as fs from 'fs';

@Controller('list')
export class ListController {
  constructor(
    private readonly listService: ListService,
  ) { }

  @Post('add')
  async addItem(
    @Body() payload: any
  ) {
    return await this.listService.addItem(payload)
  }

  @Post('add-category')
  async addCategory(
    @Body() payload: any
  ) {
    return await this.listService.addCategory(payload)
  }

  @Get('get-all')
  async getAllList(): Promise<any> {
    return await this.listService.getAllList()
  }

  @Get('get-category/:name')
  async getCategory(
    @Param('name') name : string
  ): Promise<ListEntity[]> {
    return await this.listService.getCategory(name)
  }

  @Get('get-categories')
  async getCategories(): Promise<CategoriesEntity[]> {
    return await this.listService.getCategories()
  }

  @Get('not-found')
  async notFound() {
    throw new NotFoundException()
  }
  
   @Get("get/:category")
  getAllImages(
  @Req() req: Request,
  @Res() res: Response,
  @Param('category') category : string
  ) {
    const imagesDirectory = path.join('/root/sites_back/back_expensive/image', category);
    const fileNames = fs.readdirSync(imagesDirectory);

    const imageUrls = fileNames.map((fileName) => {
      return `${req.protocol}://${req.get('host')}/root/sites_back/back_expensive/image/${category}/${fileName}`;
    });

    return res.json(imageUrls);
  }
 
}

