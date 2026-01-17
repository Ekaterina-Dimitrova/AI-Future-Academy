
import React, { useState, useEffect } from 'react';
import { VIDEO_RESOURCES } from '../constants';

export const VideoSection: React.FC = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  return (
    <div id="videos" className="scroll-mt-24 mb-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Видео уроци</h2>
        <p className="text-slate-500">Научи повече чрез видео съдържание</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {VIDEO_RESOURCES.map((video) => (
          <div key={video.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm group hover:shadow-xl transition-all duration-300">
            <div className="aspect-video relative bg-slate-200 overflow-hidden cursor-pointer" onClick={() => setPlayingId(video.id)}>
              {playingId === video.id ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&origin=${encodeURIComponent(origin)}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              ) : (
                <>
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay Play Button */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-white transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-brand-600 ml-1">
                        <path d="m7 3 14 9-14 9V3Z" />
                      </svg>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                {video.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {video.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
