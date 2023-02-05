import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { FileModule } from "src/file/file.module";
import { FileService } from "src/file/file.service";
import { Folder, FolderSchema } from "src/schemas/folder.schema";
import { User, UserSchema } from "src/schemas/user.schema";
import { UsersModule } from "src/users/users.module";
import { UsersService } from "src/users/users.service";
import { FoldersController } from "./folders.controller";
import { FoldersService } from "./folders.service";
@Module({
    imports: [UsersModule, MongooseModule.forFeature([{name: User.name, schema: UserSchema}, {name: Folder.name, schema: FolderSchema}]), FileModule, ConfigModule],
    controllers: [FoldersController],
    providers: [FoldersService, UsersService, FileService]
})
export class FoldersModule{};