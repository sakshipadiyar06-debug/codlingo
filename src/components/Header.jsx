import React from 'react';
import { Flame, Heart, Gem, Volume2, VolumeX, Clock, ChevronDown, User } from 'lucide-react';
import { sound } from '../utils/audio';
import { AVATARS } from '../utils/authManager';

export const Header = ({
  userState,
  currentLangInfo,
  onOpenLanguageSelector,
  onOpenStreakModal,
  onOpenShop,
  onOpenDevTraveler,
  onOpenAuthModal,
  soundMuted,
  onToggleSound
}) => {
  const currentAvatar = AVATARS.find((a) => a.id === userState.avatar) || AVATARS[0];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-3 border-[#e5e5e5] px-3 sm:px-5 py-2.5 shadow-xs">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Left Side: Logo & Course Selector */}
        <div className="flex items-center gap-2 sm:gap-3.5">
          {/* CodLingo Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => sound.playPop()}
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#58cc02] via-[#61e002] to-[#7ceb26] flex items-center justify-center text-white font-black text-xl shadow-[0_3px_0_#46a302] group-hover:scale-105 group-hover:rotate-3 transition-transform">
              <span>⚡</span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl sm:text-2xl tracking-tight text-[#46a302] leading-none drop-shadow-xs">
                CodLingo
              </span>
              <span className="text-[9px] uppercase font-black text-emerald-600 tracking-wider">
                Daily Streaks & Code
              </span>
            </div>
          </div>

          {/* Course / Language Switcher Button */}
          <button
            onClick={() => {
              sound.playPop();
              onOpenLanguageSelector();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border-2 border-emerald-300 bg-emerald-50 hover:bg-emerald-100/80 transition-all cursor-pointer group shadow-[0_2px_0_#a7f3d0]"
            title="Switch Language Course"
          >
            <span className="text-xl leading-none">{currentLangInfo.emoji}</span>
            <span className="font-black text-emerald-900 text-xs sm:text-sm">
              {currentLangInfo.name}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-emerald-700 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Right Side: Streak, Gems, Hearts, User Profile & Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* User Profile / Account Switcher */}
          <button
            onClick={() => {
              sound.playPop();
              onOpenAuthModal();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl border-2 border-purple-200 bg-purple-50/70 hover:bg-purple-100 transition-all cursor-pointer shadow-[0_2px_0_#e9d5ff]"
            title="User Profile / Switch Account"
          >
            <span className="text-base leading-none">{currentAvatar.emoji}</span>
            <span className="hidden md:inline font-black text-purple-900 text-xs max-w-[80px] truncate">
              {userState.username || 'Coder'}
            </span>
          </button>

          {/* Streak Indicator */}
          <button
            onClick={() => {
              sound.playPop();
              onOpenStreakModal();
            }}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 rounded-2xl border-2 border-orange-300 bg-orange-50/90 hover:bg-orange-100 transition-all cursor-pointer group shadow-[0_2px_0_#fed7aa]"
            title="Streak & Daily Calendar"
          >
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 fill-orange-500 animate-flame group-hover:scale-110 transition-transform" />
            <span className="font-black text-orange-600 text-xs sm:text-base">
              {userState.streak}
            </span>
          </button>

          {/* Gems */}
          <button
            onClick={() => {
              sound.playPop();
              onOpenShop();
            }}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 rounded-2xl border-2 border-sky-300 bg-sky-50/90 hover:bg-sky-100 transition-all cursor-pointer group shadow-[0_2px_0_#bae6fd]"
            title="CodLingo Gems"
          >
            <Gem className="w-4 h-4 sm:w-5 sm:h-5 text-sky-500 fill-sky-500 group-hover:rotate-12 transition-transform" />
            <span className="font-black text-sky-600 text-xs sm:text-base">
              {userState.gems}
            </span>
          </button>

          {/* Hearts */}
          <button
            onClick={() => {
              sound.playPop();
              onOpenShop();
            }}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 rounded-2xl border-2 border-rose-300 bg-rose-50/90 hover:bg-rose-100 transition-all cursor-pointer group shadow-[0_2px_0_#fecdd3]"
            title="Hearts (Health)"
          >
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 fill-rose-500 group-hover:scale-110 transition-transform" />
            <span className="font-black text-rose-600 text-xs sm:text-base">
              {userState.hearts}
            </span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="p-1.5 sm:p-2 rounded-2xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 border-2 border-gray-200 transition-colors cursor-pointer"
            title={soundMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {soundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
          </button>

          {/* Time Traveler / Dev Simulation Button */}
          <button
            onClick={() => {
              sound.playPop();
              onOpenDevTraveler();
            }}
            className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-2xl text-xs font-bold text-indigo-700 bg-indigo-100 hover:bg-indigo-200 border-2 border-indigo-300 transition-all cursor-pointer shadow-[0_2px_0_#c7d2fe]"
            title="Time Traveler: Test Daily Login & Streaks"
          >
            <Clock className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden lg:inline">Test Day</span>
          </button>
        </div>
      </div>
    </header>
  );
};
