import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatMessage } from './entities/chat-message.entity';
import { Repository } from 'typeorm';
import { ChatRoom } from './entities/chat-room.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatMessage)
    private readonly chatMessageRepository: Repository<ChatMessage>,
    @InjectRepository(ChatRoom)
    private readonly chatRoomRepository: Repository<ChatRoom>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createChatRoom(users: User[], roomName: string): Promise<ChatRoom> {
    const chatRoom = new ChatRoom();
    chatRoom.room_name = roomName;
    chatRoom.users = users;
    return this.chatRoomRepository.save(chatRoom);
  }

  async findOrCreateChatRoom(user1: User, user2: User): Promise<ChatRoom> {
    let chatRoom = await this.chatRoomRepository
      .createQueryBuilder('chatRoom')
      .leftJoinAndSelect('chatRoom.users', 'user')
      .where('user.id_user = :user1Id OR user.id_user = :user2Id', {
        user1Id: user1.id_user,
        user2Id: user2.id_user,
      })
      .getOne();

    if (!chatRoom) {
      chatRoom = await this.createChatRoom(
        [user1, user2],
        `${user1.user_name}-${user2.user_name}`,
      );
    }

    return chatRoom;
  }

  async createMessage(
    chatRoom: ChatRoom,
    sender: User,
    content: string,
  ): Promise<ChatMessage> {
    const message = new ChatMessage();
    message.chatRoom = chatRoom;
    message.sender = sender;
    message.message_content = content;
    return this.chatMessageRepository.save(message);
  }

  async getMessages(chatRoom: ChatRoom): Promise<ChatMessage[]> {
    return this.chatMessageRepository.find({
      where: { chatRoom },
      relations: ['sender'],
    });
  }

  async findChatRoomById(roomId: number): Promise<ChatRoom> {
    return this.chatRoomRepository.findOne({
      where: { id_chat_room: roomId },
      relations: ['users', 'messages', 'messages.sender'],
    });
  }
}
