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

    public joinRoom(label) {

        this.socket.emit('joinRoom', {
            label: label
        })

    }

    public leaveRoom(label) {

        this.socket.emit('leaveRoom', {
            label: label
        })

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