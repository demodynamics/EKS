import { BadRequestException, Body, Controller, NotFoundException, UseInterceptors, UploadedFile, Res, Post, Put, Param, Delete } from '@nestjs/common';
import { Request, Response } from 'express';
import { AdminEntity } from './admin.entity';
import { AdminService } from './admin.service';
import createUserDto from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { TOKEN_SECRET } from 'config';
import addItemDto from './dto/add-item.dto';
import changeItemDto from './dto/change.item.dto';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { ListEntity } from '../list/list.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';

@Controller('admin')
export class AdminController {
    constructor(
        private readonly adminService: AdminService,
        private readonly jwtService: JwtService,
    ) { }

    @Post('/register')
    public async AdminRegistration(
        @Body() payload: createUserDto
    ): Promise<AdminEntity | any> {
        const admin: any = await this.adminService.createAdmin(payload);

        if (!admin) {
            throw new BadRequestException('creating filed')
        }

        return {
            admin,
            token: this.jwtService.sign({
                id: admin.id,
                login: admin.login
            },
            {
                secret: TOKEN_SECRET,
                expiresIn: process.env.JWT_EXPIRATION
            })
        }

    }

    @Post('/login')
    public async loginAdmin(
        @Body() payload: LoginUserDto
    ): Promise<AdminEntity | any> {
        const admin = await this.adminService.loginAdmin(payload)

        if (!admin) throw new NotFoundException()

        return {
            admin,
            token: this.jwtService.sign({
                id: admin.id,
                login: admin.login
            },
            {
                secret: TOKEN_SECRET,
                expiresIn: process.env.JWT_EXPIRATION
            })
        }
    }

    @Put('/edit/:id')
    public async updateItem(
        @Param() { id }: ListEntity,
        @Body() payload: changeItemDto
    ) {
        return await this.adminService.updateItem(id, payload);
    }

    @Delete('/delete/:id')
    public async deleteItem(
        @Param() { id }: ListEntity
    ) {
        return await this.adminService.deleteItem(id);
    }

    //@Post('/add')
    //async addItem(
    //    @Body() payload: addItemDto | any                 , @Body() payload: addItemDto|any
    //) {
	//console.log(payload, "testtttttttttttttttttttttttttttttttt")
    //    return await this.adminService.addItem(payload)
    //}
	
	@Post('/upload/:folderName')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: (req, file, cb) => {
        const folderName = req.params.folderName;
        const folderPath = path.resolve('./image', folderName);
        cb(null, folderPath);
      },
      filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
      },
    }),
  }))
  public async upload(@UploadedFile() file: Express.Multer.File, @Body() payload: addItemDto) {
    return await this.adminService.addItem(payload)
  }
}