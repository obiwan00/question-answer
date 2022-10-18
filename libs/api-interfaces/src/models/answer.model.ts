import { LikeStatus } from "libs/api-interfaces/src/models/topic.model";
import { UserResponse } from "libs/api-interfaces/src/models/user.model";

export interface CreateAnswer {
  body: string;
  topicId: number;
}

export interface UpdateAnswer extends Pick<CreateAnswer, 'body'> {
}

export interface AnswerResponse {
  id: number;
  likesCount: number;
  body: string;
  author: UserResponse;
  createdAt: Date;
  updatedAt: Date;
  likeStatus?: LikeStatus;
}
