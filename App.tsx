import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { TopicCard } from './components/TopicCard';
import { ChatInterface } from './components/ChatInterface';
import { TopicModal } from './components/TopicModal';
import { LearnSectionCard } from './components/LearnSection';
import { TeacherTool } from './components/TeacherTool';
import { GallerySection } from './components/GallerySection';
import { VideoSection } from './components/VideoSection';
import { ContactSection } from './components/ContactSection';
import { TOPICS, LEARN_TIPS } from './constants';
import { Topic } from './types';
import { RobotIcon, PenToolIcon, GridIcon } from './components/Icons';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTeacherToolOpen, setIsTeacherToolOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      {/* Navigation */}
      <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-brand-600 p-1.5 rounded-lg">
                <RobotIcon className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">AI Future Academy</span>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <button 
                onClick={() => scrollToSection('topics')}
                className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors hidden sm:block"
              >
                Уроци
              </button>
              
              <button 
                onClick={() => scrollToSection('gallery')}
                className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors hidden sm:block"
              >
                Галерия
              </button>

              <button 
                onClick={() => scrollToSection('videos')}
                className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors hidden sm:block"
              >
                Видео
              </button>

              <button 
                onClick={() => scrollToSection('contact')}
                className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors hidden sm:block"
              >
                Контакт
              </button>

              <div className="h-6 w-px bg-slate-300 hidden sm:block mx-1"></div>

              {/* Teacher Button */}
              <button 
                onClick={() => setIsTeacherToolOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors text-sm font-medium"
              >
                <PenToolIcon className="w-4 h-4" />
                <span className="hidden md:inline">Учителски хъб</span>
              </button>

              {/* Student Chat Button */}
              <button 
                onClick={() => setIsChatOpen(true)}
                className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
              >
                Чат с Бъди
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <Hero 
          onStart={() => scrollToSection('topics')} 
          onChat={() => setIsChatOpen(true)} 
        />

        {/* Topics Grid */}
        <div id="topics" className="mb-16 scroll-mt-24">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Основни теми</h2>
              <p className="text-slate-500">Започни своето пътешествие в света на AI</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOPICS.map((topic) => (
              <TopicCard 
                key={topic.id} 
                topic={topic} 
                onClick={setSelectedTopic} 
              />
            ))}
          </div>
        </div>

        {/* Gallery Section - Tools */}
        <GallerySection />

        {/* Video Section */}
        <VideoSection />

        {/* How to Learn Section */}
        <div id="tips" className="mb-16 scroll-mt-24">
           <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
             {/* Background decoration */}
             <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
             
             <div className="relative z-10">
               <h2 className="text-3xl font-bold mb-4">Как да учим с AI?</h2>
               <p className="text-slate-300 mb-10 max-w-2xl text-lg">
                 Изкуственият интелект не е тук, за да ти пише домашните, а за да ти помогне да ги разбереш по-добре. Ето няколко супер трика:
               </p>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-900">
                 {LEARN_TIPS.map((section, idx) => (
                   <LearnSectionCard key={idx} section={section} />
                 ))}
               </div>
             </div>
           </div>
        </div>

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 mb-2">© 2025 AI Future Academy.</p>
          <p className="text-xs text-slate-400">IT Znayko - Първи кръг</p>
        </div>
      </footer>

      {/* Modals & Overlays */}
      {isChatOpen && <ChatInterface onClose={() => setIsChatOpen(false)} />}
      {isTeacherToolOpen && <TeacherTool onClose={() => setIsTeacherToolOpen(false)} />}
      <TopicModal topic={selectedTopic} onClose={() => setSelectedTopic(null)} />
    </div>
  );
}

export default App;