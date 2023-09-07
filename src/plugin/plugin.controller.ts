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
import { InjectRepository } from '@nestjs/typeorm';
import { PluginEntity } from 'src/data/plugins/plugin.entity';
import { Repository } from 'typeorm';

@Controller('plugin')
export class PluginController {
  constructor(
    @InjectRepository(PluginEntity)
    private pluginRepo: Repository<PluginEntity>,
  ) {}

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
    const plugins = await this.pluginRepo.find();
    return {
      code: 200,
      data: plugins.map((pluginEntity) => ({
        pluginId: pluginEntity.id,
        pluginName: pluginEntity.name,
        pluginIcon: pluginEntity.icon_url,
        pluginDesc: pluginEntity.desc,
        pluginSrc: pluginEntity.download_url,
      })),
    };
  }
}
