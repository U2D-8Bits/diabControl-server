/* eslint-disable prettier/prettier */
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect{
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  public server: Server;

  handleConnection(client: Socket) {
    console.log('Client connected: ' + client.id)
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected: ' + client.id)
  }

  @SubscribeMessage('message')
  async sendMessage(@MessageBody() message: string, @ConnectedSocket() client: Socket){
    client.broadcast.emit('message', message)
  }
}
