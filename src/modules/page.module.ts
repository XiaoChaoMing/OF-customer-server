/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PageController } from 'src/api/page.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PageService } from 'src/services/page.service';

@Module({
  imports: [PrismaModule],
  providers: [PageService],
  controllers: [PageController],
})
export class PageModule {}
