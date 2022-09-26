export interface TopicResponse {
  id: number;
  slug: string;
  title: string;
  body: string;
  tags?: string[];
}

export interface CreateTopic {
  title: string;
  body: string;
  tags?: string[];
}
