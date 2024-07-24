/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { SocketModule } from './socket/socket-client';
import { UserModule } from './modules/users.module';
import { AuthModule } from './middleware/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './modules/post.module';
import { FollowerModule } from './modules/follower.module';
import { GroupsModule } from './modules/group.module';
import { MessageModule } from './modules/message.module';
import { NotificeModule } from './modules/notifice.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    SocketModule,
    AuthModule,
    PostModule,
    FollowerModule,
    GroupsModule,
    MessageModule,
    NotificeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
