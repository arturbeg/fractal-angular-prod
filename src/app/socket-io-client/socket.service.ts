import { CommonService } from './../common.service';
import { Message } from './../chat-feature/message';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import * as socketIo from 'socket.io-client';


const SERVER_URL = 'https://fractal-node.herokuapp.com/';

@Injectable()
export class SocketService {
    private socket;

    constructor(private commonService: CommonService) {
        this.initSocket();
    }

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

    public joinRoom(label, profile_label) {

        this.socket.emit('joinRoom', {
            label: label,
            profile_label: profile_label
        });

    }

    public leaveRoom(label, profile_label) {
        this.socket.emit('leaveRoom', {
            label: label,
            profile_label: profile_label
        })
    } 
    
    public messageLike(data) {
        console.log("Emitting the message like to the socket!");

        this.socket.emit('messageLike', data);

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

    public onDisconnect(): Observable<any> {
        return new Observable<string>(observer => {
            this.socket.on("disconnect", (data: string) => observer.next(data) )
        })
    }

    public onJoinRoom() {
        return new Observable(observer => {
            console.log("Someone joined the room!!!")
            this.socket.on('joinRoom', (data) => observer.next(data));
        });
    }

    public onLeaveRoom() {
        return new Observable(observer => {
            console.log("Someone left the room!!!")
            this.socket.on('leaveRoom', (data) => observer.next(data));
        });
    }
   
}
