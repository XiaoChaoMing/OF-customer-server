/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from 'src/dto/auth.dto';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PageService {
  constructor(private prisma: PrismaService) {}
  findUserByName(authPayload: AuthPayloadDto) {
    const exitAccount = this.prisma.accounts.findFirst({
      where: {
        userName: authPayload.userName,
      },
    });
    if (!exitAccount) return null;

    return exitAccount;
  }
  async createAccount(userName: string, password: string, Salt: string) {
    const exitAccount = await this.prisma.accounts.findFirst({
      where: {
        userName: userName,
      },
    });
    if (exitAccount) return null;
    const newAccount = await this.prisma.accounts.create({
      data: {
        userName: userName,
        Password: password,
        Salt: Salt,
        isAdmin: false,
      },
    });

    return newAccount;
  }
}
