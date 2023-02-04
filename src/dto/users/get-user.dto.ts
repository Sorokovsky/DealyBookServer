import mongoose from "mongoose";
import { Folder } from "src/schemas/folder.schema";

export abstract class GetUserDto{
    readonly email?: string;
    readonly password?: string;
    readonly surname?: string;
    readonly name?: string;
    readonly nickname?: string;
    readonly avatar?: string;
    readonly _id?: mongoose.Types.ObjectId;
    readonly folders?: mongoose.Types.ObjectId[] | Folder[];
}