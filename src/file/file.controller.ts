import { Controller, Get, Param, Query } from "@nestjs/common";
import { FileService } from "./file.service";
@Controller()
export class FileController {
    constructor(private fileService:FileService){};
    @Get("/image")
    getImage(@Query("src") src:string):Promise<Buffer>{
        return this.fileService.get(src);
    }
};