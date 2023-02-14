import { Body, Controller, Delete, Get, Param, Post, UseInterceptors } from "@nestjs/common";
import { FileInterceptor, UploadedFile, MemoryStorageFile } from '@blazity/nest-file-fastify';
import { CreateUserDto } from "src/dto/users/create-user.dto";
import { UsersService } from "./users.service";
import { UserDocument } from "src/schemas/user.schema";
@Controller("/users")
export class UsersController{
    constructor(private usersService:UsersService){};
    @Get()
    getAll():Promise<UserDocument[]>{
        return this.usersService.getAll();
    }
    @Get("/:id")
    getOne(@Param("id") id:string):Promise<UserDocument>{
        return this.usersService.getOne(id);
    }
    @Post()
    @UseInterceptors(FileInterceptor('avatar'))
    create(@Body() createUserDto:CreateUserDto, @UploadedFile() avatar:MemoryStorageFile):Promise<UserDocument>{
        return this.usersService.create(createUserDto, avatar);
    }
    @Delete("/:id")
    delete(@Param('id') id:string):Promise<UserDocument>{
        return this.usersService.delete(id);
    }
};