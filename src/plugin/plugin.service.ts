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

  async onFirstUpload(pluginId: string, userId: number) {
    // @TODO real process
    await this.prisma.plugin.create({
      data: {
        id: pluginId,
        name: pluginId,
        icon: `http://127.0.0.1:8000/plugins/${pluginId}/icon.png`,
        desc: '',
        src: `http://127.0.0.1:8000/plugins/${pluginId}/${pluginId}.zip`,
      },
    });
    // set owner
    await this.prisma.authority.create({
      data: {
        pluginId,
        userId,
        role: 'OWNER',
      },
    });
  }
}
