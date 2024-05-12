/* eslint-disable prettier/prettier */


import { User } from "src/users/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id_role: number


    @Column({type: 'varchar', length: 255, unique: true})
    role_name: string


    @Column({type: 'varchar', length: 255})
    role_description: string

    @OneToMany( () => User, (user) => user.role )
    users: User[]
}
