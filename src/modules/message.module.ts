/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MessageController } from 'src/api/message.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MessageService } from 'src/services/message.service';

@Module({
  imports: [PrismaModule],
  providers: [MessageService],
  controllers: [MessageController],
})
export class MessageModule {}
