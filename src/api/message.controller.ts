/* eslint-disable prettier/prettier */
import { Controller, Get, Res, Version, Query } from '@nestjs/common';
import { MessageService } from 'src/services/message.service';

@Controller('msg')
export class MessageController {
  constructor(private msgService: MessageService) {}

  @Version('1')
  @Get('GetBoxChat')
  async getAllPost(
    @Query('uid') UserId: string,
    @Query('friendId') friendId: string,
    @Res() res,
  ) {
    const BoxChat = await this.msgService.GetBoxChatById(UserId, friendId);
    if (!BoxChat)
      return res.status(401).json({ message: 'Cannot get Box chat' });

    return res.status(200).json({ message: 'sucsses', data: BoxChat });
  }
}
