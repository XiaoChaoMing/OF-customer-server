/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PostController } from 'src/api/posts.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ReactionService } from 'src/services/reaction.service';

@Module({
  imports: [PrismaModule],
  providers: [ReactionService],
  controllers: [PostController],
  exports: [ReactionService],
})
export class ReactionModule {}
