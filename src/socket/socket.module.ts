/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { io, Socket } from 'socket.io-client';
@Injectable()
export class SocketClient implements OnModuleInit {
  public socketClient: Socket;
  constructor() {
    this.socketClient = io('http://localhost:9000');
  }
  onModuleInit() {
    this.registerConsumeEvent();
  }
  private registerConsumeEvent() {
    this.socketClient.on('connect', () => {
      console.log('connected to gateway');
    });
    this.socketClient.on('onMessage', (payload: any) => {
      console.log('client socket');
      console.log(payload);
    });
  }
}
