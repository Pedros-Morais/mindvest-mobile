export interface Topic {
  id: number;
  title: string;
  body: string;
  userId?: number;
}

export interface TopicInput {
  title: string;
  body: string;
}

export interface ApiError {
  message: string;
  status?: number;
}