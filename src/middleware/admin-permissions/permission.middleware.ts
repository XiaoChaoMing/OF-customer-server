/* eslint-disable prettier/prettier */

import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PermisionMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const userId = req.query.uid as string;
    const groupId = req.query.group_id as string;
    const admin = await this.prisma.admin.findFirst({
      where: {
        userId: parseInt(userId),
        groupId: parseInt(groupId),
      },
    });
    if (!admin) {
      throw new UnauthorizedException('User does not have admin permissions');
    }
    next();
  }
}
