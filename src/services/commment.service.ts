/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async getCommmentByPostId(postId: string) {
    try {
      const exitPost = await this.getExitPost(postId);
      if (!exitPost) return null;
      const commentList = await this.prisma.comments.findMany({
        include: {
          Users: true,
          _count: true,
        },
        where: {
          postId: parseInt(postId),
        },
      });
      return commentList;
    } catch (error) {
      return new Error(error.message);
    }
  }
  async getExitPost(postId: string) {
    try {
      const exitPost = await this.prisma.posts.findFirst({
        where: {
          id: parseInt(postId),
        },
      });
      if (!exitPost) return null;
      return exitPost;
    } catch (error) {
      return new Error(error.message);
    }
  }
}
