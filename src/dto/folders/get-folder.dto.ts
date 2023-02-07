import mongoose from "mongoose";
import { Folder } from "src/schemas/folder.schema";

export abstract class GetFolderDto extends Folder{
    readonly _id: mongoose.Types.ObjectId;
}