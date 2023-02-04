import { Body, Controller, Delete, Get, Param, Post, UseInterceptors } from "@nestjs/common";
import { FileInterceptor, UploadedFile, MemoryStorageFile } from '@blazity/nest-file-fastify';
import { CreateUserDto } from "src/dto/users/create-user.dto";
import { UsersService } from "./users.service";
import { GetUserDto } from "src/dto/users/get-user.dto";
@Controller("/users")
export class UsersController{
    constructor(private usersService:UsersService){};
    @Get()
    getAll():Promise<GetUserDto[]>{
        return this.usersService.getAll();
    }
    @Get("/:id")
    getOne(@Param("id") id:string):Promise<GetUserDto>{
        return this.usersService.getOne(id);
    }
    @Post()
    @UseInterceptors(FileInterceptor('avatar'))
    create(@Body() createUserDto:CreateUserDto, @UploadedFile() avatar:MemoryStorageFile):Promise<GetUserDto>{
        return this.usersService.create(createUserDto, avatar);
    }
    @Delete("/:id")
    delete(@Param('id') id:string):Promise<GetUserDto>{
        return this.usersService.delete(id);
    }
};