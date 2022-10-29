import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerEntity } from '@qa/server/answer/answer.entity';
import { TopicService } from '@qa/server/topic/topic.service';
import { UserEntity } from '@qa/server/user/user.entity';
import { UserService } from '@qa/server/user/user.service';
import { LikeStatus } from 'libs/api-interfaces';
import { FindOneOptions, Repository } from 'typeorm';
import { AnswerResponseDto, CreateAnswerDto, UpdateAnswerDto } from './dto/answer.dto';

@Injectable()
export class AnswerService {

  public constructor(
    @InjectRepository(AnswerEntity)
    private readonly answerRepository: Repository<AnswerEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private userService: UserService,
    @Inject(forwardRef(() => TopicService))
    private topicService: TopicService,
  ) {

  }

  public async create(currentUser: UserEntity, createAnswerDto: CreateAnswerDto): Promise<AnswerEntity> {
    const topic = await this.topicService.findTopicById(createAnswerDto.topicId);

    const newAnswer = new AnswerEntity();
    newAnswer.body = createAnswerDto.body
    newAnswer.author = currentUser;
    newAnswer.topic = topic;

    return this.answerRepository.save(newAnswer);
  }

  public async findAnswerById(id: number, options?: FindOneOptions<AnswerEntity>): Promise<AnswerEntity> {
    const answerById = await this.answerRepository.findOne({
      where: { id },
      ...options,
    });

    if (!answerById) {
      throw new HttpException("There is no such answer", HttpStatus.NOT_FOUND);
    }

    return answerById;
  }

  public async update(answerId: number, currentUserId: number, updateAnswerDto: UpdateAnswerDto): Promise<AnswerEntity> {
    const answerToUpdate = await this.findAnswerById(answerId)

    if (answerToUpdate.author.id !== currentUserId) {
      throw new HttpException("You don't have rights to update this answer", HttpStatus.FORBIDDEN);
    }

    Object.assign(answerToUpdate, updateAnswerDto);

    return await this.answerRepository.save(answerToUpdate);
  }

  public async buildAnswerResponse({ answer, currentUserId, currentUserWithLikeStatus }: {
    answer: AnswerEntity,
    currentUserId?: number,
    currentUserWithLikeStatus?: UserEntity,
  }): Promise<AnswerResponseDto> {
    currentUserWithLikeStatus = currentUserWithLikeStatus || await this.userService.getUserByIdWithAnswerLikeStatus(currentUserId);
    const likeStatus = this.getAnswerLikeStatus(answer.id, currentUserWithLikeStatus);

    return {
      ...answer,
      likeStatus,
    };
  }

  private getAnswerLikeStatus(answerId: number, currentUserWithLikeStatus: UserEntity): LikeStatus {
    let likeStatus = LikeStatus.NEUTRAL;

    const isAnswerLiked = currentUserWithLikeStatus?.answerLikes
      .find(({ id: likedAnswerId }) => likedAnswerId === answerId);
    const isAnswerDisliked = currentUserWithLikeStatus?.answerDislikes
      .find(({ id: dislikedAnswerId }) => dislikedAnswerId === answerId);

    if (isAnswerLiked) {
      likeStatus = LikeStatus.LIKED;
    } else if (isAnswerDisliked) {
      likeStatus = LikeStatus.DISLIKED;
    }

    return likeStatus;
  }

  public async likeAnswerById(currentUserId: number, answerId: number): Promise<AnswerEntity> {
    const answerForInteraction = await this.findAnswerById(answerId);
    const currentUser = await this.userService.getUserByIdWithAnswerLikeStatus(currentUserId);

    const isAlreadyLikedAnswerIndex = currentUser.answerLikes.findIndex((likedAnswer) => likedAnswer.id === answerForInteraction.id)
    if (isAlreadyLikedAnswerIndex !== -1) {
      currentUser.answerLikes.splice(isAlreadyLikedAnswerIndex, 1);
      answerForInteraction.likesCount--;
    } else {
      currentUser.answerLikes.push(answerForInteraction);
      answerForInteraction.likesCount++;

      const isAlreadyDislikedAnswerIndex = currentUser.answerDislikes.findIndex((dislikedAnswer) => dislikedAnswer.id === answerForInteraction.id)
      if (isAlreadyDislikedAnswerIndex !== -1) {
        currentUser.answerDislikes.splice(isAlreadyDislikedAnswerIndex, 1);
        answerForInteraction.likesCount++;
      }
    }

    await this.userRepository.save(currentUser);
    await this.answerRepository.save(answerForInteraction);
    return answerForInteraction;
  }

  public async dislikeAnswerById(currentUserId: number, answerId: number): Promise<AnswerEntity> {
    const answerForInteraction = await this.findAnswerById(answerId);
    const currentUser = await this.userService.getUserByIdWithAnswerLikeStatus(currentUserId);

    const isAlreadyDislikedAnswerIndex = currentUser.answerDislikes.findIndex((dislikedAnswer) => dislikedAnswer.id === answerForInteraction.id)
    if (isAlreadyDislikedAnswerIndex !== -1) {
      currentUser.answerDislikes.splice(isAlreadyDislikedAnswerIndex, 1);
      answerForInteraction.likesCount++;
    } else {
      currentUser.answerDislikes.push(answerForInteraction);
      answerForInteraction.likesCount--;

      const isAlreadyLikedAnswerIndex = currentUser.answerLikes.findIndex((likedAnswer) => likedAnswer.id === answerForInteraction.id)
      if (isAlreadyLikedAnswerIndex !== -1) {
        currentUser.answerLikes.splice(isAlreadyLikedAnswerIndex, 1);
        answerForInteraction.likesCount--;
      }
    }

    await this.userRepository.save(currentUser);
    await this.answerRepository.save(answerForInteraction);
    return answerForInteraction;
  }

  public async findAnswersForTopic(topicId: number, currentUserId?: number): Promise<AnswerResponseDto[]> {
    const answersForTopic = await this.answerRepository.find({
      where: { topic: topicId },
      order: { updatedAt: 'DESC' },
    })

    const currentUserWithLikeStatus = await this.userService.getUserByIdWithAnswerLikeStatus(currentUserId);

    return await Promise.all(answersForTopic.map(answerForTopic =>
      this.buildAnswerResponse({ answer: answerForTopic, currentUserWithLikeStatus })));
  }

  public async acceptAnswer(answerId: number, currentUserId: number): Promise<AnswerEntity[]> {
    const answerToAccept = await this.findAnswerById(answerId, {
      relations: ['topic'],
    });

    if (answerToAccept.author.id !== currentUserId) {
      throw new HttpException("You don't have rights to accept this answer", HttpStatus.FORBIDDEN);
    }


    const answersToSameTopic = await this.answerRepository.find({
      where: { topic: answerToAccept.topic.id },
      order: { updatedAt: 'DESC' },
    })

    answersToSameTopic.map(answer => {
      if (answer.id === answerId) {
        answer.accepted = !answer.accepted;
      } else {
        answer.accepted = false
      }

      return answer;
    });

    return await this.answerRepository.save(answersToSameTopic);
  }
}
