import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TokensService } from "./tokens.service";
@Module({
    providers: [TokensService, ConfigService]
})
export class TokensModule{};