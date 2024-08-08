/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { ChatService } from './chat.service';
import { ChatRoom } from './entities/chat-room.entity';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('room')
  async createChatRoom(@Body() createChatRoomDto: CreateChatRoomDto) {
    const { user1, user2, roomName } = createChatRoomDto;
    return this.chatService.createChatRoom([user1, user2], roomName);
  }

  @Post('room/find-or-create')
  async findOrCreateChatRoom(@Body() createChatRoomDto: CreateChatRoomDto) {
    console.log(
      'Petición recibida para crear o encontrar una sala de chat:',
      createChatRoomDto,
    );
    const { user1, user2 } = createChatRoomDto;
    return this.chatService.findOrCreateChatRoom(user1, user2);
  }

  @Post('message')
  async createMessage(@Body() createMessageDto: CreateMessageDto) {
    const { chatRoom, sender, content } = createMessageDto;
    return this.chatService.createMessage(chatRoom, sender, content);
  }

  @Get('room/:roomId/messages')
  async getMessages(@Param('roomId') roomId: number) {
    const chatRoom = await this.chatService.findChatRoomById(roomId);
    return this.chatService.getMessages(chatRoom);
  }
}
