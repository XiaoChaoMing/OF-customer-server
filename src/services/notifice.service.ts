/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from 'src/dto/auth.dto';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificeService {
  constructor(private prisma: PrismaService) {}
  async findUserByName(authPayload: AuthPayloadDto) {
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
  async getAllNotifyByUserId(userId: string) {
    try {
      const listNotify = await this.prisma.notifies.findMany({
        where: {
          userId: parseInt(userId),
        },
        include: {
          Users_Notifies_fromUserIdToUsers: {
            select: {
              firstName: true,
              lastName: true,
              Avatar: true,
            },
          },
        },
      });
      return listNotify;
    } catch (error) {
      return null;
    }
  }
  async getNotifyType() {
    const types = await this.prisma.notifiTypes.findMany();
    return types;
  }
  async readNotify(notifyId: string) {
    try {
      const isRead = await this.prisma.notifies.update({
        where: {
          id: parseInt(notifyId),
        },
        data: {
          isRead: true,
        },
      });
      return isRead;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteNotify(notifyId: string) {
    try {
      const notifyDeleted = await this.prisma.notifies.delete({
        where: {
          id: parseInt(notifyId),
        },
      });
      if (!notifyDeleted) return null;
      return notifyDeleted;
    } catch (error) {
      console.log(error);
    }
  }
}
