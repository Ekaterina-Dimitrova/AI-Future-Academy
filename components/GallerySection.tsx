
import React from 'react';
import { AI_TOOLS } from '../constants';
import { ExternalLinkIcon, SparklesIcon } from './Icons';

export const GallerySection: React.FC = () => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return { bg: 'bg-blue-500', text: 'text-blue-600', lightBg: 'bg-blue-50', border: 'hover:border-blue-300' };
      case 'cyan': return { bg: 'bg-cyan-500', text: 'text-cyan-600', lightBg: 'bg-cyan-50', border: 'hover:border-cyan-300' };
      case 'purple': return { bg: 'bg-purple-500', text: 'text-purple-600', lightBg: 'bg-purple-50', border: 'hover:border-purple-300' };
      case 'indigo': return { bg: 'bg-indigo-500', text: 'text-indigo-600', lightBg: 'bg-indigo-50', border: 'hover:border-indigo-300' };
      case 'emerald': return { bg: 'bg-emerald-500', text: 'text-emerald-600', lightBg: 'bg-emerald-50', border: 'hover:border-emerald-300' };
      case 'amber': return { bg: 'bg-amber-500', text: 'text-amber-600', lightBg: 'bg-amber-50', border: 'hover:border-amber-300' };
      default: return { bg: 'bg-slate-500', text: 'text-slate-600', lightBg: 'bg-slate-50', border: 'hover:border-slate-300' };
    }
  };

  return (
    <div id="gallery" className="scroll-mt-24 mb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">AI Галерия</h2>
          <p className="text-slate-500">Полезни инструменти за твоето обучение</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {AI_TOOLS.map((tool) => {
          const theme = getColorClasses(tool.color);
          return (
            <a
              key={tool.id}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl ${theme.border} transition-all flex flex-col relative overflow-hidden`}
            >
              {/* Background Accent */}
              <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-5 transition-all duration-300 group-hover:opacity-15 group-hover:scale-125 ${theme.bg}`}></div>

              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="w-14 h-14 bg-white rounded-xl p-2.5 flex items-center justify-center border border-slate-100 group-hover:border-opacity-50 transition-all overflow-hidden shadow-sm">
                  <img 
                    src={tool.logoUrl} 
                    alt={`${tool.name} logo`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null; // Prevent infinite loop
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name)}&background=f8fafc&color=64748b&bold=true`;
                    }}
                  />
                </div>
                <div className="flex flex-col items-end gap-2">
                  <ExternalLinkIcon className={`w-4 h-4 text-slate-300 transition-colors group-hover:${theme.text}`} />
                  <div className="flex flex-wrap gap-1 justify-end">
                    {tool.tags.map(tag => (
                      <span key={tag} className="px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded text-[9px] font-bold uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <h3 className={`text-lg font-bold text-slate-900 mb-2 transition-colors group-hover:${theme.text} relative z-10`}>
                {tool.name}
              </h3>
              
              <p className="text-sm text-slate-500 mb-6 flex-grow leading-relaxed relative z-10">
                {tool.description}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50 relative z-10">
                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide ${theme.lightBg} ${theme.text}`}>
                  {tool.category}
                </span>
                <div className={`flex items-center gap-1 ${theme.text} text-xs font-bold opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0`}>
                  Отиди на сайта
                </div>
              </div>
            </a>
          );
        })}
      </div>

      <div className="mt-8 bg-brand-50 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 border border-brand-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-brand-200 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="bg-white p-3 rounded-xl shadow-sm relative z-10">
          <SparklesIcon className="w-8 h-8 text-brand-500" />
        </div>
        <div className="relative z-10">
          <h4 className="font-bold text-slate-900 mb-1">Важно напомняне!</h4>
          <p className="text-sm text-slate-600">
            Тези инструменти са създадени, за да ти помагат. Използвай ги, за да проверяваш знанията си и да генерираш идеи, но винаги прави финалния вариант сам! 🚀
          </p>
        </div>
      </div>
    </div>
  );
};
