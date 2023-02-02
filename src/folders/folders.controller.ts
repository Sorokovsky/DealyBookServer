import { Controller, Get, Param } from "@nestjs/common";

@Controller("/folders")
export class FoldersController{
    @Get("/:userId")
    getAll(@Param('userId') userId:string):string{
        return userId;
    }
}