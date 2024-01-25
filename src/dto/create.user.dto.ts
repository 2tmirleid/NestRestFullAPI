import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {

  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: "Uncorrected email" })
  readonly email: string;

  @IsString({ message: 'Email must be a string' })
  @Length(4, 16, { message: 'Can\'t be smaller than 4 and greater than 16 symbols' })
  readonly password: string;
}