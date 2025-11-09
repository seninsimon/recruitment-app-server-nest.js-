import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: CreateUserDto) {
    console.log(Body)
    return this.userService.create(dto);
  }
}
