import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Model } from 'mongoose';
import { Posts } from './entities/post.entity';
import { InjectModel } from '@nestjs/mongoose';
type message = {
  message: string;
  statusCode: number;
};
@Injectable()
export class PostsService {
  constructor(@InjectModel('posts') private postsModel: Model<Posts>) {}
  async create(createPostDto: CreatePostDto): Promise<Posts> {
    const newPost = new this.postsModel(createPostDto);
    await newPost.save();
    return newPost;
  }

  async findAll(): Promise<Posts[] | message> {
    const posts = await this.postsModel.find();
    if (posts.length == 0) {
      return {
        message: 'Posts not found',
        statusCode: 200,
      };
    }
    return posts;
  }

  async findOne(id: string): Promise<Posts | message> {
    const post = await this.postsModel.findById(id);
    if (!post) {
      return {
        message: 'Post not found',
        statusCode: 403,
      };
    }
    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return await this.postsModel.findByIdAndUpdate(id, updatePostDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<message> {
    await this.postsModel.findByIdAndDelete(id);
    return {
      message: 'Deleted successfully',
      statusCode: 200,
    };
  }
}
