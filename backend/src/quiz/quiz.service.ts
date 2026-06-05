import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateQuizDto } from './create-quiz.dto';
import { PaginationDto } from './pagination.dto';

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateQuizDto) {
    return await this.prisma.client.quiz.create({
      data: {
        title: dto.title,
        questions: {
          create: dto.questions.map((q) => ({
            type: q.type,
            text: q.text,
            options: q.options ?? [],
          })),
        },
      },
      include: { questions: true },
    });
  }

  async findAll(pagination: PaginationDto) {
    const page = Number(pagination.page ?? 1);
    const limit = Number(pagination.limit ?? 10);
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.prisma.client.quiz.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          createdAt: true,
          _count: { select: { questions: true } },
        },
      }),
      this.prisma.client.quiz.count(),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    };
  }

  async findOne(id: string) {
    return await this.prisma.client.quiz.findUnique({
      where: { id },
      include: { questions: true },
    });
  }

  async remove(id: string) {
    return await this.prisma.client.quiz.delete({ where: { id } });
  }
}
