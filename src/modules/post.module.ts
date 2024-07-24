/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PostService } from 'src/services/post.service';
import { PostController } from 'src/api/posts.controller';

import { PostMediaModule } from './postMedia.module';
import { CommentService } from 'src/services/commment.service';
import { CommentReplyService } from 'src/services/commentReply.service';
import { ReactionService } from 'src/services/reaction.service';
import { Utils } from 'src/utils/untils.service';
@Module({
  imports: [PrismaModule, PostMediaModule],
  providers: [
    PostService,
    CommentService,
    CommentReplyService,
    ReactionService,
    Utils,
  ],
  controllers: [PostController],
  exports: [PostService],
})
export class PostModule {}
