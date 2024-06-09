/* eslint-disable prettier/prettier */
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tb_file'})
export class File {

    @PrimaryGeneratedColumn({name: 'int_id_file'})
    id: number;

    @Column({name: 'str_name_file', type: 'varchar', length: 255, nullable: false})
    name: string;

    @Column({name: 'str_path_file', type: 'varchar', length: 255, nullable: false})
    path: string;

    @OneToOne( () => User, user => user.file)
    @JoinColumn()
    user: User;
}
