import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { loginUserDto } from './entities/login.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Hashing } from 'src/hashing/hash';
type message = {
  message: string;
  statusCode: number;
};
@Injectable()
export class UsersService {
  constructor(@InjectModel('users') private usersModel: Model<User>) {}

  async registerUser(
    userData: CreateUserDto,
  ): Promise<Omit<User, 'password'> | message> {
    const email = userData.email;
    const user = await this.usersModel.findOne({ email });
    if (user) {
      return {
        message: 'User already exists',
        statusCode: 409,
      };
    }
    const hashPassword = await Hashing.generate(userData.password);
    userData.password = hashPassword;
    const newUser = new this.usersModel(userData);
    await newUser.save();
    const userObject = newUser.toObject();
    delete userObject.password;
    return userObject;
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
    const isPasswordMatch = await Hashing.compare(
      userData.password,
      user.password,
    );
    if (!isPasswordMatch) {
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
  async getById(id: string): Promise<Omit<User, 'password'> | message> {
    const user = await this.usersModel.findById(id);
    if (!user) {
      return {
        message: 'User not found',
        statusCode: 403,
      };
    }
    const objUser = user.toObject();
    delete objUser.password;
    return objUser;
  }
  async updateUser(
    id: string,
    newData: UpdateUserDto,
  ): Promise<Omit<User, 'password'> | message> {
    const hashPassword = await Hashing.generate(newData.password);
    newData.password = hashPassword;
    const user = await this.usersModel.findByIdAndUpdate(id, newData, {
      new: true,
    });
    if (!user) {
      return {
        message: 'Error while updating user',
        statusCode: 403,
      };
    }
    const objUser = user.toObject();
    delete objUser.password;
    return objUser;
  }
  async deleteUser(id: string): Promise<message> {
    await this.usersModel.findByIdAndDelete(id);
    return {
      message: 'user deleted successfully',
      statusCode: 200,
    };
  }
  async findOne(email: string): Promise<User> {
    return await this.usersModel.findOne({ email });
  }
}
