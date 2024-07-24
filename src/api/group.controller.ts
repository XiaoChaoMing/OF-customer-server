/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  Version,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/middleware/auth/guard/jwt.guard';
import { GroupService } from 'src/services/group.service';
import { GroupMemberShipService } from 'src/services/groupMembership.service';

@Controller('group')
export class GroupController {
  constructor(
    private grService: GroupService,
    private mbsService: GroupMemberShipService,
  ) {}

  @Version('1')
  @Post('create-group')
  async createGroup(@Res() res, @Body() body, @Query('uid') userId: string) {
    const newGroup = await this.grService.createGroup(body, userId);
    if (newGroup) {
      const gid = newGroup.newGroup.id.toString();
      await this.mbsService.joinGroup(userId, gid, true);

      return res.status(200).json({ message: 'success', data: newGroup });
    }
    return res.status(404).json({ message: 'not found' });
  }

  @Version('1')
  @Post('delete-group')
  async deleteGroup(@Res() res, @Query('id') groupId: string) {
    const dltGroup = await this.grService.deleteGroup(groupId);
    if (dltGroup) {
      return res.status(200).json({ message: 'success' });
    }
    return res.status(404).json({ message: 'not found' });
  }

  @Version('1')
  @Get('find-group')
  @UseGuards(JwtAuthGuard)
  async findGroup(
    @Req() req,
    @Res() res,
    @Query('group_name') groupName: string,
  ) {
    const listGroup = await this.grService.getGroup(groupName);
    if (listGroup) {
      return res.status(200).json({ message: 'success', data: listGroup });
    }
    return res.status(404).json({ message: 'not found' });
  }

  @Version('1')
  @Get('recomment-group')
  async recommentGroup(@Res() res, @Query('uid') uid: string) {
    const listGroup = await this.grService.getRecommentGroup(uid);
    if (listGroup) {
      return res.status(200).json({ message: 'success', data: listGroup });
    }
    return res.status(404).json({ message: 'not found' });
  }

  @Version('1')
  @Get('jointed-group')
  async getJointedGroup(@Res() res, @Query('uid') uid: string) {
    const listGroup = await this.grService.getJointedGroup(uid);
    if (listGroup) {
      return res.status(200).json({ message: 'success', data: listGroup });
    }
    return res.status(404).json({ message: 'not found' });
  }

  @Version('1')
  @Post('join-group')
  async jointGroup(
    @Res() res,
    @Query('uid') userId: string,
    @Query('group_id') groupId: string,
  ) {
    const reqJoin = await this.mbsService.joinGroup(userId, groupId);
    if (reqJoin) {
      if (reqJoin === 2)
        return res
          .status(200)
          .json({ message: 'this group is not avaliable !' });

      return res
        .status(200)
        .json({ message: 'request succsess', data: reqJoin });
    }
    return res.status(404).json({ message: 'not found' });
  }

  @Version('1')
  @Post('accept-member')
  @UseGuards(JwtAuthGuard)
  async acceptMember(
    @Res() res,
    @Query('uid') memberId: string,
    @Query('group_id') groupId: string,
  ) {
    const isAccept = await this.mbsService.acceptMember(groupId, memberId);
    if (isAccept) {
      return res.status(200).json({ message: 'accept member', data: isAccept });
    }
    return res.status(404).json({ message: 'not found' });
  }

  @Version('1')
  @Get('unaccept-list')
  async findUnacceptedMembers(@Res() res, @Query('group_id') groupId: string) {
    const unAcceptList = await this.mbsService.getListUnAccepted(groupId);
    if (unAcceptList) {
      return res
        .status(200)
        .json({ message: 'unaccept member', data: unAcceptList });
    }
    return res.status(404).json({ message: 'not found' });
  }

  @Version('1')
  @Post('admin-permissions')
  @UseGuards(JwtAuthGuard)
  async adminPermissions(
    @Res() res,
    @Query('uid') memberId: string,
    @Query('group_id') groupId: string,
    @Body() body,
  ) {
    const { adminType } = body;
    const adminpermission = await this.mbsService.adminPermission(
      memberId,
      groupId,
      adminType,
    );
    if (adminpermission) {
      return res
        .status(200)
        .json({ message: 'accept member', data: adminpermission });
    }
    return res.status(404).json({ message: 'not found' });
  }

  @Version('1')
  @Post('ban-member')
  @UseGuards(JwtAuthGuard)
  async banMember(
    @Res() res,
    @Req() req,
    @Query('uid') userId: string,
    @Query('group_id') groupId: string,
    @Query('member_id') memberId: string,
  ) {
    if (userId !== memberId) {
      const isBan = await this.mbsService.banMember(memberId, groupId);
      if (isBan) {
        return res.status(200).json({ message: 'ban member', data: isBan });
      }
    }
    return res.status(404).json({ message: 'not found' });
  }

  @Version('1')
  @Get('load-member')
  async LoadMember(@Res() res, @Query('group_id') groupId: string) {
    const listMember = await this.mbsService.getListMember(groupId);
    if (listMember) {
      return res.status(200).json({ message: 'exit group', data: listMember });
    }
    return res.status(404).json({ message: 'not found' });
  }

  @Version('1')
  @Get('load-admin')
  async LoadAdmin(@Res() res, @Query('group_id') groupId: string) {
    const listAdmin = await this.mbsService.getAdminPermissions(groupId);
    if (listAdmin) {
      return res.status(200).json({ message: 'exit group', data: listAdmin });
    }
    return res.status(404).json({ message: 'not found' });
  }

  @Version('1')
  @Get('load-Group')
  async LoadGroup(@Res() res, @Query('group_id') groupId: string) {
    const exitGroup = await this.grService.getGroupById(groupId);
    if (exitGroup) {
      return res.status(200).json({ message: 'exit group', data: exitGroup });
    }
    return res.status(404).json({ message: 'not found' });
  }

  @Version('1')
  @Post('update-group')
  async updateGroup(
    @Res() res,
    @Query('group_id') groupId: string,
    @Query('uid') userId: string,
    @Body() body,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { groupName, groupImage, groupWall, ...group } = body;
    const updateGroup = await this.grService.updateGroup(
      groupId,
      groupName,
      groupImage,
      groupWall,
    );
    if (updateGroup) {
      return res
        .status(200)
        .json({ message: 'update group successfull', data: updateGroup });
    }
    return res.status(404).json({ message: 'can not update group' });
  }
}
