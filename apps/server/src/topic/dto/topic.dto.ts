import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateTopic } from "libs/api-interfaces";

export class CreateTopicDto implements CreateTopic {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public body: string;

  @ApiProperty()
  @IsOptional()
  public tags?: string[];
}
