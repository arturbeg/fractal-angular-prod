import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Message } from './message';
import { Event } from './event';

import * as socketIo from 'socket.io-client';

const SERVER_URL = 'https://fractal-node.herokuapp.com/';

@Injectable()
export class SocketService {
    private socket;

    public initSocket(): void {
        this.socket = socketIo(SERVER_URL);
    }

    public send(message: Message, label: string): void {
        this.socket.emit('message', 
        
        {
            message: message,
            label: label
        });
    }

    public onMessage(): Observable<Message> {
        return new Observable<Message>(observer => {
            this.socket.on('message', (data: Message) => observer.next(data));
        });
    }

    public onMessageLike(): Observable<Message> {
        return new Observable<Message>(observer => {
            console.log("Receiving the likedMessage on socket io");
            this.socket.on('messageLike', (data: Message) => observer.next(data));
        });
    }

    // public onNewParticipant() {
    //     // update participants list via Socket IO (new participant)
    //     this.socket.on('new_participant', function(data) {
    //         // do stuff with the new participant
    //         console.log("This profile joined the chat, ", data.profile)
    //     })
    // }

    // public onLeaveParticipant() {
    //     // update participants list via Socket IO (participant left)

    //     this.socket.on('leave_participant', function(data) {
    //         // do stuff with the participant who left the room
    //         console.log("This profile left the chat, ", data.profile)
    //     })
    // }

    public onEvent(event: Event): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }

    public joinRoom(label, profile_label) {

        this.socket.emit('joinRoom', {
            label: label,
            profile_label: profile_label
        });

    }

    public onJoinRoom() {
        return new Observable(observer => {
            console.log("Someone joined the room!!!")
            this.socket.on('joinRoom', (data) => observer.next(data));
        });
    }

    public leaveRoom(label, profile_label) {
        this.socket.emit('leaveRoom', {
            label: label,
            profile_label: profile_label
        })
    }

    public onLeaveRoom() {
        return new Observable(observer => {
            console.log("Someone left the room!!!")
            this.socket.on('leaveRoom', (data) => observer.next(data));
        });
    }

    public messageLike(data) {
        console.log("Emitting the message like to the socket!");

        this.socket.emit('messageLike', data);

    }



    
}


    // public onEvent(event: string, room:string): Observable<any> {
    //     return new Observable<string>(observer => {
    //         this.socket.on(event, () => {
    //             console.log(event)

    //             if (event == "connect") 
                
    //                 {
    //                     console.log("connected")

    //                     this.socket.emit('join', room)

    //                 } 
                
                    
    //             else 
                
    //                 {
    //                     console.log("disconnected")
                        
    //                     this.socket.emit('leave', room)
    //                 }    

    //             observer.next()


    //             }
        
        
    //         );
    //     });
    // }


    


    



/*
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Message } from './message';
import { Event } from './event';

import * as socketIo from 'socket.io-client';

const SERVER_URL = 'https://fractal-node.herokuapp.com/';

@Injectable()
export class SocketService {
    private socket;

    public initSocket(): void {
        this.socket = socketIo(SERVER_URL);
    }

    public send(message: Message): void {
        this.socket.emit('message', message);
    }

    public onMessage(): Observable<Message> {
        return new Observable<Message>(observer => {
            this.socket.on('message', (data: Message) => observer.next(data));
        });
    }

    public onEvent(event: Event, topicLabel: string): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, (topicLabel) => observer.next());
        });
    }


    
}

*/