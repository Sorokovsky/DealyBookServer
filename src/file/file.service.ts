import { MemoryStorageFile } from "@blazity/nest-file-fastify";
import { Injectable } from "@nestjs/common";
import { writeFile, rm, mkdir, readFile } from 'fs/promises';
import * as nodePath from 'path';
@Injectable()
export class FileService {
    private staticFolder:string = nodePath.resolve(__dirname, '..', "static");
    async upload(file: MemoryStorageFile, path:string, name:string):Promise<string>{
        try {
            const folderPath:string = nodePath.join(this.staticFolder, path);
            const filePath:string = nodePath.join(folderPath, `${name}.${this.getFileExt(file)}`);
            await mkdir(folderPath, {recursive: true});
            await writeFile(filePath, file.buffer);
            return filePath;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async delete(path:string):Promise<void>{
        try {
            await rm(path);
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async get(path:string):Promise<Buffer>{
        try {
            const filePath:string = nodePath.join(this.staticFolder, path);
            const file:Buffer = await readFile(filePath, {});
            return file;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    getFileExt(file:MemoryStorageFile):string{
        return file.mimetype.split("/")[1].split("+")[0];
    }
    checkMimetype(file:MemoryStorageFile, mimeType:RegExp):boolean{
        return mimeType.test(file.mimetype);
    }
};