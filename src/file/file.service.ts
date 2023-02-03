import { MemoryStorageFile } from "@blazity/nest-file-fastify";
import { Injectable } from "@nestjs/common";
import { writeFile, rm, mkdir } from 'fs/promises';
import * as nodePath from 'path';
@Injectable()
export class FileService {
    private staticFolder:string = nodePath.resolve(__dirname, '..', "static");
    async upload(file: MemoryStorageFile, path:string, name:string):Promise<string>{
        try {
            const folderPath:string = nodePath.join(this.staticFolder, path);
            const filePath:string = nodePath.join(folderPath, `${name}.${this.getFilExt(file)}`);
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
    getFilExt(file:MemoryStorageFile):string{
        return file.mimetype.split("/")[1].split("+")[0];
    }
    checkMimetype(file:MemoryStorageFile, mimeType:RegExp):boolean{
        return mimeType.test(file.mimetype);
    }
};