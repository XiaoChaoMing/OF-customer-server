/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthPayloadDto } from 'src/dto/auth.dto';

import { AccountService } from 'src/services/account.service';
import { UserService } from 'src/services/users.service';
import { Utils } from 'src/utils/untils.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly accService: AccountService,
    private readonly userService: UserService,
    private jwtService: JwtService,
    private utils: Utils,
  ) {}

  async validateUser(authPayloadDto: AuthPayloadDto) {
    const findAccount = await this.accService.findUserByName(authPayloadDto);
    if (findAccount) {
      try {
        const validpass = await this.utils.hashPassword(
          authPayloadDto.Password,
          findAccount.Salt,
        );
        if (findAccount.Password === validpass) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { Password, Salt, ...account } = findAccount;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { createdAt, updatedAt, accountId, ...user } =
            await this.userService.getUserByAccountId(findAccount.id);
          return { accestoken: this.jwtService.sign(account), user: user };
        }
      } catch (error) {
        console.log(error);
      }
    }

    return null;
  }
  async registerUser(userPayload: any) {
    const { userName, Password, ...userInfo } = userPayload;

    const Salt = await this.utils.generateSalt();
    const hashPassword = await this.utils.hashPassword(Password, Salt);
    const newAccount = await this.accService.createAccount(
      userName,
      hashPassword,
      Salt,
    );
    if (!newAccount) return null;
    userInfo.accountId = newAccount.id;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const newUser = await this.userService.createUser(userInfo);

    return newAccount;
  }
}
