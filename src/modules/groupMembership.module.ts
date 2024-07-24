/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GroupMemberShipService } from 'src/services/groupMembership.service';

@Module({
  imports: [PrismaModule],
  providers: [GroupMemberShipService],
  exports: [GroupMemberShipService],
})
export class GroupMemberShipModule {}
