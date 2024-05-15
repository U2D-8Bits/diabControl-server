/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */


import { CanActivate, ExecutionContext, Injectable, ParseIntPipe, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/users/constants';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/role/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from 'src/users/interfaces';
import { UsersService } from 'src/users/users.service';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private roleService: RoleService,
  ){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if(!token){
      throw new UnauthorizedException('Token no encontrado');
    }
    
    try {
      
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        token, { secret: process.env.JWT_SEED}
      );

      //* Buscamos el usuario por id
      const user = await this.userService.findUserByID(payload.id);

      if(!user){
        throw new UnauthorizedException('Usuario no encontrado');
      }

      if(!user.user_status){
        throw new UnauthorizedException('Usuario inactivo');
      }

      //* Buscamos el rol por id
      const role = await this.roleService.findRoleByID(user.role_id);

      //* Validamos que el rol exista
      if(!role){
        throw new UnauthorizedException('Rol no encontrado');
      }

      //* Validamos que el rol sea medico
      if(role.role_name !== 'medico'){
        console.log(role.role_name);
        throw new UnauthorizedException('Rol no permitido');
      }

      request['user'] = payload.id;

    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }

  private extractTokenFromHeader( request: Request ): string | undefined{

    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token: undefined;

  }
}
