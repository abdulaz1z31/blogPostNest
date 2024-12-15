import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Comments } from './entities/comment.entity';
type message = {
  message: string;
  statusCode: number;
};
@Injectable()
export class CommentsService {
  constructor(
    @InjectModel('comments') private commentsModel: Model<Comments>,
  ) {}
  async create(createCommentDto: CreateCommentDto): Promise<Comments> {
    const newComment = new this.commentsModel(createCommentDto);
    await newComment.save();
    return newComment;
  }

  async findAll(): Promise<Comments[] | message> {
    const comments = await this.commentsModel.find();
    if (comments.length == 0) {
      return {
        message: 'Comments not found',
        statusCode: 200,
      };
    }
    return comments;
  }

  async findOne(id: string): Promise<Comments | message> {
    const comment = await this.commentsModel.findById(id);
    if (!comment) {
      return {
        message: 'Comment not found',
        statusCode: 403,
      };
    }
    return comment;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    return await this.commentsModel.findByIdAndUpdate(id, updateCommentDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<message> {
    await this.commentsModel.findByIdAndDelete(id);
    return {
      message: 'Deleted successfully',
      statusCode: 200,
    };
  }
}
