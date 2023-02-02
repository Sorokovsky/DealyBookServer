import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FoldersModule } from './folders/folders.module';
@Module({
  imports: [FoldersModule, ConfigModule.forRoot()],
})
export class AppModule {}
