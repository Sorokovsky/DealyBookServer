import { MemoryStorageFile } from "@blazity/nest-file-fastify";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/dto/users/create-user.dto";
import { LoginUserDto } from "src/dto/users/login-user.dto";
import { TokensService } from "src/tokens/tokens.service";
import { UsersService } from "src/users/users.service";
@Injectable()
export class AuthorizationService{
    constructor(private usersService:UsersService, private tokensService:TokensService){};
    async registration(createUserDto:CreateUserDto, avatar:MemoryStorageFile):Promise<string>{
        try {
            const user = await this.usersService.create(createUserDto, avatar);
            const accessToken = this.tokensService.generateAccessToken({id: user._id});
            await user.save();
            return accessToken;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
    async authentication(req:Request){
        const authorization:string = req.headers["authorization"];
        if (!authorization) throw new HttpException("AccessToken not founded", HttpStatus.BAD_REQUEST);
        const accessToken:string = authorization.split(" ")[1];
        try {
            const accessData = this.tokensService.verifyToken(accessToken);
        if (accessData){
            return accessData;
        }
        } catch (error) {
            throw new HttpException('AccessToken not active', HttpStatus.BAD_REQUEST);
        }
    }
    async login(loginUserDto:LoginUserDto):Promise<string>{
        try {
            const candidate = await this.usersService.getByOptions({email: loginUserDto.email});
            if(!candidate) throw new Error("User not founded");
            const passwordAccess:boolean = await this.usersService.comparePassword(candidate.password, loginUserDto.password);
            if(!passwordAccess) throw new Error("Password fail");
            return this.tokensService.generateAccessToken({id: candidate.id});
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
};