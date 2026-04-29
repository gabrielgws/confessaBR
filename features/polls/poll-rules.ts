import type { PositivePollCategory } from '@/types/polls';

export const positivePollCategories: { value: PositivePollCategory; label: string }[] = [
  { value: 'admiration', label: 'Admiracao' },
  { value: 'gratitude', label: 'Gratidao' },
  { value: 'support', label: 'Apoio' },
  { value: 'fun', label: 'Leveza' },
  { value: 'custom', label: 'Personalizada' },
];

export function validatePositivePollDraft(input: {
  question: string;
  category: PositivePollCategory;
  options: string[];
}) {
  const options = input.options.map((option) => option.trim()).filter(Boolean);

  if (!input.question.trim()) {
    return 'Informe a pergunta do poll.';
  }

  if (input.category === 'custom' && input.question.trim().length > 120) {
    return 'Perguntas personalizadas devem ter ate 120 caracteres.';
  }

  if (options.length < 2) {
    return 'Informe pelo menos duas opcoes positivas.';
  }

  return null;
}
