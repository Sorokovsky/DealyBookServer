import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtPayload, sign, verify } from 'jsonwebtoken';
@Injectable()
export class TokensService {
    private secretKey:string;
    constructor(private config: ConfigService){
        this.secretKey = config.get<string>("SECRET_KEY");
    };
    private generate<T extends object>(payload:T, expiresIn:string | number):string{
        return sign(payload, this.secretKey, {expiresIn: expiresIn});
    }
    generateAccessToken<T extends object>(payload:T):string{
        return this.generate(payload, '30d');
    }
    verifyToken(token: string):JwtPayload | string{
        return verify(token, this.secretKey);
    }
};