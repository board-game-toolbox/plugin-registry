import { Module } from '@nestjs/common';
import { PluginController } from './plugin.controller';
import { PluginService } from './plugin.service';

@Module({
  providers: [PluginService],
  controllers: [PluginController],
})
export class PluginModule {}
