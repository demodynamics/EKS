import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminEntity } from './admin.entity';
import { JwtModule } from '@nestjs/jwt';
import { TOKEN_SECRET } from 'config';
import { CategoriesEntity } from '../list/categories/categories.entity';
import { ListEntity } from '../list/list.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity]),
    TypeOrmModule.forFeature([ListEntity]),
    TypeOrmModule.forFeature([CategoriesEntity]),
    JwtModule.register({secret: TOKEN_SECRET})
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports : []
})

export class AdminModule {}