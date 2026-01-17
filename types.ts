export interface Topic {
  id: string;
  title: string;
  description: string;
  icon: string; // Icon name
  color: string;
  content: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export type ViewState = 'home' | 'learn' | 'tutor';

export interface LearnSection {
  title: string;
  content: string;
  tips: string[];
}

export interface AITool {
  id: string;
  name: string;
  description: string;
  url: string;
  logoUrl: string;
  category: 'Текст' | 'Изображения' | 'Проучване' | 'Други';
  tags: string[];
  color: string;
}

export interface VideoResource {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  thumbnail: string;
}