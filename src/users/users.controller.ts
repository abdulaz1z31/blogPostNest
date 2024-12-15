import { CreateUserDto } from './dto/create-user.dto';
import { loginUserDto } from './entities/login.entity';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('register')
  async registerUser(@Body() userData: CreateUserDto) {
    return await this.usersService.registerUser(userData);
  }
  @Post('login')
  async loginUser(@Body() userData: loginUserDto) {
    return await this.usersService.loginUser(userData);
  }
  @Get()
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }
  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.usersService.getById(id);
  }
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() newData: CreateUserDto) {
    return await this.usersService.updateUser(id, newData);
  }
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.deleteUser(id);
  }
}
