/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SharingService {
  constructor(private prisma: PrismaService) {}
  async createSharingContent(userId: string, postId: string, typeId: string) {
    try {
      const newSharingContent = await this.prisma.sharing.create({
        data: {
          userId: parseInt(userId),
          postId: parseInt(postId),
          typeId: parseInt(typeId),
        },
      });
      return newSharingContent;
    } catch (error) {
      console.log(error);
    }
  }
  async getPostBySharingId(sharingId: string) {
    try {
      const post = await this.prisma.sharing.findFirst({
        where: {
          id: parseInt(sharingId),
        },
        include: {
          Posts: {
            select: {
              PostMedia: true,
              Status: true,
              Reactions: true,
            },
          },
          Users: {
            select: {
              Avatar: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      });
      return post;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteShared(sharingId: string) {
    try {
      const deleteShared = await this.prisma.sharing.delete({
        where: {
          id: parseInt(sharingId),
        },
      });
      return deleteShared;
    } catch (error) {
      console.log(error);
    }
  }
  async getShared(userId: string) {
    try {
      const shared = await this.prisma.sharing.findMany({
        where: {
          userId: parseInt(userId),
        },
      });
      return shared;
    } catch (error) {
      console.log(error);
    }
  }
}
