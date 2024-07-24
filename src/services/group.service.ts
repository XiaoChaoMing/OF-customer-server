/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}
  async createGroup(data: Prisma.GroupsCreateInput, userId: string) {
    try {
      const newGroup = await this.prisma.groups.create({ data: data });
      if (!newGroup) {
        return null;
      }
      const admin = await this.prisma.admin.create({
        data: {
          userId: parseInt(userId),
          groupId: newGroup.id,
          AdminType: 0,
        },
      });
      return { newGroup, admin };
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteGroup(id: string) {
    try {
      const dltgroup = await this.prisma.groups.update({
        where: { id: parseInt(id) },
        data: { isLock: true },
      });
      if (!dltgroup) return null;
      return dltgroup;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getGroup(name: string) {
    try {
      const ListGroup = await this.prisma.groups.findMany({
        where: {
          groupName: { contains: name },
        },
        include: {
          _count: {
            select: {
              groupmember: {
                where: {
                  isAccept: true,
                  isBan: false,
                },
              },
            },
          },
        },
      });
      if (!ListGroup) return null;
      return ListGroup;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getGroupById(groupId: string) {
    try {
      const exitGroup = await this.prisma.groups.findFirst({
        where: {
          id: parseInt(groupId),
        },
        include: {
          _count: {
            select: {
              groupmember: {
                where: {
                  isAccept: true,
                  isBan: false,
                },
              },
            },
          },
        },
      });
      if (!exitGroup) return null;
      return exitGroup;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getRecommentGroup(userId: string) {
    try {
      const ListGroup = await this.prisma.groups.findMany({
        where: {
          NOT: {
            groupmember: {
              some: {
                userId: parseInt(userId),
              },
            },
          },
        },
        include: {
          _count: {
            select: {
              groupmember: {
                where: {
                  AND: [{ isAccept: true }, { isBan: false }],
                },
              },
            },
          },
        },
        orderBy: {
          groupmember: {
            _count: 'desc',
          },
        },
      });
      if (!ListGroup) return null;
      return ListGroup;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getJointedGroup(userId: string) {
    try {
      const ListGroup = await this.prisma.groups.findMany({
        where: {
          groupmember: {
            some: {
              userId: parseInt(userId),
            },
          },
        },
        include: {
          _count: {
            select: {
              groupmember: {
                where: {
                  AND: [{ isAccept: true }, { isBan: false }],
                },
              },
            },
          },
        },
        orderBy: {
          groupmember: {
            _count: 'desc',
          },
        },
      });
      if (!ListGroup) return null;
      return ListGroup;
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateGroup(
    groupId: string,
    groupName?: string,
    groupImage?: string,
    groupWall?: string,
  ) {
    try {
      const currentGroup = await this.prisma.groups.findUnique({
        where: {
          id: parseInt(groupId),
        },
      });

      if (!currentGroup) {
        throw new Error('Group not found');
      }

      const newInfo = await this.prisma.groups.update({
        where: {
          id: parseInt(groupId),
        },
        data: {
          groupName: groupName === '' ? currentGroup.groupName : groupName,
          groupImage: groupImage === '' ? currentGroup.groupImage : groupImage,
          groupWall: groupWall === '' ? currentGroup.groupWall : groupWall,
        },
      });
      return newInfo;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
