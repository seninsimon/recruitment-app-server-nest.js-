import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { CreateRegisterUserDto } from './dto/register-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(dto: CreateRegisterUserDto) {
    const userExists = await this.userModel.findOne({ email: dto.email });
    if (userExists) {
      throw new ConflictException('User already exists with this email');
    }

    try {
      const hashed = await bcrypt.hash(dto.password, 10);
      const createdUser = await this.userModel.create({
        ...dto,
        age: Number(dto.age), 
        password: hashed,
      });

      const { password, ...result } = createdUser.toObject();
      return result;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.userModel.findOne({ email });
    } catch (error) {
      throw new InternalServerErrorException('Database lookup failed');
    }
  }

  async findById(id: string) {
    try {
      return await this.userModel.findById(id).select('-password');
    } catch {
      throw new InternalServerErrorException('Error fetching user');
    }
  }
}
