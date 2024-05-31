/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


@Schema()
export class Auth {
  @Prop({unique:true})
  username: string;

  @Prop({unique:true})
  email: string;

  @Prop({unique:true})
  password: string;
}
export type AuthModule = HydratedDocument<Auth>;

export const AuthSchema = SchemaFactory.createForClass(Auth);
