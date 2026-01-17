import React, { useState, useEffect, useRef } from 'react';
import { Message } from '../types';
import { sendMessageToGemini, ChatMode } from '../services/geminiService';
import { SendIcon, RobotIcon, XIcon, SparklesIcon, CheckCircleIcon, BrainIcon } from './Icons';

interface ChatInterfaceProps {
  onClose: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: 'Здравей! Аз съм твоят AI помощник "Бъди". Избери режим "Ментор", за да учим заедно, или "Решения", ако ти трябва верният отговор веднага! 🚀',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<ChatMode>('tutor');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const responseText = await sendMessageToGemini(userMessage.text, history, mode);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl h-[600px] max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-brand-500 to-accent-600 text-white shadow-md relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30">
                <RobotIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Бъди (AI Tutor)</h3>
                <div className="flex items-center gap-1.5 opacity-90 text-xs font-medium">
                  <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]"></span>
                  Онлайн
                </div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <XIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Mode Toggle */}
          <div className="bg-black/10 p-1 rounded-xl flex gap-1">
            <button 
              onClick={() => setMode('tutor')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                mode === 'tutor' 
                  ? 'bg-white text-brand-600 shadow-sm' 
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <BrainIcon className="w-4 h-4" />
              Ментор
            </button>
            <button 
              onClick={() => setMode('solver')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                mode === 'solver' 
                  ? 'bg-white text-accent-600 shadow-sm' 
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <CheckCircleIcon className="w-4 h-4" />
              Решения
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 no-scrollbar">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-4 rounded-2xl shadow-sm transition-all duration-200 ${
                  msg.role === 'user' 
                    ? 'bg-brand-600 text-white rounded-br-none' 
                    : mode === 'solver' && msg.role === 'model' // Style hint for solver mode responses
                      ? 'bg-white text-slate-800 border-l-4 border-accent-500 rounded-bl-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                }`}
              >
                <div className="text-sm md:text-base whitespace-pre-wrap leading-relaxed">{msg.text}</div>
                <div className={`text-[10px] mt-2 ${msg.role === 'user' ? 'text-brand-100' : 'text-slate-400'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-2xl rounded-bl-none border border-slate-200 shadow-sm flex items-center gap-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-xs text-slate-500">
                  {mode === 'tutor' ? 'Бъди мисли...' : 'Бъди решава задачата...'}
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-slate-100">
          <div className="relative flex items-center gap-2">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={mode === 'tutor' ? "Попитай за насоки..." : "Постави условието на задачата..."}
              className="w-full bg-slate-100 border-0 rounded-xl px-4 py-3 pr-12 text-slate-900 focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all resize-none h-[50px] max-h-[120px]"
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim() || isLoading}
              className={`absolute right-2 p-2 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
                mode === 'tutor' ? 'bg-brand-600 hover:bg-brand-700' : 'bg-accent-600 hover:bg-accent-700'
              }`}
            >
              <SendIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="text-center mt-2">
            <p className="text-xs text-slate-400 flex items-center justify-center gap-1">
              <SparklesIcon className="w-3 h-3" />
              {mode === 'tutor' 
                ? 'Режим Ментор: Помага ти да разбереш материала.' 
                : 'Режим Решения: Дава верен отговор и обяснение.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};