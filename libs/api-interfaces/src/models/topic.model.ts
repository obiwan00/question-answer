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
  tags?: string[];
  author: UserResponse;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTopic {
  title: string;
  body: string;
  tags: string[];
}

export interface UpdateTopic extends CreateTopic {
}
