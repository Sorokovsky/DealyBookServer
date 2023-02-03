import { Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { FoldersService } from "./folders.service";
@Controller("/folders")
export class FoldersController{
    constructor(private foldersService:FoldersService){};
    @Get("/:userId")
    getAllByUser(@Param('userId') userId:string):Promise<string>{
        return this.foldersService.getAllByUser(userId);
    }
    @Post("/new/:userId")
    create(@Param("userId") userId:string):string{
        return this.create(userId);
    }
    @Delete("/new/:id")
    delete(@Param("id") id:string):string{
        return id;
    }
};