import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { postSchema } from './entities/post.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'posts', schema: postSchema }])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
