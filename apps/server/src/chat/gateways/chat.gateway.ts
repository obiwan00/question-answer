import { OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatActions } from '@qa/api-interfaces';
import { CreateMessageDto } from '@qa/server/chat/dto/message.dto';
import { MessageService } from '@qa/server/chat/services/message.service';
import { TopicService } from '@qa/server/topic/topic.service';
import { EnvFields } from '@qa/server/typeorm/config/env-fields.model';
import { getEnvFieldValue } from '@qa/server/typeorm/config/get-env-value.util';
import { UserEntity } from '@qa/server/user/user.entity';
import { UserService } from '@qa/server/user/user.service';
import { verify } from "jsonwebtoken";
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: ['http://localhost:4200'] } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {

  public constructor(
    private userService: UserService,
    private topicService: TopicService,
    private messageService: MessageService,
  ) { }

  @WebSocketServer()
  private server;

  public async onModuleInit(): Promise<void> {
    await this.topicService.deleteAllConnectedToChatUsers();
  }

  public async handleConnection(socket: Socket): Promise<void> {
    try {
      const currentUser = await this.getCurrentUser(socket);
      const currentUserWithSocketId = await this.userService.setSocketId(currentUser, socket.id);

      socket.data.user = currentUserWithSocketId;
    } catch (error) {
      console.log(error);
      socket.emit(ChatActions.Error, new UnauthorizedException());
    }
  }

  public async handleDisconnect(socket: Socket): Promise<void> {
    await this.userService.removeSocketIdBySocketId(socket.id);
  }

  @SubscribeMessage(ChatActions.JoinChat)
  public async onChatJoin(socket: Socket, topicId: number): Promise<void> {
    const messagesForTopic = await this.messageService.getMessagesForTopic(topicId);

    const currentUser = socket.data.user as UserEntity;
    if (currentUser) {
      this.userService.setConnectedTopicChat(socket.data.user, topicId);
    }

    this.server.to(socket.id).emit(ChatActions.ChatHistory, messagesForTopic);
  }

  @SubscribeMessage(ChatActions.AddMessage)
  public async onAddMessage(socket: Socket, createMessageDto: CreateMessageDto): Promise<void> {
    const currentUser = socket.data.user as UserEntity;

    if (!currentUser) {
      socket.emit(ChatActions.Error, new UnauthorizedException());
      socket.disconnect();

      return;
    }

    const newMessage = await this.messageService.createMessage(currentUser.id, createMessageDto);
    const connectedToChatUsers = await this.topicService.getConnectedToChatUsersByTopicId(createMessageDto.topicId);

    connectedToChatUsers?.forEach(user => {
      this.server.to(user.socketId).emit(ChatActions.AddedMessage, newMessage);
    });
  }

  private async getCurrentUser(socket: Socket): Promise<UserEntity> {
    const jwtToken: string = socket.handshake?.headers?.authorization.split(' ')[1];
    const decode = verify(jwtToken, getEnvFieldValue(EnvFields.SECRET_KEY));
    const user = await this.userService.findById(decode.id);

    return user;
  }
}
