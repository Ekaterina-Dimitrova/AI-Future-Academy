import React from 'react';
import { SparklesIcon, ArrowRightIcon } from './Icons';

interface HeroProps {
  onStart: () => void;
  onChat: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart, onChat }) => {
  return (
    <div className="relative overflow-hidden bg-white rounded-3xl p-8 md:p-12 mb-8 shadow-sm border border-slate-100">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-brand-100 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-accent-100 rounded-full blur-3xl opacity-60"></div>
      
      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-sm font-medium mb-6">
          <SparklesIcon className="w-4 h-4" />
          <span>Образование на бъдещето</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
          Учи умно с помощта на <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-accent-600">Изкуствения Интелект</span>
        </h1>
        
        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
          Добре дошли в AI Academy за 7 клас. Тук ще разбереш как работи AI, как да го използваш безопасно и как той може да ти помогне да станеш супер ученик!
        </p>
        
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={onStart}
            className="group px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-brand-500/30 flex items-center gap-2"
          >
            Започни да учиш
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={onChat}
            className="px-6 py-3 bg-white text-slate-700 hover:text-brand-600 hover:bg-slate-50 font-semibold rounded-xl border border-slate-200 transition-all flex items-center gap-2"
          >
            Чат с AI Учител
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          </button>
        </div>
      </div>
    </div>
  );
};