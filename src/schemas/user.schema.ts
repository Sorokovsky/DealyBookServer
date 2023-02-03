import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<User>;
@Schema()
export class User {
  @Prop({unique: true, index:true, required: true})
  email: string;
  @Prop({required: true})
  password: string;
  @Prop({required: true})
  surname:string;
  @Prop({required: true})
  name: string;
  @Prop({default():string{return `${this.surname} ${this.name}`}})
  nickname: string;
  @Prop()
  avatar: string;
  @Prop()
  refreshToken:string;
};

export const UserSchema = SchemaFactory.createForClass(User);