import { ChatGroup } from './../../chatgroup-feature/chatgroup';
import { Message } from './../../chat-feature/message';
import { Topic } from './../../chat-feature/chat';
import { Profile } from './../../profile-feature/profile';

export interface Notification {
  id: number;
  text: string;
  sender: string;
  receiver: string;
  sender_object: Profile;
  receiver_object: Profile; 
  timestamp_human: string;
  message: Message;
  chatgroup: ChatGroup;
}
