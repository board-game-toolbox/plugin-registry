import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Res } from 'src/types';
import { diskStorage } from 'multer';
import { join } from 'path';

@Controller('plugin')
export class PluginController {
  constructor() {}

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
}
