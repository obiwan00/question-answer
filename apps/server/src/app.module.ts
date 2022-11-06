import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerModule } from '@qa/server/answer/answer.module';
import { ChatModule } from '@qa/server/chat/chat.module';
import { TagModule } from '@qa/server/tag/tag.module';
import { TopicModule } from '@qa/server/topic/topic.module';
import ormconfig from '@qa/server/typeorm/ormconfig';
import { AuthMiddleware } from '@qa/server/user/middlewares/auth.middleware';
import { UserModule } from '@qa/server/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),

    UserModule,
    TagModule,
    TopicModule,
    AnswerModule,
    ChatModule,
  ],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
