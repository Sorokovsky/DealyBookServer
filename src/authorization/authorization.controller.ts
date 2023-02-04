import { FileInterceptor, MemoryStorageFile } from "@blazity/nest-file-fastify";
import { Body, Controller, Get, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CreateUserDto } from "src/dto/Users/create-User.dto";
import { LoginUserDto } from "src/dto/users/login-user.dto";
import { AuthorizationService } from "./authorization.service";
@Controller('/authorization')
export class AuthorizationController{
    constructor(private authorizationService:AuthorizationService){};
    @Post("/registration")
    @UseInterceptors(FileInterceptor('avatar'))
    registration(@Body() user:CreateUserDto, @UploadedFile('avatar') avatar: MemoryStorageFile):Promise<string>{
        return this.authorizationService.registration(user, avatar);
    }
    @Get("/authentication")
    authentication(@Req() req:Request){
        return this.authorizationService.authentication(req);
    }
    @Post("/login")
    login(@Body() loginUserDto:LoginUserDto):Promise<string>{
        return this.authorizationService.login(loginUserDto);
    }
};