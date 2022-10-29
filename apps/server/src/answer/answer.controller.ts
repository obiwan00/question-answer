import { Body, Controller, Delete, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@qa/server/user/decorators/user.decorator';
import { AuthGuard } from '@qa/server/user/guards/user.guard';
import { UserEntity } from '@qa/server/user/user.entity';
import { AnswerService } from './answer.service';
import { AnswerResponseDto, CreateAnswerDto, UpdateAnswerDto } from './dto/answer.dto';

@ApiTags('answer')
@Controller('answers')
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

  @Put(':answerId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: AnswerResponseDto })
  public async update(
    @Param('answerId') answerId: string,
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

  @Post(':answerId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ isArray: true, type: AnswerResponseDto })
  public async acceptAnswer(
    @Param('answerId') answerId: string,
    @User('id') currentUserId: number,
  ): Promise<AnswerResponseDto[]> {
    const answers = await this.answerService.acceptAnswer(+answerId, currentUserId);
    return Promise.all(answers.map(answer => this.answerService.buildAnswerResponse({ answer, currentUserId })));
  }
}
