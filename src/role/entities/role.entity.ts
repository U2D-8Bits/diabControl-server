/* eslint-disable prettier/prettier */


import { User } from "src/users/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tb_roles'})
export class Role {

    @PrimaryGeneratedColumn({name: 'int_id_role'})
    id_role: number


    @Column({name: 'str_role_name', type: 'varchar', length: 255, unique: true})
    role_name: string


    @Column({name: 'str_role_description', type: 'varchar', length: 255})
    role_description: string

    @OneToMany( () => User, (user) => user.role )
    users: User[]
}
