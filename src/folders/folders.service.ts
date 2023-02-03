import { Injectable } from "@nestjs/common";
@Injectable()
export class FoldersService{
    async getAllByUser(userId: string):Promise<string>{
        return userId;
    }
    async create(userId: string){
        return userId;
    }
    async delete(id: string){
        return id;
    }
};