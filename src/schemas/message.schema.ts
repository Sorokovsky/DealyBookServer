import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type MessageDocument = HydratedDocument<Message>;
export enum MessageTypes{
    TEXT="TEXT",
    FILE="FILE"
}
@Schema()
export class Message {
  @Prop({required: true})
  type: MessageTypes;
  @Prop({required: true})
  data: string;
  @Prop({required: true})
  date: string
};

export const MessageSchema = SchemaFactory.createForClass(Message);