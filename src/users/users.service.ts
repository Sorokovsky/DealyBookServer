import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as path from "path";
import { Model } from 'mongoose';
import { CreateUserDto } from "src/dto/users/create-user.dto";
import { User, UserDocument } from "src/schemas/user.schema";
import { MemoryStorageFile } from "@blazity/nest-file-fastify";
import { FileService } from "src/file/file.service";
import { hash, compare } from 'bcrypt';
import { ConfigService } from "@nestjs/config";
import { GetUserDto } from "src/dto/users/get-user.dto";
@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel:Model<UserDocument>, private fileService: FileService, private config:ConfigService){};
    async getAll():Promise<UserDocument[]>{
        return await this.userModel.find();
    }
    async getByOptions(options:GetUserDto){
        try {
            return await this.userModel.findOne(options).populate("folders").exec();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
    async getOne(id:string):Promise<UserDocument>{
        return await this.userModel.findById(id).populate("folders").exec();
    }
    async create(createUserDto:CreateUserDto, avatar:MemoryStorageFile):Promise<UserDocument>{
        const salt:number = +this.config.get<number>("SALT");
        const hashedPassword:string = await hash(createUserDto.password, salt);
        try {
            let user = await this.userModel.create({...createUserDto, password: hashedPassword});            
            if(!avatar) return user;
            if(!this.fileService.checkMimetype(avatar, new RegExp("image/*"))) throw new Error("Avatar have to be a image");
            const avatarPath:string = path.join(`${user._id}`);
            await this.fileService.upload(avatar, avatarPath, avatar.fieldname);
            user.avatar = path.join(avatarPath, `${avatar.fieldname}.${this.fileService.getFileExt(avatar)}`);
            await user.save()
            return user;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
    async delete(id:string):Promise<UserDocument>{
        try {
            return await this.userModel.findByIdAndDelete(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
    async comparePassword(hashed:string, password:string):Promise<boolean>{
        return await compare(password, hashed);
    }
};