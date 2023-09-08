import {
  Controller,
  Get,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Res } from 'src/type';
import { diskStorage } from 'multer';
import { join } from 'path';
import { PluginDetail } from './types';
import { PluginService } from './plugin.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { User } from '@prisma/client';
import { STATUS_CODE } from 'src/utils/code';

@Controller('plugin')
export class PluginController {
  constructor(private readonly pluginService: PluginService) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(__dirname, '../../public/plugins'),
        filename: (_, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  upload(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ): Res<string> {
    const user: User = req.user;
    console.debug(`file uploaded by ${user.usn}(${user.id})`);

    return {
      code: STATUS_CODE.SUCCESS,
      data: file.path,
    };
  }

  @Get('all')
  async all(): Promise<Res<PluginDetail[]>> {
    return {
      code: STATUS_CODE.SUCCESS,
      data: await this.pluginService.getAllPlugins(),
    };
  }
}
