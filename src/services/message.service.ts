/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async GetBoxChatById(UserId: string, FollowerId: string) {
    const exitUsert = await this.prisma.users.findFirst({
      where: {
        id: parseInt(FollowerId),
      },
    });
    if (!exitUsert) return null;
    const BoxChat = await this.prisma.messages.findMany({
      where: {
        OR: [
          {
            fromUserId: parseInt(UserId),
            toUserId: parseInt(FollowerId),
          },
          {
            fromUserId: parseInt(FollowerId),
            toUserId: parseInt(UserId),
          },
        ],
      },
      orderBy: {
        id: 'asc',
      },
    });
    return BoxChat;
  }
}
