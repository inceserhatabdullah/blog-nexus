import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignupDTO {
  @IsString()
  @IsEmail({}, { message: 'Email is not valid.' })
  @IsNotEmpty({ message: 'Email is required.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required.' })
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  // TODO: strong password validator
  password: string;
}