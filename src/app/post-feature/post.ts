import { Message } from './../chat-feature/message';

export interface Post {
  message: Message;
  timestamp: string;
  timestamp_human: string;
}