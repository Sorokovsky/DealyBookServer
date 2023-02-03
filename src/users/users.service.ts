import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { CreateUserDto } from "src/dto/users/create-user.dto";
import { User, UserDocument } from "src/schemas/user.schema";
@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel:Model<UserDocument>){};
    async getAll():Promise<User[]>{
        return await this.userModel.find();
    }
    async create(createUserDto:CreateUserDto, avatar:Express.Multer.File){
        try {
            return await this.userModel.create(createUserDto);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
    async delete(id:string){
        try {
            return await this.userModel.findByIdAndDelete(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
};