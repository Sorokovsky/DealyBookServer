import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Folder } from "src/schemas/folder.schema";
import { UsersService } from "src/users/users.service";
@Injectable()
export class FoldersService{
    constructor(private usersService:UsersService){};
    async getAllByUser(userId: string):Promise<Folder[]>{
        try {
            const user = await this.usersService.getOne(userId);
            return user.folders;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
    async create(userId: string){
        return userId;
    }
    async delete(id: string){
        return id;
    }
};