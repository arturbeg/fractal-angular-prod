import { Topic } from './chat';
import { Action } from './action'
import { Profile } from '../profile-feature/profile'

export interface Message {
    
    id: number;
    text?: any; // used to be from
    timestamp: string;
    topic_object: Topic;
    user: number; // id of the user
    sender?: Profile;
    likers_count: number;
    shared: boolean;
    timestamp_human: string;
    topic: string;

    //action?: Action;
    
}

// export interface Post {
//     message: Message;
//     timestamp: string;
// }


