import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Message } from './message.schema';
export type FolderDocument = HydratedDocument<Folder>;
@Schema()
export class Folder {
    @Prop({required: true})
    name: string;
    @Prop({required:true, type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}]})
    messages: Message[]
};

export const FolderSchema = SchemaFactory.createForClass(Folder);