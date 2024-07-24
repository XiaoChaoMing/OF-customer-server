/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SharingService } from 'src/services/sharing.service';

@Module({
  imports: [PrismaModule],
  providers: [SharingService],
  controllers: [],
  exports: [SharingService],
})
export class SharingModule {}
