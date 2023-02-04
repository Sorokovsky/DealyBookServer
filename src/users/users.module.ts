import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { FileService } from "src/file/file.service";
import { User, UserSchema } from "src/schemas/user.schema";
import { TokensModule } from "src/tokens/tokens.module";
import { TokenService } from "src/tokens/tokens.service";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
@Module({
    controllers: [UsersController],
    providers: [UsersService, FileService],
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])]
})
export class UsersModule{};