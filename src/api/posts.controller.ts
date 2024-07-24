/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Post,
  Get,
  Res,
  Version,
  Query,
} from '@nestjs/common';

import { postDto } from 'src/dto/post.dto';
import { CommentReplyService } from 'src/services/commentReply.service';
import { CommentService } from 'src/services/commment.service';
import { PostService } from 'src/services/post.service';
import { Utils } from 'src/utils/untils.service';

@Controller('post')
export class PostController {
  constructor(
    private postService: PostService,
    private commentSrvice: CommentService,
    private cmtReplyService: CommentReplyService,
    private utils: Utils,
  ) {}

  @Version('1')
  @Get('getAllPosts')
  async getAllPost(
    @Query('pagesize') pagesize: string,
    @Query('skip') skip: string,
    @Query('type') type: string,
    @Query('uid') uid: string,
    @Res() res,
  ) {
    const postList = await this.postService.getAllPosts(
      pagesize,
      skip,
      type,
      uid,
    );
    if (!postList) return res.status(400).json({ message: 'Cannot get posts' });

    return res.status(200).json({ message: 'sucsses', data: postList });
  }

  @Version('1')
  @Get('get-group-post')
  async getGrouppost(
    @Query('pagesize') pagesize: string,
    @Query('skip') skip: string,
    @Query('groupId') groupid: string,
    @Query('uid') uid: string,
    @Res() res,
  ) {
    const postList = await this.postService.getGroupPosts(
      pagesize,
      skip,
      groupid,
      uid,
    );
    if (!postList) return res.status(400).json({ message: 'Cannot get posts' });

    return res.status(200).json({ message: 'sucsses', data: postList });
  }

  @Version('1')
  @Get('getPostById')
  async getPostById(@Res() res, @Query('pid') postId: string) {
    const post = await this.postService.getPostById(postId);
    if (!post) return res.status(400).json({ message: 'create fail' });
    return res.status(200).json({ message: 'Create post sucsses', data: post });
  }

  @Version('1')
  @Get('get-group-img')
  async getGroupImg(@Query('groupId') groupid: string, @Res() res) {
    const groupImage = await this.postService.getPostImages(groupid);
    if (!groupImage)
      return res.status(400).json({ message: 'Cannot get posts' });

    return res.status(200).json({ message: 'sucsses', data: groupImage });
  }

  @Version('1')
  @Get('get-personal-img')
  async getPersonalImage(@Query('uid') userid: string, @Res() res) {
    const personalImage = await this.postService.getUserPostImages(userid);
    if (!personalImage)
      return res.status(400).json({ message: 'Cannot get posts' });

    return res.status(200).json({ message: 'sucsses', data: personalImage });
  }

  @Version('1')
  @Get('get-personal-post')
  async setPersonalPost(
    @Query('pagesize') pagesize: string,
    @Query('skip') skip: string,
    @Query('type') type: string,
    @Query('uid') userId: string,
    @Res() res,
  ) {
    const personalImage = await this.postService.getPersonalPost(
      userId,
      pagesize,
      skip,
      type,
    );
    if (!personalImage)
      return res.status(400).json({ message: 'Cannot get posts' });

    return res.status(200).json({ message: 'sucsses', data: personalImage });
  }

  @Version('1')
  @Post('createPost')
  async createPost(
    @Res() res,
    @Body() postCreateData: postDto,
    @Query('groupId') groupId: string,
  ) {
    const { mediaFile, ...postData } = postCreateData;
    const verifyStatus = await this.utils.verifyBadWords(postData.Status);
    if (!verifyStatus) {
      return res
        .status(200)
        .json({ message: 'you status contains bad words !' });
    }
    const newPost = await this.postService.createNewPost(
      postData,
      mediaFile,
      groupId,
    );
    if (!newPost) return res.status(400).json({ message: 'create fail' });
    return res
      .status(200)
      .json({ message: 'Create post sucsses', data: newPost });
  }

  @Version('1')
  @Post('delete-post')
  async deletePost(@Res() res, @Body() body: any) {
    const { postId } = body;
    const postDeleted = await this.postService.deletePost(postId);
    if (!postDeleted) return res.status(400).json({ message: 'delete fail' });
    return res
      .status(200)
      .json({ message: 'delete sucsses', data: postDeleted });
  }

  @Version('1')
  @Post('update-post')
  async updatePost(@Res() res, @Body() body: any) {
    const { postId, status, addMediaFiles, removeMediaIds } = body;
    console.log(body);
    const postUpdated = await this.postService.updatePost(
      postId,
      status,
      addMediaFiles,
      removeMediaIds,
    );
    if (!postUpdated) return res.status(400).json({ message: 'update fail' });
    return res
      .status(200)
      .json({ message: 'update sucsses', data: postUpdated });
  }

  @Version('1')
  @Get('get-post-reactions')
  async getPostReaction(@Res() res, @Query('postId') postId: string) {
    const postReaction = await this.commentSrvice.getCommmentByPostId(postId);
    if (!postReaction) return res.status(400).json({ message: 'create fail' });
    return res
      .status(200)
      .json({ message: 'Create post sucsses', data: postReaction });
  }

  @Version('1')
  @Get('get-comment-reply')
  async getCommentReply(@Res() res, @Query('commentId') commentId: string) {
    const postReaction = await this.cmtReplyService.getCommmentReply(commentId);
    if (!postReaction) return res.status(400).json({ message: 'create fail' });
    return res
      .status(200)
      .json({ message: 'Create post sucsses', data: postReaction });
  }
}
