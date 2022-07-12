import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { parse } from 'cookie';
import { WsException } from '@nestjs/websockets';
import { AuthService } from 'src/auth/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import Message from './entities/message.entity';
import { Repository } from 'typeorm';
import User from 'src/users/entities/user.entity';
import CreateMessageDto from './dto/create-message.dto';
import Discussion from './entities/discussion.entity';
 
@Injectable()
export class ChatService {
  constructor(
    private authService: AuthService,
    
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {
  }
 
  async saveMessage(content: CreateMessageDto, author: User) {
    const newMessage = await this.messagesRepository.create({
      ...content,
      author
    });
    await this.messagesRepository.save(newMessage);
    return newMessage;
  }
 
  async getAllMessages(discussion: Discussion) {
    return this.messagesRepository.find({where:{discussion:{
      id: discussion.id
    }},
      relations: ['discussion']
    });
  }

  async getUserFromSocket(socket: Socket) {
    const cookie = socket.handshake.headers.cookie;
    const { Authentication: authenticationToken } = parse(cookie);
    const user = await this.authService.getUserFromAuthenticationToken(authenticationToken);
    if (!user) {
      throw new WsException('Invalid credentials.');
    }
    return user;
  }
}