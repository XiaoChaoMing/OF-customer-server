/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReactionService {
  constructor(private prisma: PrismaService) {}
  async reactionPost(postId: string, userId: string) {
    try {
      const exitsPost = await this.exitsPost(postId);
      if (exitsPost) {
        const react = await this.prisma.reactions.create({
          data: {
            postId: parseInt(postId),
            userId: parseInt(userId),
          },
        });
        return react;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async exitsPost(postId: string) {
    try {
      const exitsPost = await this.prisma.posts.findFirst({
        where: {
          id: parseInt(postId),
        },
      });
      if (!exitsPost) return null;
      return exitsPost;
    } catch (error) {
      console.log(error);
    }
  }
}
