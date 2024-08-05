import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  // eslint-disable-next-line prettier/prettier
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule
  ],
  providers: [ChatGateway, ChatService, JwtService],
})
export class ChatModule {}
