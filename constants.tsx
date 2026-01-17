
import { Topic, LearnSection, AITool, VideoResource } from './types';

export const TOPICS: Topic[] = [
  {
    id: 'intro',
    title: 'Какво е AI?',
    description: 'Разбери основите на изкуствения интелект и как той мисли.',
    icon: 'Brain',
    color: 'bg-blue-500',
    content: 'Изкуственият интелект (AI) е като компютърен мозък, който може да се учи и решава задачи. За разлика от обикновените програми, които следват точни инструкции, AI може да се адаптира и да намира решения на нови проблеми, като разглежда примери.'
  },
  {
    id: 'ml',
    title: 'Машинно обучение',
    description: 'Как компютрите се учат от данни, точно как теб в училище.',
    icon: 'Robot',
    color: 'bg-purple-500',
    content: 'Представи си, че показваш на компютър хиляди снимки на кучета и котки. С времето той сам започва да намира разликите. Това се нарича "Машинно обучение" (Machine Learning). Компютърът не знае какво е "котка", но знае как изглежда тя на пиксели!'
  },
  {
    id: 'ethics',
    title: 'Етика и Безопасност',
    description: 'Защо е важно да използваме AI отговорно и честно.',
    icon: 'Shield',
    color: 'bg-green-500',
    content: 'AI е мощен инструмент, но трябва да внимаваме. Не винаги казва истината (халюцинира) и може да бъде пристрастен. Важно е да проверяваме фактите и да не използваме AI за измама или обида на други хора.'
  },
  {
    id: 'school',
    title: 'AI в Училище',
    description: 'Как да използваш технологиите, за да учиш по-бързо и лесно.',
    icon: 'School',
    color: 'bg-orange-500',
    content: 'AI може да ти бъде помощник, а не заместник. Може да те изпитва преди контролно, да ти дава идеи за есета или да ти обяснява трудни задачи по математика.'
  }
];

export const LEARN_TIPS: LearnSection[] = [
  {
    title: "1. Обобщаване на текстове",
    content: "Имаш дълъг урок по история? Копирай текста и помоли AI: 'Направи кратко резюме на този урок в 5 точки'.",
    tips: ["Търси ключовите дати", "Поискай обяснение 'като за 5-годишен' ако е сложно"]
  },
  {
    title: "2. Генератор на тестове",
    content: "Подготвяш се за класно? Напиши на AI: 'Задай ми 10 въпроса с избираем отговор върху глаголите в българския език за 7 клас'.",
    tips: ["Опитай да отговориш сам", "Поискай верните отговори след като приключиш"]
  },
  {
    title: "3. Брейнсторминг за проекти",
    content: "Трябва да правиш презентация по биология? Попитай: 'Дай ми 3 интересни идеи за проект за опазване на околната среда'.",
    tips: ["Комбинирай идеите", "Добави нещо свое"]
  }
];

export const AI_TOOLS: AITool[] = [
  {
    id: 'gemini',
    name: 'Google Gemini',
    description: 'Мощен AI за писане, програмиране и обяснение на сложни теми.',
    url: 'https://gemini.google.com',
    logoUrl: 'https://www.vectorlogo.zone/logos/google_gemini/google_gemini-icon.svg',
    category: 'Текст',
    tags: ['Универсален', 'Безплатен'],
    color: 'blue'
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    description: 'Търсачка с AI, която дава отговори с източници. Идеална за доклади.',
    url: 'https://www.perplexity.ai',
    logoUrl: 'https://www.vectorlogo.zone/logos/perplexityai/perplexityai-icon.svg',
    category: 'Проучване',
    tags: ['Достоверност', 'Източници'],
    color: 'cyan'
  },
  {
    id: 'canva',
    name: 'Canva Magic Studio',
    description: 'AI инструменти за създаване на презентации и картинки за твоите проекти.',
    url: 'https://www.canva.com',
    logoUrl: 'https://www.vectorlogo.zone/logos/canva/canva-icon.svg',
    category: 'Изображения',
    tags: ['Дизайн', 'Презентации'],
    color: 'purple'
  },
  {
    id: 'deepl',
    name: 'DeepL Translator',
    description: 'Най-точният преводач в света, базиран на невронни мрежи.',
    url: 'https://www.deepl.com',
    logoUrl: 'https://www.vectorlogo.zone/logos/deepl/deepl-icon.svg',
    category: 'Други',
    tags: ['Езици', 'Превод'],
    color: 'indigo'
  },
  {
    id: 'khan',
    name: 'Khanmigo',
    description: 'AI тутор от Khan Academy, който ти помага да учиш стъпка по стъпка.',
    url: 'https://www.khanacademy.org/khanmigo',
    logoUrl: 'https://www.vectorlogo.zone/logos/khanacademy/khanacademy-icon.svg',
    category: 'Други',
    tags: ['Образование', 'Тутор'],
    color: 'emerald'
  },
  {
    id: 'claude',
    name: 'Claude.ai',
    description: 'AI с изключителни способности за анализ на текст и писане на есета.',
    url: 'https://claude.ai',
    logoUrl: 'https://www.vectorlogo.zone/logos/anthropic/anthropic-icon.svg',
    category: 'Текст',
    tags: ['Креативност', 'Анализ'],
    color: 'amber'
  }
];

export const VIDEO_RESOURCES: VideoResource[] = [
  {
    id: 'vid1',
    title: 'Какво е Изкуствен Интелект?',
    description: 'Разбери основите на AI с това страхотно видео.',
    youtubeId: 'tQDmJvcSlRI',
    thumbnail: 'https://img.youtube.com/vi/tQDmJvcSlRI/maxresdefault.jpg'
  },
  {
    id: 'vid2',
    title: 'Машинно обучение за деца',
    description: 'Лесно обяснение как компютрите се учат от примери.',
    youtubeId: 'VRRYb4Z1F2U',
    thumbnail: 'https://img.youtube.com/vi/VRRYb4Z1F2U/maxresdefault.jpg'
  }
];
