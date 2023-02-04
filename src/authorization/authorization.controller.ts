import { Body, Controller, Post } from "@nestjs/common";
import { CreateFolderDto } from "src/dto/folders/create-folder.dto";
import { AuthorizationService } from "./authorization.service";
@Controller('/authorization')
export class AuthorizationController{
    constructor(private authorizationService:AuthorizationService){};
    @Post("/registration")
    registration(@Body() user:CreateFolderDto){
        return this.authorizationService.registration(user);
    }
};