import { IsEmail, IsNotEmpty, MinLength, IsNumberString, Length } from 'class-validator';

export class CreateRegisterUserDto {
  @IsEmail({}, { message: 'Email is not valid' })
  email: string;

  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  @IsNumberString({}, { message: 'Age must be a number' })
  @IsNotEmpty({ message: 'Age is required' })
  age: string;

  @IsNotEmpty({ message: 'City is required' })
  city: string;

  @IsNotEmpty({ message: 'State is required' })
  state: string;

  @IsNumberString({}, { message: 'Pincode must be a number' })
  @Length(6, 6, { message: 'Pincode must be 6 digits' })
  pincode: string;

  @IsNumberString({}, { message: 'Phone must be a number' })
  @Length(10, 10, { message: 'Phone must be 10 digits' })
  phone: string;
}
