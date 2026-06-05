'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CreateQuizPayload, ActionResponse } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function deleteQuizAction(id: string): Promise<ActionResponse> {
  try {
    const response = await fetch(`${API_URL}/quizzes/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete quiz');
    }

    revalidatePath('/quizzes');

    return {
      success: true,
    };
  } catch (error: unknown) {
    console.error('Delete quiz error:', error);

    return {
      success: false,
      error: 'Failed to delete quiz',
    };
  }
}

export async function createQuizAction(data: CreateQuizPayload): Promise<ActionResponse> {
  try {
    const response = await fetch(`${API_URL}/quizzes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create quiz');
    }

    revalidatePath('/quizzes');
  } catch (error: unknown) {
    console.error('Create quiz error:', error);

    return {
      success: false,
      error: 'Failed to create quiz',
    };
  }

  redirect('/quizzes');
}
