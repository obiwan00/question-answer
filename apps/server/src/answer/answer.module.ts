import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerEntity } from '@qa/server/answer/answer.entity';
import { TopicModule } from '@qa/server/topic/topic.module';
import { UserEntity } from '@qa/server/user/user.entity';
import { UserModule } from '@qa/server/user/user.module';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnswerEntity, UserEntity]),

    UserModule,
    TopicModule,
  ],
  controllers: [AnswerController],
  providers: [AnswerService],
  exports: [AnswerService],
})
export class AnswerModule { }
