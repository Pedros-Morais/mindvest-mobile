import api from '@/services/api';
import type { Topic, TopicInput } from '@/modules/topics/types';

// Simple retry wrapper for transient network issues
async function retryRequest<T>(fn: () => Promise<T>, retries = 2, delayMs = 800): Promise<T> {
  let lastError: any;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      const status = error?.response?.status;
      const isNetwork = !!error?.request && !error?.response;
      const isServerError = status && status >= 500;
      if (attempt < retries && (isNetwork || isServerError)) {
        await new Promise((r) => setTimeout(r, delayMs * (attempt + 1)));
        continue;
      }
      throw error;
    }
  }
  throw lastError;
}

export const TopicsService = {
  async list(): Promise<Topic[]> {
    // Using JSONPlaceholder posts as topics
    return retryRequest(async () => {
      const { data } = await api.get<Topic[]>('/posts?_limit=20');
      return data;
    });
  },

  async get(id: number): Promise<Topic> {
    return retryRequest(async () => {
      const { data } = await api.get<Topic>(`/posts/${id}`);
      return data;
    });
  },

  async create(payload: TopicInput): Promise<Topic> {
    return retryRequest(async () => {
      const { data } = await api.post<Topic>('/posts', {
        ...payload,
        userId: 1,
      });
      return data;
    });
  },

  async update(id: number, payload: TopicInput): Promise<Topic> {
    return retryRequest(async () => {
      const { data } = await api.put<Topic>(`/posts/${id}`, {
        id,
        ...payload,
        userId: 1,
      });
      return data;
    });
  },

  async remove(id: number): Promise<void> {
    return retryRequest(async () => {
      await api.delete(`/posts/${id}`);
    });
  },
};