/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */


import { CanActivate, ExecutionContext, Injectable, ParseIntPipe, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';;
import { JwtPayload } from 'src/users/interfaces';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TokenGuard implements CanActivate {

  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if(!token){
      throw new UnauthorizedException('Token no encontrado');
    }
    

      
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        token, { secret: process.env.JWT_SEED}
      );

      //* Buscamos el usuario por id
      const user = await this.userService.findUserByID(parseInt(payload.id));

      if(!user){
        throw new UnauthorizedException('Usuario no encontrado');
      }

      if(!user.user_status){
        throw new UnauthorizedException('Usuario inactivo');
      }

      request['user'] = user;

    return true;
  }

  private extractTokenFromHeader( request: Request ): string | undefined{

    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token: undefined;

  }
}