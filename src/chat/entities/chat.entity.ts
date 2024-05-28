/* eslint-disable prettier/prettier */
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "./message.entity";

@Entity()
export class Chat {

    @PrimaryGeneratedColumn()
    id_chat: number;

    @Column({type: 'varchar', length: 255, nullable: false})
    chat_name: string;

    // Creamos una columna de fecha de creación
    @CreateDateColumn()
    chat_created_at: Date;
    

    // Un chat puede tener muchos mensajes
    @OneToMany( () => Message, (message) => message.chat)
    messages: Message[]

    // Un chat puede tener muchos usuarios
    @OneToMany( () => User, (user) => user.chats)
    users: User[]

}
