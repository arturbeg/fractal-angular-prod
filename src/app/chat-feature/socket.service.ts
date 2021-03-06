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