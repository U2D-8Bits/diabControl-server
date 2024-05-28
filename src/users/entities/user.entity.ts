/* eslint-disable prettier/prettier */
import { Chat } from "src/chat/entities/chat.entity";
import { Message } from "src/chat/entities/message.entity";
import { Form } from "src/forms/entities/form.entity";
import { Inform } from "src/informs/entities/inform.entity";
import { Role } from "src/role/entities/role.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({type: 'varchar', length:10, unique: true, nullable: false})
    user_ced: string

    @Column({type: 'boolean', default: true, nullable: false})
    user_status: boolean

    @Column()
    role_id: number

    @ManyToOne( () => Role, (role) => role.users, {onDelete: 'CASCADE'})
    role: Role

    @OneToMany( () => Inform, inform => inform.user)
    informs: Inform[]

    @OneToMany( () => Form, form => form.user )
    forms: Form[]

    // Un usuario puede tener muchos chats
    @OneToMany( () => Chat, (chat) => chat.users)
    chats: Chat[]

    // Un usuario puede tener muchos mensajes
    @OneToMany( () => Message, (message) => message.user)
    messages: Message[]

}
