import React, { useState } from 'react';
import { X, Check, Sparkles, BookOpen } from 'lucide-react';
import { LANGUAGES, TRACK_CATEGORIES } from '../data/languagesData';
import { sound } from '../utils/audio';

export const LanguageSelectorModal = ({
  isOpen,
  onClose,
  currentLanguage,
  onSelectLanguage
}) => {
  if (!isOpen) return null;

  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTracks =
    activeCategory === 'all'
      ? LANGUAGES
      : LANGUAGES.filter((l) => l.category === activeCategory);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md select-none animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-xl rounded-3xl border-4 border-[#e5e5e5] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">⚡</span>
            <div>
              <h3 className="text-xl font-black">Choose Your CodLingo Track</h3>
              <p className="text-xs text-emerald-100 font-bold">
                Languages, Data Structures & Algorithms, and Placement Aptitude
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="p-2.5 bg-gray-100 border-b border-gray-200 flex items-center gap-1.5 overflow-x-auto">
          {TRACK_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playPop();
                  setActiveCategory(cat.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Track Grid */}
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto">
          {filteredTracks.map((lang) => {
            const isSelected = lang.id === currentLanguage;
            return (
              <button
                key={lang.id}
                onClick={() => {
                  sound.playPop();
                  onSelectLanguage(lang.id);
                  onClose();
                }}
                className={`p-3.5 rounded-2xl border-2 text-left flex items-start gap-3 transition-all cursor-pointer relative group ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50/70 shadow-sm'
                    : 'border-gray-200 hover:border-emerald-300 hover:bg-gray-50'
                }`}
              >
                {/* Emoji / Symbol */}
                <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 shadow-xs flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform">
                  <span>{lang.emoji}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-gray-800 text-sm">{lang.name}</h4>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-bold text-gray-500 line-clamp-2 mt-0.5 leading-snug">
                    {lang.tagline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-gray-50 border-t border-gray-200 text-center">
          <p className="text-xs font-bold text-gray-500">
            🔥 Your streak, hearts & gems are shared across all 10 tracks!
          </p>
        </div>
      </div>
    </div>
  );
};
