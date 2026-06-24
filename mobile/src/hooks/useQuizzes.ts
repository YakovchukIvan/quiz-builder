import { useQuizzesContext } from '../context/QuizzesContext';

export function useQuizzes() {
  return useQuizzesContext();
}
