/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FollowerService } from 'src/services/follower.service';
import { FollowController } from 'src/api/follower.controller';

@Module({
  imports: [PrismaModule],
  providers: [FollowerService],
  controllers: [FollowController],
})
export class FollowerModule {}
