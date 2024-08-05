/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';
import { UsersService } from 'src/users/users.service';
import { Injectable, UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/users/guards/auth/token.guard';
import { JwtService } from '@nestjs/jwt';


@WebSocketGateway({
  cors: {
    origin: '*', // Permite todas las solicitudes de origen
    methods: ['GET', 'POST'],
    allowedHeaders: ['Authorization'],
    credentials: true
  },
})
@Injectable()
@UseGuards(TokenGuard)
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  
  constructor(
    private readonly chatService: ChatService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  afterInit(server: Server) {
    console.log('WebSocket initialized');
  }

  async handleConnection(client: Socket) {
    const token = client.handshake.query.token as string;

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SEED });
      const user = await this.usersService.findUserByID(parseInt(payload.id));

      if (user && user.user_status) {
        client.data.user = user;
        this.server.emit('userConnected', user);
        console.log(`User connected: ${user.user_username}`);
      } else {
        client.disconnect();
      }
    } catch (error) {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const user = client.data.user;
    if (user) {
      this.server.emit('userDisconnected', user);
      console.log(`User disconnected: ${user.user_username}`);
    }
  }

}
