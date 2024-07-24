/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PageController } from 'src/api/page.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PageFollowService } from 'src/services/pageFollow.service';

@Module({
  imports: [PrismaModule],
  providers: [PageFollowService],
  controllers: [PageController],
  exports: [PageFollowService],
})
export class PageFollowModule {}
