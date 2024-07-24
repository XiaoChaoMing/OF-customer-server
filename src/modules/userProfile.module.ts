/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserProfileService } from 'src/services/userProfile.service';

@Module({
  imports: [PrismaModule],
  providers: [UserProfileService],
  controllers: [],
  exports: [UserProfileService],
})
export class UserProfileModule {}
