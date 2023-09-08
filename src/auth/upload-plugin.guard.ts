import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/data/data.service';

@Injectable()
export class UploadPluginGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const user: User = req.user;
    const pluginId = req.query.id;
    // no relative auth, means its the first
    // upload of this plugin
    const isFirstUpload =
      (await this.prisma.authority.count({
        where: {
          pluginId,
        },
      })) === 0;

    if (isFirstUpload) {
      req.isFirstUpload = true;
    }
    // owner and maintainer can both upload
    const canUpload =
      (await this.prisma.authority.count({
        where: {
          pluginId,
          userId: user.id,
        },
      })) !== 0;
    return isFirstUpload || canUpload;
  }
}
