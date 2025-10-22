export interface Category {
  id: number;
  name: string;
}

export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface CategoriesResponse {
  trivia_categories: Category[];
}

export interface QuestionsResponse {
  response_code: number;
  results: Question[];
}

export interface CachedData {
  categories: CategoriesResponse;
  questions: QuestionsResponse;
  timestamp: number;
}
