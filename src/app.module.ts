import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { PostsModule } from './posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    CommentsModule,
    PostsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/lesson69'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
