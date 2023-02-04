import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TokenService } from "./tokens.service";
@Module({
    providers: [TokenService, ConfigService]
})
export class TokensModule{};