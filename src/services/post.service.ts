/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostMediaService } from './postMedia.service';

@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService,
    private postMediaService: PostMediaService,
  ) {}
  async createNewPost(
    createPostData: Prisma.PostsUncheckedCreateInput,
    postMedia: string[],
    groupId?: string,
  ) {
    try {
      const newPost = await this.prisma.posts.create({
        data: {
          Status: createPostData.Status,
          userId: createPostData.userId,
          postTypeId: createPostData.postTypeId,
          groupId: null || parseInt(groupId),
        },
      });
      if (!newPost) return null;
      const postid = newPost.id;
      postMedia.map(async (media) => {
        await this.postMediaService.addPostMedia(media, postid);
      });
      return { newPost, postMedia };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updatePost(
    postId: number,
    status: string,
    addMediaFiles?: string[],
    removeMediaIds?: number[],
  ) {
    const updatedPost = await this.prisma.posts.update({
      where: { id: postId },
      data: {
        Status: status,
      },
      include: {
        PostMedia: true,
      },
    });

    if (addMediaFiles) {
      await this.prisma.postMedia.createMany({
        data: addMediaFiles.map((file) => ({
          mediaFile: file,
          PostId: postId,
        })),
      });
    }

    if (removeMediaIds) {
      await this.prisma.postMedia.deleteMany({
        where: {
          id: { in: removeMediaIds },
          PostId: postId,
        },
      });
    }

    return updatedPost;
  }

  async deletePost(postId: number) {
    try {
      console.log(postId);
      const deletedPost = await this.prisma.posts.delete({
        where: {
          id: postId,
        },
      });
      console.log(deletedPost);
      return deletedPost;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllPosts(pagesize: string, skip: string, type: string, uid: string) {
    const PostList = await this.prisma.posts.findMany({
      take: Number(pagesize),
      skip: Number(skip),
      where: {
        AND: [{ pageid: null }, { groupid: null }],
        postTypeId: parseInt(type),
      },
      include: {
        Users: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            Avatar: true,
          },
        },
        PostMedia: {
          select: {
            id: true,
            mediaFile: true,
          },
        },
        Reactions: {
          where: {
            userId: parseInt(uid),
          },
          select: {
            userId: true,
          },
        },
        _count: {
          select: { Reactions: true, Comments: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return PostList;
  }

  async getPostImages(groupid: string) {
    const PostList = await this.prisma.posts.findMany({
      where: {
        groupId: parseInt(groupid),
      },
      include: {
        PostMedia: {
          select: {
            id: true,
            mediaFile: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    const PostListWithFirstImage = PostList.map((post) => ({
      ...post,
      PostMedia: post.PostMedia.length > 0 ? [post.PostMedia[0]] : [],
    }));

    return PostListWithFirstImage;
  }

  async getUserPostImages(userid: string) {
    const postList = await this.prisma.posts.findMany({
      where: {
        AND: [{ userId: parseInt(userid) }, { groupId: null }],
      },
      include: {
        PostMedia: {
          select: {
            id: true,
            mediaFile: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    const PostListWithFirstImage = postList.map((post) => ({
      ...post,
      PostMedia: post.PostMedia.length > 0 ? [post.PostMedia[0]] : [],
    }));
    return PostListWithFirstImage;
  }

  async getPersonalPost(
    userId: string,
    pagesize: string,
    skip: string,
    type: string,
  ) {
    try {
      const personalPost = await this.prisma.posts.findMany({
        take: Number(pagesize),
        skip: Number(skip),
        where: {
          AND: [
            { userId: parseInt(userId) },
            { pageid: null },
            { groupid: null },
          ],
          postTypeId: parseInt(type),
        },
        include: {
          Users: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              Avatar: true,
            },
          },
          PostMedia: {
            select: {
              id: true,
              mediaFile: true,
            },
          },
          Reactions: {
            where: {
              userId: parseInt(userId),
            },
            select: {
              userId: true,
            },
          },
          _count: {
            select: { Reactions: true, Comments: true },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return personalPost;
    } catch (error) {
      console.log(error);
    }
  }

  async getGroupPosts(
    pagesize: string,
    skip: string,
    groupid: string,
    uid: string,
  ) {
    const PostList = await this.prisma.posts.findMany({
      take: Number(pagesize),
      skip: Number(skip),
      where: {
        groupId: parseInt(groupid),
      },
      include: {
        Users: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            Avatar: true,
          },
        },
        PostMedia: {
          select: {
            id: true,
            mediaFile: true,
          },
        },
        Reactions: {
          where: {
            userId: parseInt(uid),
          },
          select: {
            userId: true,
          },
        },
        _count: {
          select: { Reactions: true, Comments: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return PostList;
  }

  async getPostById(id: string) {
    try {
      const post = await this.prisma.posts.findFirst({
        where: {
          id: parseInt(id),
        },
        include: {
          Users: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              Avatar: true,
            },
          },
          PostMedia: {
            select: {
              id: true,
              mediaFile: true,
            },
          },
          _count: {
            select: {
              Reactions: true,
              Comments: true,
            },
          },
        },
      });
      return post;
    } catch (error) {
      console.log(error);
    }
  }
}
