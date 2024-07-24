/* eslint-disable prettier/prettier */

import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  Version,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthPayloadDto } from './../../dto/auth.dto';
import { LocalGuard } from './guard/local.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Version('1')
  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Res() res: Response, @Body() authPayload: AuthPayloadDto) {
    const tokken = await this.authService.validateUser(authPayload);
    return res.status(200).json({ message: 'login success', data: tokken });
  }

  @Version('1')
  @Post('register')
  async register(@Res() res: Response, @Body() userpayload: any) {
    console.log(userpayload, '1');
    const exitAccount = await this.authService.registerUser(userpayload);

    if (!exitAccount)
      return res.status(401).json({ message: 'account already exists' });
    return res
      .status(200)
      .json({ message: 'Create account sucsses', data: exitAccount });
  }
}
