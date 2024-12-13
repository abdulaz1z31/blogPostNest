import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(2)
  first_name: string;

  @IsNotEmpty()
  @MinLength(2)
  last_name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
