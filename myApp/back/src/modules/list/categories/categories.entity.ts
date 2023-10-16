import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ListEntity } from "../list.entity";
import { categoryEntityName } from "src/constants";

@Entity(categoryEntityName)
export class CategoriesEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({type : 'varchar', length : 100, nullable : false})
    public name : string;

    @OneToMany(() => ListEntity, (item) => item.type)
    public list: ListEntity[]
}
