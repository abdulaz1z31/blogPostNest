import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type userDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  full_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true })
  email: string;
}

export const userSchema = SchemaFactory.createForClass(User);
