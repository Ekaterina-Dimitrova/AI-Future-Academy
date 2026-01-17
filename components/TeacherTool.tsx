import React, { useState } from 'react';
import { generateTeacherContent } from '../services/geminiService';
import { PenToolIcon, XIcon, SparklesIcon, BookOpenIcon, CheckCircleIcon } from './Icons';

interface TeacherToolProps {
  onClose: () => void;
}

const SUBJECTS = [
  'Математика',
  'Български език и Литература',
  'Физика и Астрономия',
  'Химия и Опазване на околната среда',
  'Биология и Здравно образование',
  'География и Икономика',
  'История и Цивилизации',
  'Информационни технологии'
];

const CONTENT_TYPES = [
  { id: 'lesson', label: 'План-конспект на урок', icon: '📝' },
  { id: 'quiz', label: 'Тест (Затворени въпроси)', icon: '✅' },
  { id: 'open', label: 'Въпроси за дискусия (Отворени)', icon: '🗣️' }
];

export const TeacherTool: React.FC<TeacherToolProps> = ({ onClose }) => {
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [contentType, setContentType] = useState(CONTENT_TYPES[0].id);
  const [topic, setTopic] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    
    setIsLoading(true);
    setGeneratedContent('');
    
    const selectedTypeLabel = CONTENT_TYPES.find(t => t.id === contentType)?.label || contentType;
    
    try {
      const content = await generateTeacherContent(subject, selectedTypeLabel, topic);
      setGeneratedContent(content);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    // Could add a toast notification here
    alert("Съдържанието е копирано!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-4xl h-[90vh] rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        
        {/* Sidebar Controls */}
        <div className="w-full md:w-1/3 bg-slate-50 border-r border-slate-200 p-6 flex flex-col overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-lg">
              <PenToolIcon className="w-6 h-6" />
              <span>Учителски хъб</span>
            </div>
            <button onClick={onClose} className="md:hidden p-1 text-slate-500">
              <XIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6 flex-grow">
            {/* Subject Select */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Предмет</label>
              <select 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
              >
                {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Type Select */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Тип съдържание</label>
              <div className="grid grid-cols-1 gap-2">
                {CONTENT_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setContentType(type.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
                      contentType === type.id 
                        ? 'bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500 text-indigo-900' 
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="text-xl">{type.icon}</span>
                    <span className="font-medium text-sm">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Тема на урока/теста</label>
              <textarea 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Напр. Питагорова теорема, Въстанието на Асен и Петър, Строеж на атома..."
                className="w-full p-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[100px] resize-none outline-none"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={!topic.trim() || isLoading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Генериране...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5" />
                  Генерирай
                </>
              )}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="w-full md:w-2/3 bg-white flex flex-col h-full relative">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 hidden md:block p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
          >
            <XIcon className="w-6 h-6" />
          </button>

          <div className="flex-grow overflow-y-auto p-8">
            {!generatedContent && !isLoading ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <PenToolIcon className="w-10 h-10 opacity-30" />
                </div>
                <p className="text-lg font-medium">Въведи тема и натисни бутона, за да създадеш съдържание</p>
                <p className="text-sm mt-2 max-w-md text-center">AI ще създаде структуриран план или тест, съобразен с изискванията за 7 клас.</p>
              </div>
            ) : (
              <div className="prose prose-indigo max-w-none">
                {generatedContent.split('\n').map((line, i) => (
                  <p key={i} className="whitespace-pre-wrap">{line}</p>
                ))}
              </div>
            )}
          </div>

          {generatedContent && (
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
               <button 
                onClick={copyToClipboard}
                className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                Копирай текста
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};