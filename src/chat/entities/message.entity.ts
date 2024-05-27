/* eslint-disable prettier/prettier */
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Chat } from "./chat.entity";

@Entity()
export class Message{

    @PrimaryGeneratedColumn()
    id_message: number;

    @Column('text')
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne( ()=> User, user => user.messages)
    sender: User;

    @ManyToOne( ()=> Chat, chat => chat.messages)
    chat: Chat;
}