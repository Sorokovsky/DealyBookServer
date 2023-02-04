import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { FileModule } from "src/file/file.module";
import { FileService } from "src/file/file.service";
import { User, UserSchema } from "src/schemas/user.schema";
import { TokensModule } from "src/tokens/tokens.module";
import { TokensService } from "src/tokens/tokens.service";
import { UsersModule } from "src/users/users.module";
import { UsersService } from "src/users/users.service";
import { AuthorizationController } from "./authorization.controller";
import { AuthorizationService } from "./authorization.service";
@Module({
    imports: [UsersModule, MongooseModule.forFeature([{name: User.name, schema: UserSchema}]), FileModule, TokensModule, ConfigModule],
    controllers: [AuthorizationController],
    providers: [AuthorizationService, UsersService, FileService, TokensService]
})
export class AuthorizationModule{};