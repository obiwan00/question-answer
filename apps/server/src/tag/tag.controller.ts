import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TagService } from "@qa/server/tag/tag.service";

@ApiTags('tags')
@Controller('tags')
export class TagController {

  public constructor(private readonly tagService: TagService) {
  }

  @Get()
  public getTags(): string[] {
    return this.tagService.getTags();
  }
}
