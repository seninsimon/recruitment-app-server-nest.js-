import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(dto: CreateUserDto) {
    try {
      const hashed = await bcrypt.hash(dto.password, 10);
      const createdUser = await this.userModel.create({
        ...dto,
        password: hashed,
      });
      const { password, ...result } = createdUser.toObject();
      return result;
    } catch (error) {
        console.log("error",error)
        throw error
    }
  }
}
