/* eslint-disable prettier/prettier */
import { Controller, Get, Query, Res, Version } from '@nestjs/common';

import { UserService } from '../services/users.service';

@Controller('users')
export class UserController {
  constructor(private userservice: UserService) {}

  @Version('1')
  @Get()
  async getAllUser() {
    return this.userservice.getAllUsers();
  }

  @Version('1')
  @Get('findUserByname')
  async findUserByName(@Query('Name') name: string, @Res() res) {
    const ListUser = await this.userservice.getUserByName(name);

    return res.status(200).json({ message: 'sucsses', data: ListUser });
  }

  @Version('1')
  @Get('getUserById')
  async getUserbyId(@Query('uid') id: string, @Res() res) {
    const User = await this.userservice.getUserById(id);

    return res.status(200).json({ message: 'sucsses', data: User });
  }

  @Version('1')
  @Get('rcmt-User')
  async RecommentUser(@Res() res, @Query('uid') userId: string) {
    const ListUser = await this.userservice.getRecommentUser(userId);
    return res.status(200).json({ message: 'sucsses', data: ListUser });
  }
}
