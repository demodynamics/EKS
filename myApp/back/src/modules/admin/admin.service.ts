import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from './admin.entity';
import { IAddItem, IAdminLoginRegister, IChangeItem } from './interfaces';
import { hashPassword, compareHash } from 'src/utlis/encrypt';
import { CategoriesEntity } from '../list/categories/categories.entity';
import { ListEntity } from '../list/list.entity';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(AdminEntity)
        private adminsRepo: Repository<AdminEntity>,
        @InjectRepository(ListEntity)
        private listRepo: Repository<ListEntity>,
        @InjectRepository(CategoriesEntity)
        private categoriesRepo: Repository<CategoriesEntity>
    ) { }

    public async createAdmin(body: IAdminLoginRegister) {
        try {
            const hashedPassword = hashPassword(body.password)

            const newAdmin = await this.adminsRepo.save(this.adminsRepo.create({
                login: body.login,
                password: hashedPassword
            }))

            if (!newAdmin) {
                throw new BadRequestException()
            }

            if (newAdmin['password']) {
                delete newAdmin['password']
            }

            return newAdmin
        } catch (e) {
            console.log(e)
            if (e.detail.includes('login')) {
                throw new BadRequestException('exist')
            }
        }
    }

    public async loginAdmin(
        { login, password }: IAdminLoginRegister
    ): Promise<AdminEntity> {
        const foundAdmin = await this.adminsRepo.findOne({ where: { login } })
        if (!foundAdmin) {
            throw new NotFoundException("dont")
        }

        const decriptedPassword = compareHash(password, foundAdmin.password)

        if (foundAdmin.password) {
            delete foundAdmin.password
        }

        if (!decriptedPassword) {
            throw new BadRequestException('invalidpassword')
        }

        return foundAdmin
    }

    public async updateItem(
        id : string,
        payload : IChangeItem | any
    ):Promise<string> {

        const updateItem = await this.listRepo.update(id, {
            ...payload,
            price : payload.price,
            oldPrice : payload.oldPrice
        })

        if(!updateItem) {
            throw new BadRequestException()
        }

        return "Item updated"
    }

    public async deleteItem(
        id : string
    ):Promise<string> {
        const deleteItem = await this.listRepo.delete({id})

        if(!deleteItem) {
            throw new BadRequestException('delete failed')
        }

        return "Item deleted"
    }

    public async addItem(
        body: IAddItem|any
      ): Promise<ListEntity> {
        try {
    
          const newItem = await this.listRepo.save(this.listRepo.create({
            name: body.name,
            price: body.price,
            img: body.img,
            type: await this.categoriesRepo.findOne({ where: { name: body.category } })
          }))
    
          if (!newItem) {
            throw new NotFoundException()
          }
		  
          return newItem
    
        } catch (e) {
          throw new NotFoundException()
        }
      }

}