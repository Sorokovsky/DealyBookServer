import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { FileModule } from "src/file/file.module";
import { FileService } from "src/file/file.service";
import { User, UserSchema } from "src/schemas/user.schema";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
@Module({
    controllers: [UsersController],
    providers: [UsersService, FileService, ConfigService],
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}]), FileModule, ConfigModule]
})
export class UsersModule{};