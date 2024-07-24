/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentReplyService {
  constructor(private prisma: PrismaService) {}
  async getCommmentReply(parentCommentId: string) {
    try {
      const parentId = await this.findParentComment(parentCommentId);
      if (!parentId) return null;
      const listCommentReply = await this.prisma.cmtReply.findMany({
        include: {
          ById: true,
        },
        where: {
          parentCommentId: parseInt(parentCommentId),
        },
      });
      return listCommentReply;
    } catch (error) {
      return new Error(error.message);
    }
  }
  async deleteReplyComment(
    uid: string,
    parentCommentId: string,
    replyByid: string,
  ) {
    try {
      await this.prisma.cmtReply.delete({
        where: {
          id: parseInt(uid),
          parentCommentId: parseInt(parentCommentId),
          ReplyById: parseInt(replyByid),
        },
      });
      return 1;
    } catch (error) {
      return new Error(error.message);
    }
  }
  async findParentComment(parentCommentId: string) {
    const exitComment = await this.prisma.comments.findFirst({
      where: {
        id: parseInt(parentCommentId),
      },
    });
    if (!exitComment) return null;
    return exitComment;
  }
}
