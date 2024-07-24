/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FollowerService {
  constructor(private prisma: PrismaService) {}
  async getFollowers(id: string) {
    const FollowerList = await this.prisma.followers.findMany({
      select: {
        id: true,
        folowerId: true,
        Users_Followers_folowerIdToUsers: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            Avatar: true,
          },
        },
      },
      where: {
        followingId: parseInt(id),
      },
    });
    return FollowerList;
  }
  async getFollowing(id: string) {
    const FollowerList = await this.prisma.followers.findMany({
      select: {
        id: true,
        folowerId: true,
        Users_Followers_followingIdToUsers: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            Avatar: true,
          },
        },
      },
      where: {
        folowerId: parseInt(id),
      },
    });
    return FollowerList;
  }
  async followUser(userId: string, followerId: string) {
    const userFollow = await this.prisma.followers.create({
      data: {
        folowerId: parseInt(userId),
        followingId: parseInt(followerId),
      },
    });
    return userFollow;
  }
  async unFollower(userId: string, followerId: string) {
    const unFollow = await this.prisma.followers.deleteMany({
      where: {
        AND: [
          { folowerId: parseInt(userId) },
          { followingId: parseInt(followerId) },
        ],
      },
    });
    return unFollow;
  }
}
