'use client';

import Link from 'next/link';
import { useState } from 'react';

type QuestionType = 'BOOLEAN' | 'INPUT' | 'CHECKBOX';

interface QuestionDraft {
  id: string;
  type: QuestionType;
  text: string;
  options: string[];
}

const TYPE_LABELS: Record<QuestionType, string> = {
  BOOLEAN: 'True / False',
  INPUT: 'Short answer',
  CHECKBOX: 'Multiple choice',
};

export default function CreatePage() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<QuestionDraft[]>([]);

  const addQuestion = (type: QuestionType) => {
    setQuestions((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type,
        text: '',
        options: type === 'CHECKBOX' ? ['', ''] : [],
      },
    ]);
  };

  const removeQuestion = (id: string) => setQuestions((prev) => prev.filter((q) => q.id !== id));

  const updateQuestion = (id: string, patch: Partial<QuestionDraft>) =>
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, ...patch } : q)));

  const updateOption = (qId: string, idx: number, value: string) =>
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== qId) return q;
        const options = [...q.options];
        options[idx] = value;
        return { ...q, options };
      }),
    );

  const addOption = (qId: string) =>
    setQuestions((prev) => prev.map((q) => (q.id === qId ? { ...q, options: [...q.options, ''] } : q)));

  const removeOption = (qId: string, idx: number) =>
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== qId) return q;
        return { ...q, options: q.options.filter((_, i) => i !== idx) };
      }),
    );

  return (
    <div className="container">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-text m-0">Create Quiz</h1>
        <p className="text-sm text-muted mt-1">Add a title and build your questions</p>
      </div>

      <div className="card p-5 mb-4">
        <label className="label" htmlFor="quiz-title">
          Quiz title
        </label>
        <input
          id="quiz-title"
          className="input"
          placeholder="e.g. JavaScript Basics"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {questions.length > 0 && (
        <div className="flex flex-col gap-3 mb-4">
          {questions.map((q, i) => (
            <QuestionEditor
              key={q.id}
              question={q}
              index={i}
              onUpdate={(patch) => updateQuestion(q.id, patch)}
              onRemove={() => removeQuestion(q.id)}
              onUpdateOption={(idx, val) => updateOption(q.id, idx, val)}
              onAddOption={() => addOption(q.id)}
              onRemoveOption={(idx) => removeOption(q.id, idx)}
            />
          ))}
        </div>
      )}

      <div className="card p-5 mb-6">
        <p className="label mb-3">Add question</p>
        <div className="flex gap-2 flex-wrap">
          {(['BOOLEAN', 'INPUT', 'CHECKBOX'] as QuestionType[]).map((type) => (
            <button key={type} className="btn btn-ghost text-[13px]" onClick={() => addQuestion(type)}>
              + {TYPE_LABELS[type]}
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-3">
        <Link href="/quizzes" className="btn btn-ghost">
          Cancel
        </Link>
        <button className="btn btn-primary disabled:opacity-50" disabled={!title.trim() || questions.length === 0}>
          Create Quiz
        </button>
      </div>
    </div>
  );
}

function QuestionEditor({
  question,
  index,
  onUpdate,
  onRemove,
  onUpdateOption,
  onAddOption,
  onRemoveOption,
}: {
  question: QuestionDraft;
  index: number;
  onUpdate: (patch: Partial<QuestionDraft>) => void;
  onRemove: () => void;
  onUpdateOption: (idx: number, val: string) => void;
  onAddOption: () => void;
  onRemoveOption: (idx: number) => void;
}) {
  return (
    <div className="card p-5">
      <div className="flex items-center gap-3 mb-3.5">
        <span className="w-6 h-6 rounded-full bg-muted/12 flex items-center justify-center text-xs font-semibold text-muted shrink-0">
          {index + 1}
        </span>

        <span className="text-xs font-semibold tracking-wider uppercase text-muted">{TYPE_LABELS[question.type]}</span>

        <div className="flex-1" />

        <button className="btn btn-danger py-1 px-2 text-xs" onClick={onRemove} aria-label="Remove question">
          ✕ Remove
        </button>
      </div>

      <div className="mb-3.5">
        <label className="label">Question text</label>
        <input
          className="input"
          placeholder="Enter your question…"
          value={question.text}
          onChange={(e) => onUpdate({ text: e.target.value })}
        />
      </div>

      {question.type === 'BOOLEAN' && (
        <div className="flex gap-4">
          {['True', 'False'].map((opt) => (
            <label key={opt} className="flex items-center gap-2 text-sm text-muted">
              <input type="radio" disabled className="accent-accent" />
              {opt}
            </label>
          ))}
        </div>
      )}

      {question.type === 'INPUT' && (
        <div className="h-9 rounded-md border border-dashed border-border flex items-center px-3">
          <span className="text-[13px] text-muted">Text answer field</span>
        </div>
      )}

      {question.type === 'CHECKBOX' && (
        <div className="flex flex-col gap-2">
          {question.options.map((opt, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input type="checkbox" disabled className="shrink-0 accent-accent" />
              <input
                className="input flex-1"
                placeholder={`Option ${idx + 1}`}
                value={opt}
                onChange={(e) => onUpdateOption(idx, e.target.value)}
              />
              {question.options.length > 2 && (
                <button
                  className="btn btn-danger py-1 px-1.5 shrink-0"
                  onClick={() => onRemoveOption(idx)}
                  aria-label="Remove option"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button className="btn btn-ghost self-start text-[13px] mt-1" onClick={onAddOption}>
            + Add option
          </button>
        </div>
      )}
    </div>
  );
}
