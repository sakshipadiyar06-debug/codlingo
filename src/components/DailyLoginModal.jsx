import React from 'react';
import { X, Flame, Shield, Calendar, Trophy, Sparkles, Check, ChevronRight, AlertTriangle } from 'lucide-react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

export const DailyLoginModal = ({
  isOpen,
  onClose,
  userState,
  onClaimDailyBonus,
  hasClaimedToday,
  onAdvanceDay,
  onMissDay
}) => {
  if (!isOpen) return null;

  // Generate 7-day strip (3 days before, today, 3 days after)
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  today.setDate(today.getDate() + userState.dayOffset);

  const weekStrip = [];
  for (let i = -3; i <= 3; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const isToday = i === 0;
    const isPast = i < 0;
    const isFuture = i > 0;
    const hasHistory = userState.history && userState.history[dateStr];
    const isFreezeSaved = userState.freezeSavedDate === dateStr;

    weekStrip.push({
      dateStr,
      dayName: daysOfWeek[d.getDay()],
      dayNum: d.getDate(),
      isToday,
      isPast,
      isFuture,
      completed: !!hasHistory,
      freezeSaved: isFreezeSaved
    });
  }

  const handleClaim = () => {
    sound.playStreakFlame();
    sound.playFanfare();
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 }
    });
    onClaimDailyBonus();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl border-4 border-[#e5e5e5] shadow-2xl overflow-hidden relative">
        {/* Top colorful banner */}
        <div className="bg-gradient-to-b from-orange-400 to-amber-500 p-6 text-white text-center relative">
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Animated Big Flame */}
          <div className="inline-flex items-center justify-center relative my-2">
            <div className="w-28 h-28 rounded-full bg-amber-300/30 flex items-center justify-center animate-ping absolute" />
            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center relative">
              <Flame className="w-16 h-16 text-yellow-200 fill-orange-500 animate-flame drop-shadow-lg" />
            </div>
          </div>

          <h2 className="text-3xl font-black tracking-tight mt-1">
            {userState.streak} DAY STREAK!
          </h2>
          <p className="text-amber-100 text-sm font-semibold mt-1">
            You're building an unstoppable C programming habit!
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* 7-Day Streak Calendar Tracker */}
          <div>
            <div className="flex items-center justify-between text-xs font-black uppercase text-gray-400 mb-2 px-1">
              <span>Weekly Streak Calendar</span>
              <span>Today ({weekStrip.find(d => d.isToday)?.dateStr})</span>
            </div>

            <div className="grid grid-cols-7 gap-2 bg-gray-50 p-3 rounded-2xl border-2 border-gray-100">
              {weekStrip.map((day, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col items-center py-2 px-1 rounded-xl transition-all ${
                    day.isToday
                      ? 'bg-orange-100/80 border-2 border-orange-400 shadow-sm'
                      : day.completed
                      ? 'bg-amber-50/70 border border-amber-200'
                      : 'border border-transparent'
                  }`}
                >
                  <span className="text-[11px] font-extrabold text-gray-400 mb-1">
                    {day.dayName}
                  </span>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${
                      day.freezeSaved
                        ? 'bg-cyan-500 text-white shadow-xs'
                        : day.completed
                        ? 'bg-orange-500 text-white shadow-xs'
                        : day.isToday
                        ? 'bg-orange-200 text-orange-800'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {day.freezeSaved ? (
                      <Shield className="w-4 h-4 fill-white" />
                    ) : day.completed ? (
                      <Flame className="w-4 h-4 fill-white text-yellow-200" />
                    ) : (
                      day.dayNum
                    )}
                  </div>

                  <span className="text-[10px] font-bold mt-1 text-gray-500">
                    {day.isToday ? 'Today' : day.freezeSaved ? 'Saved' : day.completed ? 'Done' : '—'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Streak Freeze & Stats Card */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl border-2 border-cyan-100 bg-cyan-50/60 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center text-white shrink-0 shadow-sm">
                <Shield className="w-5 h-5 fill-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-cyan-800">Streak Freeze</div>
                <div className="text-sm font-black text-cyan-950">
                  {userState.streakFreezes > 0 ? `${userState.streakFreezes} Active 🛡️` : 'None equipped'}
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl border-2 border-amber-100 bg-amber-50/60 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white shrink-0 shadow-sm">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-amber-800">Best Streak</div>
                <div className="text-sm font-black text-amber-950">
                  {userState.highestStreak} Days
                </div>
              </div>
            </div>
          </div>

          {/* Daily Reward Claim Button */}
          {!hasClaimedToday ? (
            <button
              onClick={handleClaim}
              className="w-full duo-btn duo-btn-orange py-3.5 text-base flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-yellow-200 animate-spin" />
              <span>Claim Today's Streak Bonus (+20 Gems)</span>
            </button>
          ) : (
            <div className="w-full py-3 px-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-emerald-800 text-sm font-black flex items-center justify-center gap-2">
              <Check className="w-5 h-5 text-emerald-600" />
              <span>Today's Daily Bonus Claimed! Streak Active.</span>
            </div>
          )}

          {/* Interactive Streak Simulator Controls (For testing how streak operates) */}
          <div className="bg-gray-100/80 rounded-2xl p-3 border border-gray-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-extrabold text-gray-500 uppercase">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Streak Simulator
              </span>
              <span className="text-[10px] text-gray-400">Day Offset: +{userState.dayOffset}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <button
                onClick={() => {
                  sound.playPop();
                  onAdvanceDay();
                }}
                className="py-2 px-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl text-gray-700 flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs"
              >
                <span>Advance +1 Day (Streak++)</span>
              </button>
              <button
                onClick={() => {
                  sound.playPop();
                  onMissDay();
                }}
                className="py-2 px-3 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl text-rose-700 flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Simulate Miss 1 Day</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
