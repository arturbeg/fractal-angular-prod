import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Message } from './message';
import { Event } from './event';

import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://localhost:8080';

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

const SERVER_URL = 'http://localhost:8080';

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