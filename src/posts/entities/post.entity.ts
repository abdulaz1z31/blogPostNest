import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type postDocument = HydratedDocument<Posts>;

@Schema()
export class Posts {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }] })
  user_id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  slug: string;
}

export const postSchema = SchemaFactory.createForClass(Posts);
