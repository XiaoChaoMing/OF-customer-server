/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SocketClient } from './socket.module';

@Module({
  providers: [SocketClient],
})
export class SocketModule {}
