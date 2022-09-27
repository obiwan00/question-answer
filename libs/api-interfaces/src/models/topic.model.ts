import { User } from "libs/api-interfaces/src/models/user.model";

export interface TopicResponse {
  id: number;
  slug: string;
  title: string;
  body: string;
  tags?: string[];
  author: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTopic {
  title: string;
  body: string;
  tags?: string[];
}
