import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Socket } from 'socket.io';
import { JwtPayload } from 'src/users/interfaces';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(context);

    if (!token) {
      throw new UnauthorizedException('Token no encontrado');
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: process.env.JWT_SEED,
      });

      const user = await this.userService.findUserByID(parseInt(payload.id));

      if (!user) {
        throw new UnauthorizedException('Usuario no encontrado');
      }

      if (!user.user_status) {
        throw new UnauthorizedException('Usuario inactivo');
      }

      if (request) {
        request['user'] = user;
      } else {
        const client = context.switchToWs().getClient<Socket>();
        client.data.user = user;
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }

  private extractToken(context: ExecutionContext): string | undefined {
    const request = context.switchToHttp().getRequest<Request>();

    // Verificar si el contexto es HTTP
    if (request && request.headers) {
      const [type, token] = request.headers['authorization']?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }

    // Verificar si el contexto es WebSocket
    const client = context.switchToWs().getClient<Socket>();
    const token = client.handshake.query.token;

    // Si token es un array, tomar el primer elemento
    return Array.isArray(token) ? token[0] : token;
  }
}
