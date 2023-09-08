import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Res } from 'src/type';
import { diskStorage } from 'multer';
import { join } from 'path';
import { PluginDetail } from './types';
import { PluginService } from './plugin.service';

@Controller('plugin')
export class PluginController {
  constructor(private readonly pluginService: PluginService) {}

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
  upload(@UploadedFile() file: Express.Multer.File): Res<string> {
    return {
      code: 200,
      data: file.path,
    };
  }

  @Get('all')
  async all(): Promise<Res<PluginDetail[]>> {
    return {
      code: 200,
      data: await this.pluginService.getAllPlugins(),
    };
  }
}
