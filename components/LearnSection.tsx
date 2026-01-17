import React from 'react';
import { LearnSection as LearnSectionType } from '../types';
import { BookOpenIcon } from './Icons';

interface LearnSectionProps {
  section: LearnSectionType;
}

export const LearnSectionCard: React.FC<LearnSectionProps> = ({ section }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-accent-50 text-accent-600 rounded-lg">
          <BookOpenIcon className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-lg text-slate-800">{section.title}</h3>
      </div>
      
      <p className="text-slate-600 mb-6 flex-grow">{section.content}</p>
      
      <div className="bg-slate-50 rounded-xl p-4">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Съвет:</p>
        <ul className="space-y-2">
          {section.tips.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
              <span className="text-brand-500 font-bold">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};