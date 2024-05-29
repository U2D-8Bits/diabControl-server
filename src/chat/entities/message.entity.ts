/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Chat } from "./chat.entity";
import { User } from "src/users/entities/user.entity";

@Entity()
export class Message {
 
    @PrimaryGeneratedColumn()
    id_message: number;

    // Creamos una columna de fecha de creación
    @CreateDateColumn()
    message_created_at: Date;

    //creamos una columna de mensaje
    @Column('text')
    message_content: string;

    // Creamos una relacion en donde un mensaje pertenece a un chat
    @OneToOne(() => Chat, chat => chat.messages)
    chat: Chat;

    // Creamos una relacion en donde un mensaje pertenece a un usuario
    @OneToOne(() => User, user => user.messages)
    user: User;
}
