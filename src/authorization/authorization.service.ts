import { MemoryStorageFile } from "@blazity/nest-file-fastify";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/dto/users/create-user.dto";
import { TokensService } from "src/tokens/tokens.service";
import { UsersService } from "src/users/users.service";
@Injectable()
export class AuthorizationService{
    constructor(private usersService:UsersService, private tokensService:TokensService){};
    async registration(createUserDto:CreateUserDto, avatar:MemoryStorageFile){
        try {
            const user = await this.usersService.create(createUserDto, avatar);
            const refreshToken = this.tokensService.generateRefreshToken({id: user._id});
            const accessToken = this.tokensService.generateAccessToken({id: user._id});
            user.refreshToken = refreshToken;
            await user.save();
            return accessToken;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
};