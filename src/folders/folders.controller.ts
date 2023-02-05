import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateFolderDto } from "src/dto/folders/create-folder.dto";
import { UpdateFolderDto } from "src/dto/folders/update-folder.dto";
import { Folder } from "src/schemas/folder.schema";
import { FoldersService } from "./folders.service";
@Controller("/folders")
export class FoldersController{
    constructor(private foldersService:FoldersService){};
    @Get("/:userId")
    getAllByUser(@Param('userId') userId:string):Promise<Folder[]>{
        return this.foldersService.getAllByUser(userId);
    }
    @Post("/:userId")
    create(@Param("userId") userId:string, @Body() createFolderDto:CreateFolderDto):Promise<Folder>{
        return this.foldersService.create(userId, createFolderDto);
    }
    @Delete("/:id")
    delete(@Param("id") id:string):Promise<Folder>{
        return this.foldersService.delete(id);
    }
    @Put("/:id")
    update(@Param('id') id:string, @Body() updateFolderDto:UpdateFolderDto):Promise<Folder>{
        return this.foldersService.update(id, updateFolderDto);
    }
};