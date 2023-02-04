import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FileModule } from './file/file.module';
import { FoldersModule } from './folders/folders.module';
import { TokensModule } from './tokens/tokens.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    FoldersModule, 
    ConfigModule.forRoot(), 
    FileModule,
    TokensModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }),
    UsersModule,
    MongooseModule.forRootAsync({useFactory: () => ({uri: process.env.DB_LINK})}), 
  ],
  controllers:[]
})
export class AppModule {};
