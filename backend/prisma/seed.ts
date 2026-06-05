/* eslint-disable no-console */
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, QuestionType } from '@/generated/prisma/client';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('❌ DATABASE_URL environment variable is missing.');
  process.exit(1);
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting the database seed...');

  await prisma.question.deleteMany();
  await prisma.quiz.deleteMany();

  const quizzesData = Array.from({ length: 100 }).map((_, index) => ({
    title: `Test quiz #${index + 1}: Knowledge test`,
    questions: {
      create: [
        {
          type: QuestionType.BOOLEAN,
          text: 'Is TypeScript a superset of JavaScript?',
          options: ['Yes', 'No'],
        },
        {
          type: QuestionType.INPUT,
          text: 'Which array method adds an element to the end?',
        },
        {
          type: QuestionType.CHECKBOX,
          text: 'Which of these technologies are relational databases?',
          options: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis'],
        },
      ],
    },
  }));

  console.log('Creating 100 quizzes and their questions...');

  for (const quiz of quizzesData) {
    await prisma.quiz.create({ data: quiz });
  }

  console.log('✅ Seed completed successfully! 100 quizzes added.');
}

main()
  .catch((e: unknown) => {
    if (e instanceof Error) {
      console.error('❌ Error during seed:', e.message);
    } else {
      console.error('❌ Unknown error during seed:', e);
    }
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
