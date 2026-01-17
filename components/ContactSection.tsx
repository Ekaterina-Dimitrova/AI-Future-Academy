import React, { useState } from 'react';
import { SendIcon, MapPinIcon } from './Icons';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Log form data to console for development
      console.log('Contact Form Submission:', {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: new Date().toISOString(),
      });

      // Simulate sending
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Show success
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMsg);
      console.error('Form Error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className="scroll-mt-24 mb-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Свържи се с нас</h2>
        <p className="text-slate-500">Имаш въпроси или предложения? Пиши ни!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Form Container */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Твоето име</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Иван Иванов"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:bg-white outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Имейл адрес</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="ivan@example.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:bg-white outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Съобщение</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Как можем да ти помогнем?"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:bg-white outline-none transition-all resize-none"
              ></textarea>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
                submitted 
                  ? 'bg-emerald-500 text-white shadow-emerald-200' 
                  : error ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-200' : 'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-200'
              }`}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : submitted ? (
                <>Съобщението е изпратено! 🎉</>
              ) : (
                <>
                  Изпрати съобщение
                  <SendIcon className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Map Container */}
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm flex flex-col">
          <div className="p-6 border-b border-slate-50">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-brand-50 text-brand-600 rounded-lg flex items-center justify-center shrink-0">
                <MapPinIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">НПМГ "Акад. Любомир Чакалов"</h3>
                <p className="text-sm text-slate-500">ул. „Бигла“ 52, 1164 ж.к. Лозенец, София</p>
              </div>
            </div>
          </div>
          <div className="flex-grow min-h-[400px] relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2685.2820413361933!2d23.327614175646215!3d42.670560315429185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa8452cb5c33eb%3A0x558121dba76dc356!2z0J3QsNGG0LjQvtC90LDQu9C90LAg0L_RgNC40YDQvtC00L4t0LzQsNGC0LXQvNCw0YLQuNGH0LXRgdC60LAg0LPQuNC80L3QsNC30LjRjyDigJ7QkNC60LDQtC4g0JvRjtCx0L7QvNC40YAg0KfQsNC60LDQu9C-0LLigJw!5e1!3m2!1sbg!2sbg!4v1767704273692!5m2!1sbg!2sbg"
              className="absolute inset-0 w-full h-full border-0 grayscale-[0.3] contrast-[1.1]"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};