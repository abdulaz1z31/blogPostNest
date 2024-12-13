import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  post_id: string;
}
