import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ChatMessage } from './chat-message.entity';

@Entity({ name: 'tb_chat_rooms' })
export class ChatRoom {
  @PrimaryGeneratedColumn({ name: 'int_id_chat_room' })
  id_chat_room: number;

  @Column({
    name: 'str_room_name',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  room_name: string;

  @ManyToMany(() => User, (user) => user.chatRooms)
  @JoinTable({
    name: 'tb_chat_room_users',
    joinColumn: { name: 'int_chat_room_id' },
    inverseJoinColumn: { name: 'int_user_id' },
  })
  users: User[];

  @OneToMany(() => ChatMessage, (message) => message.chatRoom)
  messages: ChatMessage[];

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
