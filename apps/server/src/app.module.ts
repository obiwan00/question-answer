import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagModule } from '@qa/server/tag/tag.module';
import ormconfig from '@qa/server/typeorm/ormconfig';
import { AuthMiddleware } from '@qa/server/user/middlewares/auth.middleware';
import { UserModule } from '@qa/server/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),

    UserModule,
    TagModule,
  ],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}
