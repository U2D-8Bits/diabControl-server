/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LoginGuard implements CanActivate {
    
    constructor(
        private userService: UsersService,
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        
        const request = context.switchToHttp().getRequest();
        const { user_username, user_password } = request.body;

        if(!user_username || !user_password){
            throw new UnauthorizedException('Usuario o contraseña no proporcionados');
        }

        //* Implementamos un tryCatch para manejar los errores

        try {
            
            //* Buscamos el usuario por username
            const user = await this.userService.findByUsername(user_username);

            console.log("Usuario encontrado =>",user);

            if(!user){
                throw new UnauthorizedException('Usuario no encontrado');
            }

            //* Validamos que el usuario este activo
            if(!user.user_status){
                throw new UnauthorizedException('Usuario inactivo');
            }

            //* si el usuario existe y esta activo, retornamos true
            return true;

        } catch (error) {
            

            //* Si no esta activo o no existe, lanzamos un error
            throw new UnauthorizedException(error.message);

        }
    }
}