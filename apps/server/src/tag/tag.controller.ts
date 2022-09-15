import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TagEntity } from "@qa/server/tag/tag.entity";
import { TagService } from "@qa/server/tag/tag.service";

@ApiTags('tags')
@Controller('tags')
export class TagController {

  public constructor(private readonly tagService: TagService) {
  }

  @Get()
  public async getTags(): Promise<TagEntity[]> {
    return await this.tagService.findAll();
  }
}
