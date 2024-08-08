import { User } from 'src/users/entities/user.entity';
import { ChatRoom } from '../entities/chat-room.entity';

export class CreateMessageDto {
  chatRoom: ChatRoom;
  sender: User;
  content: string;
}
