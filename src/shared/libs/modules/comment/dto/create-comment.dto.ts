import { IsMongoId, IsNumber, IsString, Length, Max, Min } from 'class-validator';
import { CreateCommentMessages } from './create-comment-validation.messages.js';

export class CreateCommentDto {
  @IsString({ message: CreateCommentMessages.text.invalidFormat })
  @Length(5, 1024, { message: 'min is 5, max is 1024 '})
  public text!: string;

  @IsMongoId({ message: CreateCommentMessages.offerId.invalidFormat })
  public offerId!: string;

  @IsMongoId({ message: CreateCommentMessages.userId.invalidFormat })
  public userId!: string;

  @IsNumber({}, {message: CreateCommentMessages.rating.invalidFormat})
  @Min(1, {message: CreateCommentMessages.rating.minValue})
  @Max(5, {message: CreateCommentMessages.rating.maxValue})
  public rating!: number;
}
