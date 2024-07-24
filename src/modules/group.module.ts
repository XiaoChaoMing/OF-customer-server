/* eslint-disable prettier/prettier */
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GroupService } from 'src/services/group.service';
import { GroupController } from 'src/api/group.controller';
import { GroupMemberShipModule } from './groupMembership.module';
import { PermisionMiddleware } from 'src/middleware/admin-permissions/permission.middleware';

@Module({
  imports: [PrismaModule, GroupMemberShipModule],
  providers: [GroupService],
  controllers: [GroupController],
})
export class GroupsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PermisionMiddleware)
      .forRoutes(
        { path: 'v1/group/ban-member', method: RequestMethod.POST },
        { path: 'v1/group/update-group', method: RequestMethod.POST },
        { path: 'v1/group/admin-permissions', method: RequestMethod.POST },
        { path: 'v1/group/accept-member', method: RequestMethod.POST },
        { path: 'v1/group/delete-group', method: RequestMethod.POST },
      );
  }
}
