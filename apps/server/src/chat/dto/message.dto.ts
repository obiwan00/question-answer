import { ApiProperty } from "@nestjs/swagger";
import { CreateMessage, MessageResponse, UserResponse } from "@qa/api-interfaces";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMessageDto implements CreateMessage {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public body: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  public topicId: number;
}

export class MessageResponseDto implements MessageResponse {

  @ApiProperty()
  public id: number;

  @ApiProperty()
  public body: string;

  @ApiProperty()
  public topicId: number;

  @ApiProperty()
  public author: UserResponse;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;
}
