import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FileService } from "src/file/file.service";
import { User, UserSchema } from "src/schemas/user.schema";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
@Module({
    controllers: [UsersController],
    providers: [UsersService, FileService],
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])]
})
export class UsersModule{};