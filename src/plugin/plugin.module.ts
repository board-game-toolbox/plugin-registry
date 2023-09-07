import { Module } from '@nestjs/common';
import { PluginController } from './plugin.controller';
import { PluginDAO } from 'src/data/plugins/plugin.module';

@Module({
  imports: [PluginDAO],
  controllers: [PluginController],
})
export class PluginModule {}
