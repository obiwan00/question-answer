import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerModule } from '@qa/server/answer/answer.module';
import { TagModule } from '@qa/server/tag/tag.module';
import { TopicController } from '@qa/server/topic/topic.controller';
import { TopicEntity } from '@qa/server/topic/topic.entity';
import { TopicService } from '@qa/server/topic/topic.service';
import { UserEntity } from '@qa/server/user/user.entity';
import { UserModule } from '@qa/server/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TopicEntity, UserEntity]),

    TagModule,
    UserModule,
    forwardRef(() => AnswerModule),
  ],
  controllers: [TopicController],
  providers: [TopicService],
  exports: [TopicService],
})
export class TopicModule { }
