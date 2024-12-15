import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type commentDocument = HydratedDocument<Comments>;

@Schema()
export class Comments {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }] })
  user_id: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comments' }] })
  post_id: string;
}

export const commentSchema = SchemaFactory.createForClass(Comments);
