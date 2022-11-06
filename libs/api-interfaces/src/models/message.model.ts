import { UserResponse } from "@qa/api-interfaces";

export interface CreateMessage {
  body: string;
  topicId: number;
}

export interface MessageResponse {
  id: number;
  body: string;
  author: UserResponse;
  createdAt: Date;
  updatedAt: Date;
}

export type Message = MessageResponse;

