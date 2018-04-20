import { Action } from './action'
import { Profile } from '../profile-feature/profile'

export interface Message {
    id: number;
    from?: Profile;
    content?: any;
    action?: Action;
    timestamp: string;
    topic: number;
    likers_count: number;
}



// export interface MessageDjango {
//     id: number;
//     text: string;
//     timestamp: string;

// }
