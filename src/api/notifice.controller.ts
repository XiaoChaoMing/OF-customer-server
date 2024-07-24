/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Query, Res, Version } from '@nestjs/common';
import { NotificeService } from 'src/services/notifice.service';

@Controller('notify')
export class NotificeController {
  constructor(private notifyService: NotificeService) {}

  @Version('1')
  @Get('getAllNotify')
  async getAllNotify(@Res() res, @Query('uuid') userId: string) {
    const listNotify = await this.notifyService.getAllNotifyByUserId(userId);
    if (!listNotify)
      return res.status(401).json({ message: 'can not get notify' });
    return res
      .status(200)
      .json({ message: 'Get all notify success', data: listNotify });
  }

  @Version('1')
  @Get('getAllNotifyType')
  async getAllNotifyType(@Res() res) {
    const listTypes = await this.notifyService.getNotifyType();
    if (!listTypes)
      return res.status(401).json({ message: 'can not get notify type' });
    return res
      .status(200)
      .json({ message: 'Get all notify type success', data: listTypes });
  }

  @Version('1')
  @Post('deleteNotify')
  async deleteNotify(@Res() res, @Query('nid') notifyId: string) {
    const deleteNotify = await this.notifyService.deleteNotify(notifyId);
    if (!deleteNotify)
      return res.status(401).json({ message: 'can not delete notify' });
    return res
      .status(200)
      .json({ message: 'delete notify success', data: deleteNotify });
  }

  @Version('1')
  @Post('readNotify')
  async readNotify(@Res() res, @Query('nid') notifyId: string) {
    const isRead = await this.notifyService.readNotify(notifyId);
    if (!isRead)
      return res.status(401).json({ message: 'notify is not exits' });
    return res
      .status(200)
      .json({ message: 'read notify success', data: isRead });
  }
}
