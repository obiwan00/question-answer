import { Body, Controller, Delete, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@qa/server/user/decorators/user.decorator';
import { AuthGuard } from '@qa/server/user/guards/user.guard';
import { UserEntity } from '@qa/server/user/user.entity';
import { AnswerService } from './answer.service';
import { AnswerResponseDto, CreateAnswerDto, UpdateAnswerDto } from './dto/answer.dto';

@ApiTags('answer')
@Controller('answer')
export class AnswerController {
  public constructor(private readonly answerService: AnswerService) { }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: AnswerResponseDto })
  public async create(@User() currentUser: UserEntity, @Body() createAnswerDto: CreateAnswerDto): Promise<AnswerResponseDto> {
    const answer = await this.answerService.create(currentUser, createAnswerDto);
    return this.answerService.buildAnswerResponse({ answer, currentUserId: currentUser.id });
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: AnswerResponseDto })
  public async update(
    @Param('id') answerId: string,
    @User('id') currentUserId: number,
    @Body() updateAnswerDto: UpdateAnswerDto,
  ): Promise<AnswerResponseDto> {
    const answer = await this.answerService.update(+answerId, currentUserId, updateAnswerDto);
    return this.answerService.buildAnswerResponse({ answer, currentUserId });
  }

  @Post(':answerId/like')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: AnswerResponseDto })
  public async likeTopicBySlug(@User('id') currentUserId: number, @Param('answerId') answerId: string): Promise<AnswerResponseDto> {
    const answer = await this.answerService.likeAnswerById(currentUserId, +answerId);
    return this.answerService.buildAnswerResponse({ answer, currentUserId });
  }

  @Delete(':answerId/like')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: AnswerResponseDto })
  public async dislikeTopicBySlug(@User('id') currentUserId: number, @Param('answerId') answerId: string): Promise<AnswerResponseDto> {
    const answer = await this.answerService.dislikeAnswerById(currentUserId, +answerId);
    return this.answerService.buildAnswerResponse({ answer, currentUserId });
  }


  // TODO: implement ✅
}
