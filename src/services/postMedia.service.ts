/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostMediaService {
  constructor(private prisma: PrismaService) {}
  async getMediaByPostId(id: number) {
    const mediaList = await this.prisma.postMedia.findMany({
      where: { PostId: id },
    });
    return mediaList;
  }
  async addPostMedia(mediaPath: string, id: number) {
    try {
      const postmedia = await this.prisma.postMedia.create({
        data: {
          mediaFile: mediaPath,
          PostId: id,
        },
      });
      return postmedia;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
