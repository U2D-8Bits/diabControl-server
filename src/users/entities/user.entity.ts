/* eslint-disable prettier/prettier */


import { Role } from "src/role/entities/role.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id_user: number

    @Column({type: 'varchar', length: 255, nullable: false})
    user_name: string

    @Column({type: 'varchar', length: 255, nullable: false})
    user_lastname: string

    @Column({type: 'varchar', length: 255, unique: true, nullable: false})
    user_username: string

    @Column({type: 'varchar', length: 255, nullable: false})
    user_password: string

    @Column({type: 'varchar', length: 255, unique: true, nullable: false})
    user_email: string

    @Column({type: 'varchar', length: 255, unique: true, nullable: false})
    user_phone: string

    @Column({type: 'int', unique: true, nullable: false})
    user_ced: number

    @ManyToOne( () => Role, (role) => role.users, {nullable: false})
    @JoinColumn({name: 'role_id'})
    role: Role

}
