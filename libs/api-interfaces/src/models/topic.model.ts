import { AnswerResponse } from "libs/api-interfaces/src/models/answer.model";
import { UserResponse } from "libs/api-interfaces/src/models/user.model";

export interface TopicsRequest {
  offset: number;
  limit: number;
  tags: string[];
  search: string;
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
  likeStatus?: LikeStatus;
  tags?: string[];
}

export interface TopicWithAnswerResponse extends TopicResponse {
  answers: AnswerResponse[];
}

export enum LikeStatus {
  DISLIKED = 'DISLIKED',
  NEUTRAL = 'NEUTRAL',
  LIKED = 'LIKED',
}

export interface TopicWithLikeStatusResponse extends TopicResponse {
  likeStatus: LikeStatus;
}

export interface CreateTopic {
  title: string;
  body: string;
  tags: string[];
}

export interface UpdateTopic extends CreateTopic {
}
