import { Action } from './action'
import { Profile } from '../profile-feature/profile'

export interface Message {
    
    id: number;
    text?: any; // used to be from
    timestamp: string;
    topic: any; //should be a string
    user: number; // id of the user
    sender?: Profile;
    likers_count: number;

    //action?: Action;
    
}
