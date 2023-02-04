import mongoose from "mongoose";

export abstract class GetUserDto{
    readonly email?: string;
    readonly password?: string;
    readonly surname?: string;
    readonly name?: string;
    readonly nickname?: string;
    readonly avatar?: string;
    readonly _id?: mongoose.Types.ObjectId;
}