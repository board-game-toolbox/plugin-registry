import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// @TODO replace with OSS service
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../public/plugins'),
      serveRoot: '/plugins',
    }),
  ],
})
export class FileModule {}
