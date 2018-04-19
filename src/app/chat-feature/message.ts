import { Action } from './action'
import { Profile } from '../profile-feature/profile'

export interface Message {
    from?: Profile;
    content?: any;
    action?: Action;
    timestamp: string;
}
