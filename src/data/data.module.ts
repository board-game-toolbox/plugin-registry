import { Global, Module } from '@nestjs/common';
import { PrismaService } from './data.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DataModule {}
