import {
  ConnectedSocket,
  MessageBody, OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import CreateMessageDto from './dto/create-message.dto';
import Discussion from './entities/discussion.entity';
 
@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;
 
  constructor(
    private readonly chatService: ChatService
  ) {
  }
 
  async handleConnection(socket: Socket) {
    await this.chatService.getUserFromSocket(socket);
  }
 
  @SubscribeMessage('send_message')
  async listenForMessages(
    @MessageBody() content: CreateMessageDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const author = await this.chatService.getUserFromSocket(socket);
    const message = await this.chatService.saveMessage(content, author);
 
    this.server.sockets.emit('receive_message', message);
 
    return message;
  }
 
  @SubscribeMessage('request_all_messages')
  async requestAllMessages(
    @MessageBody() discussion: Discussion,
    @ConnectedSocket() socket: Socket,
  ) {
    await this.chatService.getUserFromSocket(socket);
    const messages = await this.chatService.getAllMessages(discussion);
 
    socket.emit('send_all_messages', messages);
  }
}