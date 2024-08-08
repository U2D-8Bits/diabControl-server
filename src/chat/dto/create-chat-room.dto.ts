import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateChatRoomDto {
  @IsNotEmpty()
  user1: User;

  @IsNotEmpty()
  user2: User;

  @IsNotEmpty()
  roomName: string;
}
