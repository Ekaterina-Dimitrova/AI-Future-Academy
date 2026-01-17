import React from 'react';
import { Topic } from '../types';
import { XIcon } from './Icons';

interface TopicModalProps {
  topic: Topic | null;
  onClose: () => void;
}

export const TopicModal: React.FC<TopicModalProps> = ({ topic, onClose }) => {
  if (!topic) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div 
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-slate-100 rounded-full transition-colors z-10"
        >
          <XIcon className="w-6 h-6 text-slate-600" />
        </button>

        <div className={`h-32 ${topic.color} flex items-center justify-center`}>
           {/* Icon would go here if we wanted a big one, but purely decorative header looks nice */}
           <div className="text-white opacity-20 transform scale-[3]">
             {/* Simple shape for background interest */}
             <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor">
               <circle cx="50" cy="50" r="40" />
             </svg>
           </div>
        </div>

        <div className="p-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{topic.title}</h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              {topic.content}
            </p>
            
            <div className="bg-slate-50 p-4 rounded-xl border-l-4 border-brand-500">
              <h4 className="font-bold text-slate-900 mb-2">Знаеш ли че?</h4>
              <p className="text-sm text-slate-600">
                Можеш да попиташ нашия AI учител "Бъди" за повече примери, свързани с {topic.title.toLowerCase()}!
              </p>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button 
              onClick={onClose}
              className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors"
            >
              Разбрах
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};