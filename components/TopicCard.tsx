import React from 'react';
import { Topic } from '../types';
import { BrainIcon, RobotIcon, SchoolIcon, BookOpenIcon, ArrowRightIcon } from './Icons';

interface TopicCardProps {
  topic: Topic;
  onClick: (topic: Topic) => void;
}

const getIcon = (iconName: string, className: string) => {
  switch (iconName) {
    case 'Brain': return <BrainIcon className={className} />;
    case 'Robot': return <RobotIcon className={className} />;
    case 'School': return <SchoolIcon className={className} />;
    case 'Shield': return <BookOpenIcon className={className} />; // Using BookOpen as generic for now
    default: return <BrainIcon className={className} />;
  }
};

export const TopicCard: React.FC<TopicCardProps> = ({ topic, onClick }) => {
  return (
    <div 
      className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col h-full"
      onClick={() => onClick(topic)}
    >
      <div className={`w-12 h-12 ${topic.color} rounded-xl flex items-center justify-center text-white mb-4 shadow-sm group-hover:scale-110 transition-transform`}>
        {getIcon(topic.icon, "w-6 h-6")}
      </div>
      
      <h3 className="text-xl font-bold text-slate-900 mb-2">{topic.title}</h3>
      <p className="text-slate-500 text-sm mb-4 flex-grow">{topic.description}</p>
      
      <div className="flex items-center text-brand-600 font-medium text-sm mt-auto">
        Научи повече
        <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};