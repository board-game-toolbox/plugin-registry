import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PluginEntity } from './plugin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PluginEntity])],
  exports: [TypeOrmModule],
})
export class PluginDAO {}
