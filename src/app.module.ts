import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';
import { FoldersModule } from './folders/folders.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    FoldersModule, 
    ConfigModule.forRoot(), 
    FileModule,
    UsersModule,
    MongooseModule.forRootAsync({useFactory: () => ({uri: process.env.DB_LINK})}), 
  ],
})
export class AppModule {};
