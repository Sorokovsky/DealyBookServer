import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as path from "path";
import { Model } from 'mongoose';
import { CreateUserDto } from "src/dto/users/create-user.dto";
import { User, UserDocument } from "src/schemas/user.schema";
import { MemoryStorageFile } from "@blazity/nest-file-fastify";
import { FileService } from "src/file/file.service";
@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel:Model<UserDocument>, private fileService: FileService){};
    async getAll():Promise<User[]>{
        return await this.userModel.find();
    }
    async getOne(id:string):Promise<User>{
        return await this.userModel.findById(id);
    }
    async create(createUserDto:CreateUserDto, avatar:MemoryStorageFile):Promise<User>{
        try {
            let user = await this.userModel.create(createUserDto);
            if(!avatar) return user;
            if(!this.fileService.checkMimetype(avatar, new RegExp("image/*"))) throw new Error("Avatar have to be a image");
            const avatarPath:string = path.join(`${user._id}`);
            await this.fileService.upload(avatar, avatarPath, avatar.fieldname);
            user.avatar = path.join(avatarPath, avatar.fieldname);
            await user.save()
            return user;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
    async delete(id:string):Promise<User>{
        try {
            return await this.userModel.findByIdAndDelete(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
};