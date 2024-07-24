/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NotificeController } from 'src/api/notifice.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NotificeService } from 'src/services/notifice.service';

@Module({
  imports: [PrismaModule],
  providers: [NotificeService],
  controllers: [NotificeController],
})
export class NotificeModule {}
