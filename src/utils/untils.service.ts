/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class Utils {
  async hashPassword(password: string, saltOrRounds: string | number) {
    return bcrypt.hash(password, saltOrRounds);
  }
  async generateSalt() {
    return bcrypt.genSalt(10);
  }
  async verifyBadWords(content: string) {
    const badContent = ['fuck', 'dcm'];
    if (badContent.includes(content)) {
      return false;
    }
    return true;
  }
}
