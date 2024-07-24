/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from '../api/users.controller';
import { UserService } from 'src/services/users.service';
import { AccountService } from 'src/services/account.service';

@Module({
  imports: [PrismaModule],
  providers: [UserService, AccountService],
  controllers: [UserController],
  exports: [AccountService],
})
export class AccountModule {}
