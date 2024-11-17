/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { TokenGuard } from '../users/guards/auth/token.guard';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/users/interfaces';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Authorization'],
    credentials: true,
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  afterInit(server: Server) {
    console.log('WebSocket initialized');
  }

  async handleConnection(client: Socket) {
    const token = Array.isArray(client.handshake.query.token)
      ? client.handshake.query.token[0]
      : client.handshake.query.token;

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SEED,
      });
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

  @UseGuards(TokenGuard)
  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() message: any,
    @ConnectedSocket() client: Socket,
  ): void {
    client.broadcast.emit('message', message); // Emitir mensaje a todos excepto al remitente
  }
}
