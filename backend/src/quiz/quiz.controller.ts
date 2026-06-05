import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './create-quiz.dto';
import { PaginationDto } from './pagination.dto';

@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  create(@Body() dto: CreateQuizDto) {
    return this.quizService.create(dto);
  }

  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.quizService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizService.remove(id);
  }
}
