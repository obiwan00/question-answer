import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateMessageDto, MessageResponseDto } from "@qa/server/chat/dto/message.dto";
import { MessageEntity } from "@qa/server/chat/entities/message.entity";
import { Repository } from "typeorm";

@Injectable()
export class MessageService {

  public constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) { }

  public async createMessage(userId: number, createMessageDto: CreateMessageDto): Promise<MessageResponseDto> {
    const newMessage = new MessageEntity();
    Object.assign(newMessage, {
      body: createMessageDto.body,
      topic: createMessageDto.topicId,
      author: userId,
    });

    const savedMessage = await this.messageRepository.save(newMessage);
    const createdMessage = await this.messageRepository.findOne(savedMessage.id); // required to receive with User relation

    return this.buildMessageResponse(createdMessage, createMessageDto.topicId);
  }

  public async getMessagesForTopic(topicId: number): Promise<MessageResponseDto[]> {

    const messagesForTopic = await this.messageRepository.find({
      where: { topic: topicId },
      order: { createdAt: 'ASC' },
    });

    return messagesForTopic.map(message => this.buildMessageResponse(message, topicId));
  }

  public buildMessageResponse(message: MessageEntity, topicId?: number): MessageResponseDto {
    return {
      id: message.id,
      body: message.body,
      author: message.author,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
      topicId: message?.topic?.id || topicId,
    };
  }

}
