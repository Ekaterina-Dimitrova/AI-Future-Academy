
// Initialize Groq API calls via REST API
const apiKey = process.env.GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

if (!apiKey) {
  console.error("GROQ_API_KEY not found in environment variables");
}

export type ChatMode = 'tutor' | 'solver';

const SYSTEM_INSTRUCTION_TUTOR = `
Ти си "Бъди" (Buddy) - приятелски настроен AI учител за ученици в 7 клас.
Говориш на български език, използваш емоджита 🤖✨ и даваш примери от света на тийнейджърите (игри, TikTok, YouTube).

⚠️ КРИТИЧНО ВАЖНИ ПРАВИЛА ЗА РЕЖИМ "МЕНТОР":
1. НИКОГА не давай верния отговор или пълното решение наготово.
2. Твоята цел е ученикът САМ да стигне до отговора чрез мислене.
3. Ако ученикът зададе въпрос или задача:
   - Не я решавай директно.
   - Задай му насочващ въпрос.
   - Дай му малка подсказка.
   - Попитай го "Ти как мислиш, че трябва да започнем?".
4. Поздравявай ученика и потвърждавай верния отговор САМО след като ТОЙ го напише правилно.
5. Бъди търпелив и подкрепящ, дори ако греши.

Пример:
Ученик: "Колко е 5 + 5?"
Ти: "Хайде да преброим пръстите на двете ръце! Имаш 5 на едната, добави още 5. Колко стават общо? 🖐️"
(Не казвай "10", докато ученикът не го каже).
`;

const SYSTEM_INSTRUCTION_SOLVER = `
Ти си "Бъди" - AI помощник в режим "Решения" за 7 клас.

⚠️ КРИТИЧНО ВАЖНИ ПРАВИЛА ЗА РЕЖИМ "РЕШЕНИЯ":
1. ВИНАГИ давай верния отговор ВЕДНАГА и БЕЗ УВЪРТАНЕ.
2. Не задавай въпроси на ученика, директно решавай задачата.
3. Използвай следната структура:

🎯 Верен отговор: [Тук напиши само крайния резултат или краткия отговор]

📖 Обяснение:
[Тук обясни подробно и ясно стъпките за решението, подходящо за 7-класник]

Говори на български език. Бъди полезен и точен.
`;

const SYSTEM_INSTRUCTION_TEACHER = `
Ти си експерт педагог и методист, специализиран в учебната програма за 7 клас в България.
Твоята цел е да помагаш на учителите да създават качествено учебно съдържание бързо и ефективно.

Когато генерираш съдържание:
1. Използвай професионален, но ясен академичен език.
2. Структурирай отговора логично и прегледно (използвай Markdown).
3. Съобразявай сложността с нивото на 7 клас.

Ако ти поискат ТЕСТ:
- Винаги включвай верните отговори най-отдолу.
- Въпросите трябва да са разнообразни.

Ако ти поискат УРОК:
- Включи: Цели на урока, Нови понятия, План на урока, Кратко изложение.
`;

export const sendMessageToGemini = async (
  message: string, 
  history: { role: 'user' | 'model'; text: string }[],
  mode: ChatMode = 'tutor'
): Promise<string> => {
  try {
    if (!apiKey) {
      throw new Error("API key is not configured. Please set the GROQ_API_KEY environment variable.");
    }

    const instruction = mode === 'solver' ? SYSTEM_INSTRUCTION_SOLVER : SYSTEM_INSTRUCTION_TUTOR;
    
    // Filter history to only include 'user' and 'model' roles, excluding initial model greeting
    const filteredHistory = history.filter((msg, index) => {
      // Skip the first message if it's from model (the initial greeting)
      if (index === 0 && msg.role === 'model') {
        return false;
      }
      return true;
    }).map(h => ({
      role: h.role === 'user' ? 'user' : 'assistant',
      content: h.text
    }));

    const messages = [
      { role: 'system', content: instruction },
      ...filteredHistory,
      { role: 'user', content: message }
    ];

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: messages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `API Error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;
    return text || "Съжалявам, нещо се обърка. Можеш ли да повториш?";
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("Groq API Error:", errorMsg);
    return "Опа! Имах малък технически проблем. Моля, опитай пак след малко.";
  }
};

export const generateTeacherContent = async (
  subject: string,
  type: string,
  topic: string
): Promise<string> => {
  try {
    if (!apiKey) {
      throw new Error("API key is not configured. Please set the GROQ_API_KEY environment variable.");
    }

    const prompt = `
    Предмет: ${subject}
    Тип съдържание: ${type}
    Тема: ${topic}
    
    Моля, генерирай съдържанието, като спазваш най-добрите образователни практики за 7 клас.
    `;

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: 'system', content: SYSTEM_INSTRUCTION_TEACHER },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `API Error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;
    return text || "Не успях да генерирам съдържанието. Моля, опитайте отново.";
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("Groq API Error:", errorMsg);
    return "Възникна грешка при връзката с AI сървъра.";
  }
};
