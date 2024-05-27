/* eslint-disable prettier/prettier */
import { User } from "src/users/entities/user.entity";
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "./message.entity";

@Entity()
export class Chat {

    @PrimaryGeneratedColumn()
    id_chat: number;

    @ManyToOne( ()=> User, user => user.chatAsDoctor)
    doctor: User;

    @ManyToOne( ()=> User, user => user.chatAsPatient)
    patient: User;

    @OneToMany( ()=> Message, message => message.chat)
    messages: Message[];

}
