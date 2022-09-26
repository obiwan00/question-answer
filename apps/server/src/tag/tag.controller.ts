import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TagResponse } from "libs/api-interfaces";
import { TagService } from "@qa/server/tag/tag.service";

@ApiTags('tags')
@Controller('tags')
export class TagController {

  public constructor(private readonly tagService: TagService) {
  }

  @Get()
  public async getTags(): Promise<TagResponse> {
    const tags = await this.tagService.findAll();
    return this.tagService.buildTagResponse(tags);
  }
}
