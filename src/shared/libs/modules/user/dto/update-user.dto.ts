import { IsEmail, IsEnum, IsOptional, IsString, Length, MaxLength, MinLength } from 'class-validator';
import { UserType } from '../../../../types/index.js';
import { CreateUserValidationMessage } from './create-user-validation.messages.js';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail({}, { message: CreateUserValidationMessage.email.invalidFormat })
  public email?: string;

  @IsOptional()
  @IsString({ message: CreateUserValidationMessage.userName.invalidFormat })
  @MinLength(1, {message: CreateUserValidationMessage.userName.minLength})
  @MaxLength(15, {message: CreateUserValidationMessage.userName.maxLength})
  public username?: string;

  @IsOptional()
  public avatarPath?: string;

  @IsOptional()
  @IsString({ message: CreateUserValidationMessage.password.invalidFormat })
  @Length(6, 12, { message: CreateUserValidationMessage.password.lengthField })
  public password?: string;

  @IsOptional()
  @IsEnum(UserType, {message: CreateUserValidationMessage.userType.invalid})
  public userType?: UserType;
}
