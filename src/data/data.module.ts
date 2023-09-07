import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PluginEntity } from './plugins/plugin.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USN,
      password: process.env.MYSQL_PWD,
      database: 'plugin_registry',
      entities: [PluginEntity],
    }),
  ],
})
export class DataModule {}
