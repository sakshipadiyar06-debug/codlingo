import React, { useState } from 'react';
import {
  Check,
  Lock,
  Star,
  BookOpen,
  Gamepad2,
  Trophy,
  Flame,
  ChevronRight,
  Terminal,
  Cpu,
  Crosshair,
  Layers,
  X,
  Sparkles
} from 'lucide-react';
import { sound } from '../utils/audio';
import { Mascot } from './Mascot';

export const CoursePath = ({
  currentLangInfo,
  units,
  cards,
  userState,
  onStartLearn,
  onStartGame,
  onOpenStreakModal
}) => {
  // Store the active card object when a node is clicked
  const [activeModalCard, setActiveModalCard] = useState(null);
  const [activeModalUnit, setActiveModalUnit] = useState(null);

  // Winding serpentine offsets for Duolingo path
  const offsets = ['translate-x-0', '-translate-x-10', 'translate-x-0', 'translate-x-10'];

  const handleNodeClick = (unit, card) => {
    sound.playPop();
    setActiveModalCard(card);
    setActiveModalUnit(unit);
  };

  return (
    <div className="max-w-xl mx-auto py-6 px-4 pb-28 w-full select-none">
      {/* Daily Streak Motivation Banner */}
      <div
        onClick={() => {
          sound.playPop();
          onOpenStreakModal();
        }}
        className="mb-8 p-4 rounded-3xl bg-gradient-to-r from-orange-400 to-amber-500 text-white flex items-center justify-between shadow-md cursor-pointer hover:scale-[1.01] transition-transform"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white shrink-0">
            <Flame className="w-7 h-7 text-yellow-200 fill-orange-500 animate-flame" />
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-amber-100 flex items-center gap-1.5">
              <span>Daily Streak Active</span>
              <span className="bg-white/20 px-2 py-0.2 rounded-full text-[10px]">
                {currentLangInfo.name} Track
              </span>
            </div>
            <div className="text-lg font-black leading-tight">
              {userState.streak} Days on Fire! Tap to view calendar
            </div>
          </div>
        </div>
        <ChevronRight className="w-6 h-6 text-white/80 shrink-0" />
      </div>

      {/* Units Roadmap */}
      <div className="space-y-12">
        {units.map((unit, unitIdx) => {
          const unitCards = cards.filter((c) => c.unitId === unit.id);
          const masteredCount = unitCards.filter(
            (c) => userState.cardConfidence && userState.cardConfidence[c.id] === 'mastered'
          ).length;

          const isUnitUnlocked =
            unitIdx === 0 ||
            (userState.completedCards && userState.completedCards.length >= unitIdx);

          return (
            <div key={unit.id} className="relative">
              {/* Unit Header Card */}
              <div
                className={`rounded-3xl p-5 mb-8 text-white bg-gradient-to-r ${unit.color} shadow-lg relative overflow-hidden`}
              >
                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider">
                        Unit {unit.number}
                      </span>
                      <span className="text-xs font-bold text-white/80">
                        {masteredCount}/{unitCards.length} Mastered
                      </span>
                    </div>
                    <h2 className="text-xl font-black">{unit.title}</h2>
                    <p className="text-xs text-white/90 font-semibold mt-1 max-w-sm">
                      {unit.description}
                    </p>
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 text-3xl">
                    <span>{currentLangInfo.emoji}</span>
                  </div>
                </div>

                {/* Decorative background circle */}
                <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />
              </div>

              {/* Serpentine Stepping Stone Path */}
              <div className="flex flex-col items-center gap-8 py-2 relative">
                {unitCards.map((card, cardIdx) => {
                  const isCardMastered =
                    userState.cardConfidence && userState.cardConfidence[card.id] === 'mastered';
                  const isUnlocked = isUnitUnlocked;
                  const isCurrent = isUnlocked && !isCardMastered;
                  const offsetClass = offsets[cardIdx % offsets.length];

                  return (
                    <div key={card.id} className={`relative flex flex-col items-center ${offsetClass}`}>
                      {/* Interactive Level Button */}
                      <button
                        onClick={() => handleNodeClick(unit, card)}
                        disabled={!isUnlocked}
                        className={`w-20 h-20 rounded-full flex flex-col items-center justify-center transition-all cursor-pointer relative group ${
                          isCardMastered
                            ? 'bg-amber-400 border-b-6 border-amber-600 text-white shadow-md active:translate-y-1 active:border-b-2'
                            : isCurrent
                            ? 'bg-[#58cc02] border-b-6 border-[#46a302] text-white shadow-xl hover:scale-105 active:translate-y-1 active:border-b-2'
                            : isUnlocked
                            ? 'bg-sky-400 border-b-6 border-sky-600 text-white shadow-md active:translate-y-1 active:border-b-2'
                            : 'bg-gray-300 border-b-6 border-gray-400 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {/* Active Pulsing Ring */}
                        {isCurrent && (
                          <div className="absolute -inset-2 rounded-full border-4 border-[#58cc02] opacity-75 animate-ping pointer-events-none" />
                        )}

                        {/* Icon inside Node */}
                        {isCardMastered ? (
                          <Check className="w-8 h-8 stroke-[3]" />
                        ) : isUnlocked ? (
                          <Star className="w-8 h-8 fill-white/80" />
                        ) : (
                          <Lock className="w-7 h-7" />
                        )}

                        <span className="text-[10px] font-black tracking-wider uppercase mt-0.5">
                          {cardIdx + 1}
                        </span>
                      </button>

                      {/* Mascot beside first active node */}
                      {isCurrent && cardIdx === 0 && (
                        <div className="absolute -left-28 -top-3 hidden sm:block">
                          <Mascot mood="cheering" message={`Learn ${currentLangInfo.name}!`} size="sm" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* NON-OVERLAPPING LEVEL ACTION MODAL */}
      {activeModalCard && (
        <div
          onClick={() => setActiveModalCard(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-sm rounded-3xl p-5 border-4 border-[#e5e5e5] shadow-2xl relative space-y-4"
          >
            {/* Close Button */}
            <button
              onClick={() => {
                sound.playPop();
                setActiveModalCard(null);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Level Info Header */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-black uppercase text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  {activeModalCard.tag}
                </span>
                {userState.cardConfidence &&
                  userState.cardConfidence[activeModalCard.id] === 'mastered' && (
                    <span className="text-xs font-black text-amber-600 flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      <Trophy className="w-3.5 h-3.5 fill-amber-500" /> Mastered
                    </span>
                  )}
              </div>
              <h3 className="text-lg font-black text-gray-800 leading-snug">
                {activeModalCard.title}
              </h3>
              <p className="text-xs font-bold text-gray-500 mt-1 line-clamp-2">
                {activeModalCard.front.question}
              </p>
            </div>

            {/* Preview Code Snippet */}
            {activeModalCard.front.code && (
              <div className="bg-[#1e293b] rounded-xl p-3 text-emerald-400 font-mono text-xs overflow-x-auto max-h-28 border border-slate-700 whitespace-pre">
                {activeModalCard.front.code}
              </div>
            )}

            {/* Two Action Buttons: Learn vs Game */}
            <div className="flex flex-col gap-2.5 pt-1">
              <button
                onClick={() => {
                  sound.playPop();
                  const targetCard = activeModalCard;
                  const targetUnit = activeModalUnit;
                  setActiveModalCard(null);
                  onStartLearn(targetUnit, targetCard);
                }}
                className="w-full duo-btn duo-btn-green py-3 text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <BookOpen className="w-4 h-4" />
                <span>Study Flashcards (Learn Mode)</span>
              </button>

              {activeModalCard.drill && (
                <button
                  onClick={() => {
                    sound.playPop();
                    const targetCard = activeModalCard;
                    const targetUnit = activeModalUnit;
                    setActiveModalCard(null);
                    onStartGame(targetUnit, targetCard);
                  }}
                  className="w-full duo-btn duo-btn-orange py-3 text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span>Practice Drill (Game Mode)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
