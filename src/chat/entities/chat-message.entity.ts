import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { ChatRoom } from './chat-room.entity';

@Entity({ name: 'tb_chat_messages' })
export class ChatMessage {
  @PrimaryGeneratedColumn({ name: 'int_id_chat_message' })
  id_chat_message: number;

  @Column({ name: 'str_message_content', type: 'text', nullable: false })
  message_content: string;

  @ManyToOne(() => User, (user) => user.sentMessages)
  sender: User;

  @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.messages)
  chatRoom: ChatRoom;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;
}
