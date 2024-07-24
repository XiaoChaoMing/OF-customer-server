/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from 'src/dto/users.dto';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async createUser(userDto: UserDto) {
    return await this.prisma.users.create({ data: userDto });
  }
  async getUserByAccountId(id: number) {
    return await this.prisma.users.findFirst({
      where: {
        accountId: id,
      },
    });
  }
  async getUserById(id: string) {
    return await this.prisma.users.findFirst({
      where: {
        id: parseInt(id),
      },
    });
  }
  async getAllUsers() {
    return await this.prisma.users.findMany({
      select: {
        firstName: true,
        lastName: true,
      },
    });
  }
  async getUserByName(name: string) {
    return await this.prisma.users.findMany({
      where: {
        OR: [
          { firstName: { contains: name } },
          { lastName: { contains: name } },
        ],
      },
    });
  }
  async getRecommentUser(userId: string) {
    return await this.prisma.users.findMany({
      where: {
        id: {
          notIn: await this.prisma.followers
            .findMany({
              where: {
                folowerId: parseInt(userId),
              },
              select: {
                followingId: true,
              },
            })
            .then((following) => following.map((f) => f.followingId)),
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        Avatar: true,
      },
      orderBy: {
        Followers_Followers_folowerIdToUsers: {
          _count: 'desc',
        },
      },
    });
  }
}
