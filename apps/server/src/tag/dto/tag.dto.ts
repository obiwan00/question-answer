import { ApiProperty } from "@nestjs/swagger";
import { TagResponse } from "@qa/api-interfaces";

export class TagResponseDto implements TagResponse {
  @ApiProperty()
  public tags: string[];
}
