import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/data/data.service';
import { PluginDetail } from './types';

@Injectable()
export class PluginService {
  constructor(private prisma: PrismaService) {}

  async getAllPlugins(): Promise<PluginDetail[]> {
    const plugins = await this.prisma.plugin.findMany();
    return plugins.map((pluginEntity) => ({
      pluginId: pluginEntity.id,
      pluginName: pluginEntity.name,
      pluginIcon: pluginEntity.icon,
      pluginDesc: pluginEntity.desc,
      pluginSrc: pluginEntity.src,
    }));
  }
}
