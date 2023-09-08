import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PluginModule } from './plugin/plugin.module';
import { FileModule } from './file/file.module';
import { DataModule } from './data/data.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PluginModule, FileModule, DataModule, AuthModule],
  controllers: [AppController],
})
export class AppModule {}
