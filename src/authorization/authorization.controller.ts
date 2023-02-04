import { FileInterceptor, MemoryStorageFile } from "@blazity/nest-file-fastify";
import { Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CreateUserDto } from "src/dto/Users/create-User.dto";
import { AuthorizationService } from "./authorization.service";
@Controller('/authorization')
export class AuthorizationController{
    constructor(private authorizationService:AuthorizationService){};
    @Post("/registration")
    @UseInterceptors(FileInterceptor('avatar'))
    registration(@Body() user:CreateUserDto, @UploadedFile('avatar') avatar: MemoryStorageFile){
        return this.authorizationService.registration(user, avatar);
    }
};