import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from '@qa/server/chat/entities/message.entity';
import { ChatGateway } from '@qa/server/chat/gateways/chat.gateway';
import { MessageService } from '@qa/server/chat/services/message.service';
import { TopicModule } from '@qa/server/topic/topic.module';
import { UserModule } from '@qa/server/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageEntity]),

    UserModule,
    TopicModule,
  ],
  controllers: [],
  providers: [MessageService, ChatGateway],
  exports: [],
})
export class ChatModule { }
