/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, WebSocketServer, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

import { Server, Socket } from 'socket.io';



@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`)
  }

  handleDisconnect(client: Socket ) {
    console.log(`Client disconnected: ${client.id}`)
  }

  afterInit(server: any) {
    console.log('Init');
  }



  @SubscribeMessage('createChat')
  create(@MessageBody() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @SubscribeMessage('findAllChat')
  findAll() {
    return this.chatService.findAll();
  }

  @SubscribeMessage('findOneChat')
  findOne(@MessageBody() id: number) {
    return this.chatService.findOne(id);
  }

  @SubscribeMessage('updateChat')
  update(@MessageBody() updateChatDto: UpdateChatDto) {
    return this.chatService.update(updateChatDto.id, updateChatDto);
  }

  @SubscribeMessage('removeChat')
  remove(@MessageBody() id: number) {
    return this.chatService.remove(id);
  }
}
