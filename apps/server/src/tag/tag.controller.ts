import { Controller, Get } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { TagResponseDto } from "@qa/server/tag/dto/tag.dto";
import { TagService } from "@qa/server/tag/tag.service";

@ApiTags('tags')
@Controller('tags')
export class TagController {

  public constructor(private readonly tagService: TagService) {
  }

  @Get()
  @ApiCreatedResponse({ type: TagResponseDto })
  public async getTags(): Promise<TagResponseDto> {
    const tags = await this.tagService.findAll();
    return this.tagService.buildTagResponse(tags);
  }
}
