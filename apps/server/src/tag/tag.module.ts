import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TagController } from "@qa/server/tag/tag.controller";
import { TagEntity } from "@qa/server/tag/tag.entity";
import { TagService } from "@qa/server/tag/tag.service";

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {
}
