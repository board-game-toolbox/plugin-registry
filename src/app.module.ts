import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PluginModule } from './plugin/plugin.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [PluginModule, FileModule],
  controllers: [AppController],
})
export class AppModule {}
