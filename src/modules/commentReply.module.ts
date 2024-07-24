/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PostController } from 'src/api/posts.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommentReplyService } from 'src/services/commentReply.service';
import { CommentService } from 'src/services/commment.service';
import { PostService } from 'src/services/post.service';

@Module({
  imports: [PrismaModule],
  providers: [CommentReplyService, CommentService, PostService],
  controllers: [PostController],
  exports: [CommentReplyService],
})
export class CommentReplyModule {}
