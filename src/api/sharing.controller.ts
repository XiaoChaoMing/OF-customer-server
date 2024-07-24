/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  Version,
} from '@nestjs/common';
import { SharingService } from 'src/services/sharing.service';

@Controller('post')
export class SharingController {
  constructor(private sharingService: SharingService) {}

  @Version('1')
  @Get('get-personal-sharing')
  async getPersonalSharing(@Res() res, @Query('uid') userId: string) {
    const personalSharing = await this.sharingService.getShared(userId);
    if (!personalSharing)
      return res.status(401).json({ message: 'can not get shared post' });
    return res
      .status(200)
      .json({ message: 'get post shared success', data: personalSharing });
  }

  @Version('1')
  @Post('shared')
  async createShared(@Res() res, @Query('uid') userId: string, @Body() body) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { postId, typeId, ...other } = body;
    const shared = await this.sharingService.createSharingContent(
      userId,
      postId,
      typeId,
    );
    if (!shared)
      return res.status(401).json({ message: 'can not create shared' });
    return res
      .status(200)
      .json({ message: 'Create shared sucsses', data: shared });
  }

  @Version('1')
  @Post('shared')
  async deleteShared(@Res() res, @Query('sid') sharingId: string) {
    const shared = await this.sharingService.deleteShared(sharingId);
    if (!shared)
      return res.status(401).json({ message: 'can not delete shared' });
    return res
      .status(200)
      .json({ message: 'Delete shared success', data: shared });
  }
}
