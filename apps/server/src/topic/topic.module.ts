import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagModule } from '@qa/server/tag/tag.module';
import { TopicController } from '@qa/server/topic/topic.controller';
import { TopicEntity } from '@qa/server/topic/topic.entity';
import { TopicService } from '@qa/server/topic/topic.service';

@Module({
  imports: [TypeOrmModule.forFeature([TopicEntity]), TagModule],
  controllers: [TopicController],
  providers: [TopicService],
})
export class TopicModule { }
