/* eslint-disable prettier/prettier */
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'userName',
      passwordField: 'Password',
    });
  }

  async validate(userName: string, password: string) {
    console.log(userName, password);
    const account = await this.authService.validateUser({
      userName: userName,
      Password: password,
    });
    if (!account) {
      throw new UnauthorizedException();
    }
    return account;
  }
}
