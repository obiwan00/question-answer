import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerModule } from '@qa/server/answer/answer.module';
import { TagModule } from '@qa/server/tag/tag.module';
import ormconfig from '@qa/server/typeorm/ormconfig';
import { AuthMiddleware } from '@qa/server/user/middlewares/auth.middleware';
import { UserModule } from '@qa/server/user/user.module';
import { TopicModule } from './topic/topic.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),

    UserModule,
    TagModule,
    TopicModule,
    AnswerModule,
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
