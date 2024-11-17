/* eslint-disable prettier/prettier */
import { Act } from "src/act/entities/act.entity";
import { ChatMessage } from "src/chat/entities/chat-message.entity";
import { ChatRoom } from "src/chat/entities/chat-room.entity";
import { Control } from "src/control/entities/control.entity";
import { File } from "src/file/entities/file.entity";
import { History } from "src/histories/entities/history.entity";
import { Role } from "src/role/entities/role.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'tb_users'})
export class User {

    @PrimaryGeneratedColumn({name:'int_id_user'})
    id_user: number

    @Column({name:'str_user_name', type: 'varchar', length: 255, nullable: false})
    user_name: string

    @Column({name: 'str_user_lastname', type: 'varchar', length: 255, nullable: false})
    user_lastname: string

    @Column({name: 'str_user_username', type: 'varchar', length: 255, unique: true, nullable: false})
    user_username: string

    @Column({name: 'str_user_password', type: 'varchar', length: 255, nullable: false})
    user_password: string

    @Column({name: 'str_user_email', type: 'varchar', length: 255, unique: true, nullable: false})
    user_email: string

    @Column({name: 'str_user_phone' ,type: 'varchar', length: 255, unique: true, nullable: false})
    user_phone: string

    @Column({name: 'str_user_address', type: 'varchar', length: 255, nullable: false})
    user_address: string


    @Column({name: 'str_user_birthdate', type: 'varchar', length: 255, nullable: false})
    user_birthdate: string

    @Column({name: 'int_user_age', type: 'int', nullable: false})
    user_age: number

    @Column({name:'str_user_genre', type: 'varchar', length: 255, nullable: false})
    user_genre: string

    @Column({name: 'str_user_ced',  type: 'varchar', length:10, unique: true, nullable: false})
    user_ced: string

    @Column({name: 'bool_user_status', type: 'boolean', default: true, nullable: false})
    user_status: boolean

    @Column({name: 'bool_user_admin', type: 'boolean', default: false, nullable: false})
    user_admin: boolean

    @CreateDateColumn({name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    user_created_at: Date

    @UpdateDateColumn({name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    user_updated_at: Date


    @Column({name: 'int_role_id', type: 'int'})
    role_id: number

    @ManyToMany(() => ChatRoom, chatRoom => chatRoom.users)
    chatRooms: ChatRoom[];
  
    @OneToMany(() => ChatMessage, message => message.sender)
    sentMessages: ChatMessage[];

    @OneToOne( () => Act, act => act.user)
    act: Act

    @OneToOne( () => File, file => file.user)
    file: File

    @ManyToOne( () => Role, (role) => role.users, {onDelete: 'CASCADE'})
    role: Role

    @OneToMany( ()=> History, history => history.medico)
    historiesCreated: History[]

    @OneToMany( ()=> History, history => history.paciente)
    historiesRecived: History[]

    @OneToMany(() => Control, control => control.paciente)
    controlsRecived: Control[];
  
    @OneToMany(() => Control, control => control.medico)
    controlsCreated: Control[];

}
