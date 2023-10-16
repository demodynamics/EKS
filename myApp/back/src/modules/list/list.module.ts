import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListEntity } from './list.entity';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { CategoriesEntity } from './categories/categories.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ListEntity]),
    TypeOrmModule.forFeature([CategoriesEntity])
  ],
  controllers: [ListController],
  providers: [ListService],
  exports : []
})

export class ListModule {}