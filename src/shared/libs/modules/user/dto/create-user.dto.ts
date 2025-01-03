import { IsEmail, IsEnum, IsString, Length, MaxLength, MinLength } from 'class-validator';
import { UserType } from '../../../../types/index.js';
import { CreateUserValidationMessage } from './create-user-validation.messages.js';

export class CreateUserDto {
  @IsString({ message: CreateUserValidationMessage.userName.invalidFormat })
  @MinLength(1, {message: CreateUserValidationMessage.userName.minLength})
  @MaxLength(15, {message: CreateUserValidationMessage.userName.maxLength})
  public userName!: string;

  @IsEmail({}, { message: CreateUserValidationMessage.email.invalidFormat })
  public email!: string;

  public avatarPath!: string;

  @IsEnum(UserType, {message: CreateUserValidationMessage.userType.invalidFormat})
  public userType!: UserType;

  @IsString({ message: CreateUserValidationMessage.password.invalidFormat })
  @Length(6, 12, { message: CreateUserValidationMessage.password.lengthField })
  public password!: string;
}
