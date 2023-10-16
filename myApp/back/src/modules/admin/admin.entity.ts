import { adminEntityName } from "src/constants";
import { Column, Entity, CreateDateColumn, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity(adminEntityName)
@Unique(['login'])
export class AdminEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({type : 'varchar', length : 100, nullable : false})
    public login : string;

    @Column({type : 'varchar', length : 100, nullable : false})
    public password : string;

    @CreateDateColumn({ nullable : false})
    public createdAt: Date;
}
