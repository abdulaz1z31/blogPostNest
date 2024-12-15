import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { loginUserDto } from './entities/login.entity';
import { UpdateUserDto } from './dto/update-user.dto';
type message = {
  message: string;
  statusCode: number;
};
@Injectable()
export class UsersService {
  constructor(@InjectModel('users') private usersModel: Model<User>) {}

  async registerUser(userData: CreateUserDto): Promise<User | message> {
    const email = userData.email;
    const user = await this.usersModel.findOne({ email });
    if (user) {
      return {
        message: 'User already exists',
        statusCode: 409,
      };
    }
    const newUser = new this.usersModel(userData);
    await newUser.save();
    delete newUser.password;
    return newUser;
  }
  async loginUser(userData: loginUserDto): Promise<message> {
    const email = userData.email;
    const user = await this.usersModel.findOne({ email });
    if (!user) {
      return {
        message: 'User not found',
        statusCode: 403,
      };
    }
    if (userData.password != user.password) {
      return {
        message: 'Email or password is wrong',
        statusCode: 403,
      };
    }
    return {
      message: 'Logged in successfully',
      statusCode: 200,
    };
  }
  async getAllUsers(): Promise<User[]> {
    const users = await this.usersModel.find();
    return users;
  }
  async getById(id: string): Promise<User | message> {
    const user = await this.usersModel.findById(id);
    if (!user) {
      return {
        message: 'User not found',
        statusCode: 403,
      };
    }
    return user;
  }
  async updateUser(
    id: string,
    newData: UpdateUserDto,
  ): Promise<User | message> {
    const user = await this.usersModel.findByIdAndUpdate(id, newData, {
      new: true,
    });
    if (!user) {
      return {
        message: 'Error while updating user',
        statusCode: 403,
      };
    }
    delete user.password;
    return user;
  }
  async deleteUser(id: string): Promise<message> {
    await this.usersModel.findByIdAndDelete(id);
    return {
      message: 'user deleted successfully',
      statusCode: 200,
    };
  }
}
