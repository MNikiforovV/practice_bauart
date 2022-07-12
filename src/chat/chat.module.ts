import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import Message from './entities/message.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import Project from 'src/projects/entities/project.entity';
import Subscriber from 'src/projects/entities/subscriber.entity';
import User from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[TypeOrmModule.forFeature([Message, Project, Subscriber, User]), AuthModule, UsersModule],
  providers: [ChatGateway, ChatService, AuthService, JwtService, ConfigService, UsersService]
})
export class ChatModule {}
