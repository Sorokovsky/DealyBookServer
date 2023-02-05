import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { CreateFolderDto } from "src/dto/folders/create-folder.dto";
import { UpdateFolderDto } from "src/dto/folders/update-folder.dto";
import { Folder, FolderDocument } from "src/schemas/folder.schema";
import { UsersService } from "src/users/users.service";
@Injectable()
export class FoldersService{
    constructor(private usersService:UsersService, @InjectModel(Folder.name) private foldersModel:Model<FolderDocument> ){};
    async getAllByUser(userId: string):Promise<Folder[]>{
        try {
            const user = await this.usersService.getOne(userId);
            return user.folders;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
    async create(userId: string, createFolderDto:CreateFolderDto):Promise<FolderDocument>{
        try {
            const user = await this.usersService.getOne(userId);
            const folder = await this.foldersModel.create(createFolderDto);
            user.folders.push(folder);
            await user.save();
            return folder;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
    async update(id:string, updateFolderDto:UpdateFolderDto):Promise<FolderDocument>{
        return await this.foldersModel.findByIdAndUpdate(id, updateFolderDto);
    }
    async delete(id: string){
        try {
            return await this.foldersModel.findByIdAndDelete(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
};