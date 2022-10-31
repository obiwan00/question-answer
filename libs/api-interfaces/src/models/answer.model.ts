import { LikeStatus, UserResponse } from "@qa/api-interfaces";

export interface CreateAnswer {
  body: string;
  topicId: number;
}

export type UpdateAnswer = Pick<CreateAnswer, 'body'>

export interface AnswerResponse {
  id: number;
  likesCount: number;
  accepted: boolean;
  body: string;
  author: UserResponse;
  createdAt: Date;
  updatedAt: Date;
  likeStatus: LikeStatus;
  isCurrentUserAnswerAuthor: boolean;
}

export type Answer = AnswerResponse;

