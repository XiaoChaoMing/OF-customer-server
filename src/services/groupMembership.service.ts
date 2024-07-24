/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GroupMemberShipService {
  constructor(private prisma: PrismaService) {}

  async joinGroup(UserId: string, GroupId: string, accepted?: boolean) {
    try {
      const exitMemberShip = await this.prisma.groupMemberShip.findFirst({
        where: {
          AND: [{ userId: parseInt(UserId) }, { groupId: parseInt(GroupId) }],
        },
      });
      if (!exitMemberShip) {
        const isLockGroup = await this.prisma.groups.findFirst({
          where: { id: parseInt(GroupId) },
        });
        if (isLockGroup.isLock) return 2;
        const reqJoin = await this.prisma.groupMemberShip.create({
          data: {
            isAccept: accepted || false,
            isBan: false,
            userId: parseInt(UserId),
            groupId: parseInt(GroupId),
          },
        });
        if (!reqJoin) return null;
        return reqJoin;
      }
      return null;
    } catch (error) {
      return null;
    }
  }
  async getListMember(groupId: string) {
    try {
      const listmember = await this.prisma.groupMemberShip.findMany({
        where: {
          groupId: parseInt(groupId),
        },
        select: {
          user: true,
          isAccept: true,
        },
      });
      return listmember;
    } catch (error) {
      return null;
    }
  }
  async getListUnAccepted(groupId: string) {
    try {
      const unAccepted = await this.prisma.groupMemberShip.findMany({
        where: {
          AND: [{ groupId: parseInt(groupId) }, { isAccept: false }],
        },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              Avatar: true,
            },
          },
        },
      });
      return unAccepted;
    } catch (error) {
      throw new Error(error);
    }
  }
  async acceptMember(GroupId: string, MemberId: string) {
    console.log('test', GroupId, MemberId);
    try {
      const acceptedMember = await this.prisma.groupMemberShip.updateMany({
        where: {
          AND: [{ groupId: parseInt(GroupId) }, { userId: parseInt(MemberId) }],
        },
        data: {
          isAccept: true,
        },
      });
      if (!acceptedMember) return false;
      return acceptedMember;
    } catch (error) {
      throw new Error(error);
    }
  }
  async adminPermission(userId: string, groupId: string, AdminType: string) {
    try {
      const exituser = await this.finduserbyId(userId, groupId);
      if (!exituser) return null;
      if (parseInt(AdminType) === 0) return null;
      const groupExists = await this.prisma.groups.findUnique({
        where: { id: parseInt(groupId) },
      });

      if (!groupExists) {
        throw new Error('GroupId không tồn tại');
      }

      const adminPermission = await this.prisma.admin.create({
        data: {
          userId: parseInt(userId),
          groupId: parseInt(groupId),
          AdminType: parseInt(AdminType),
        },
      });

      return adminPermission;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getAdminPermissions(groupId: string) {
    try {
      const adminList = await this.prisma.admin.findMany({
        where: {
          groupId: parseInt(groupId),
        },
      });
      return adminList;
    } catch (error) {
      return null;
    }
  }
  async banMember(memberId: string, groupId: string) {
    try {
      const userBan = await this.prisma.groupMemberShip.updateMany({
        where: {
          userId: parseInt(memberId),
          groupId: parseInt(groupId),
        },
        data: {
          isBan: true,
        },
      });
      return userBan;
    } catch (error) {
      throw new Error(error);
    }
  }
  async finduserbyId(userId: string, groupId: string) {
    try {
      const exitUser = await this.prisma.groupMemberShip.findFirst({
        where: {
          AND: [
            { userId: parseInt(userId) },
            { groupId: parseInt(groupId) },
            { isAccept: true },
          ],
        },
      });
      if (!exitUser) return false;
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
