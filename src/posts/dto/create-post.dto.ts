import { IsNotEmpty, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  @MinLength(2)
  content: string;

  @IsNotEmpty()
  @MinLength(2)
  title: string;

  @IsNotEmpty()
  slug: string;
}
