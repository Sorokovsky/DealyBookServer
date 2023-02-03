import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateUserDto } from "src/dto/users/create-user.dto";
import { User } from "src/schemas/user.schema";
import { UsersService } from "./users.service";
@Controller("/users")
export class UsersController{
    constructor(private usersService:UsersService){};
    @Get()
    getAll():Promise<User[]>{
        return this.usersService.getAll();
    }
    @Post()
    @UseInterceptors(FileInterceptor("avatar"))
    create(@Body() createUserDto:CreateUserDto, @UploadedFile() avatar:Express.Multer.File):Promise<User>{
        return this.usersService.create(createUserDto, avatar);
    }
    @Delete("/:id")
    delete(@Param('id') id:string):Promise<User>{
        return this.usersService.delete(id);
    }
};