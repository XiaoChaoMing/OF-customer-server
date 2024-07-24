/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Query, Res, Version } from '@nestjs/common';
import { FollowerService } from 'src/services/follower.service';

@Controller('follower')
export class FollowController {
  constructor(private flService: FollowerService) {}

  @Version('1')
  @Get('getFollower')
  async getAllUser(@Res() res, @Query('userId') userId: string) {
    const ListUser = await this.flService.getFollowing(userId);
    if (ListUser.length > 0) {
      return res.status(200).json({ message: 'success', data: ListUser });
    }
    return res.status(404).json({ message: 'not found' });
  }

  @Version('1')
  @Post('follow')
  async followUser(
    @Res() res,
    @Query('uid') userId: string,
    @Query('followerId') followerId: string,
  ) {
    const follow = await this.flService.followUser(userId, followerId);
    if (follow) {
      return res.status(200).json({ message: 'success', data: follow });
    }
    return res.status(404).json({ message: 'not found' });
  }

  @Version('1')
  @Post('un-follow')
  async UnfollowUser(
    @Res() res,
    @Query('uid') userId: string,
    @Query('followerId') followerId: string,
  ) {
    const unfollow = await this.flService.unFollower(userId, followerId);
    if (unfollow) {
      return res.status(200).json({ message: 'success', data: unfollow });
    }
    return res.status(404).json({ message: 'not found' });
  }
}
