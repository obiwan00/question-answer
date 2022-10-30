import { AnswerResponse } from "libs/api-interfaces/src/models/answer.model";
import { UserResponse } from "libs/api-interfaces/src/models/user.model";

export interface TopicsRequest {
  offset?: number;
  limit?: number;
  tags?: string[];
  search?: string;
}

export interface TopicResponse {
  id: number;
  slug: string;
  likesCount: number;
  title: string;
  body: string;
  author: UserResponse;
  createdAt: Date;
  updatedAt: Date;
  likeStatus: LikeStatus;
  tags: string[];
  hasAcceptedAnswer: boolean,
  answersCount: number;
}

export type Topic = TopicResponse;

export interface TopicsResponse {
  offset: number;
  limit: number;
  count: number;
  topics: TopicResponse[];
}

export interface TopicWithAnswersResponse extends TopicResponse {
  answers: AnswerResponse[];
}

export type TopicWithAnswers = TopicWithAnswersResponse;

export enum LikeStatus {
  DISLIKED = 'DISLIKED',
  NEUTRAL = 'NEUTRAL',
  LIKED = 'LIKED',
}

export interface CreateTopic {
  title: string;
  body: string;
  tags: string[];
}

export interface UpdateTopic extends CreateTopic {
}
