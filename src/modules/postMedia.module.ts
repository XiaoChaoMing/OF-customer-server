/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PostMediaService } from 'src/services/postMedia.service';

@Module({
  imports: [PrismaModule],
  providers: [PostMediaService],
  exports: [PostMediaService],
})
export class PostMediaModule {}
