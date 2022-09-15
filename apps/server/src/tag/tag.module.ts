import { Module } from "@nestjs/common";
import { TagController } from "@qa/server/tag/tag.controller";
import { TagService } from "@qa/server/tag/tag.service";

@Module({
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {
}
