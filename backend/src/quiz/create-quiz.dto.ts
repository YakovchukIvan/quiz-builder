import { IsString, IsArray, IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionType } from '@/generated/prisma/enums';

export class CreateQuestionDto {
  @IsEnum(QuestionType)
  type: QuestionType;

  @IsString()
  text: string;

  @IsOptional()
  @IsArray()
  options?: string[];
}

export class CreateQuizDto {
  @IsString()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}
