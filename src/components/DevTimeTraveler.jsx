import React from 'react';
import { X, Calendar, FastForward, AlertTriangle, RefreshCw, Heart, Gem, Flame } from 'lucide-react';
import { sound } from '../utils/audio';

export const DevTimeTraveler = ({
  isOpen,
  onClose,
  userState,
  onAdvanceDay,
  onMissDay,
  onAddGems,
  onRefillHearts,
  onResetAll
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none animate-fade-in">
      <div className="bg-white w-full max-w-sm rounded-3xl border-4 border-purple-300 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-purple-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-200" />
            <div>
              <h3 className="font-black text-sm">Streak Time Traveler</h3>
              <p className="text-[10px] text-purple-200 font-bold">
                Test daily logins, freezes & calendar jumps
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="p-1 rounded-full bg-white/20 hover:bg-white/30 text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current State Info */}
        <div className="p-4 space-y-3 text-xs font-bold text-gray-600 bg-purple-50/50 border-b border-purple-100">
          <div className="flex justify-between">
            <span>Simulated Day Offset:</span>
            <span className="text-purple-700 font-black">+{userState.dayOffset} Days</span>
          </div>
          <div className="flex justify-between">
            <span>Current Streak:</span>
            <span className="text-orange-600 font-black">{userState.streak} Days 🔥</span>
          </div>
          <div className="flex justify-between">
            <span>Streak Freezes Equipped:</span>
            <span className="text-cyan-600 font-black">{userState.streakFreezes} 🛡️</span>
          </div>
        </div>

        {/* Actions Grid */}
        <div className="p-4 space-y-2">
          {/* Next Day */}
          <button
            onClick={() => {
              sound.playPop();
              onAdvanceDay();
            }}
            className="w-full py-2.5 px-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-black text-xs flex items-center justify-center gap-2 shadow-[0_2px_0_#059669] active:translate-y-0.5 cursor-pointer"
          >
            <FastForward className="w-4 h-4" />
            <span>Fast-Forward to Tomorrow (+1 Day Streak)</span>
          </button>

          {/* Miss Day */}
          <button
            onClick={() => {
              sound.playPop();
              onMissDay();
            }}
            className="w-full py-2.5 px-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-black text-xs flex items-center justify-center gap-2 shadow-[0_2px_0_#d97706] active:translate-y-0.5 cursor-pointer"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Simulate Missed Day (Tests Freeze / Reset)</span>
          </button>

          {/* Add Gems */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => {
                sound.playPop();
                onAddGems(150);
              }}
              className="py-2 px-2 bg-sky-50 hover:bg-sky-100 border border-sky-300 text-sky-800 rounded-xl font-black text-[11px] flex items-center justify-center gap-1 cursor-pointer"
            >
              <Gem className="w-3.5 h-3.5 text-sky-500 fill-sky-500" />
              <span>+150 Gems</span>
            </button>

            <button
              onClick={() => {
                sound.playPop();
                onRefillHearts(0);
              }}
              className="py-2 px-2 bg-rose-50 hover:bg-rose-100 border border-rose-300 text-rose-800 rounded-xl font-black text-[11px] flex items-center justify-center gap-1 cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>Full Hearts (5)</span>
            </button>
          </div>

          {/* Reset All */}
          <button
            onClick={() => {
              sound.playPop();
              onResetAll();
            }}
            className="w-full mt-2 py-2 px-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl font-extrabold text-[11px] flex items-center justify-center gap-1 cursor-pointer transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset All Progress & Cache</span>
          </button>
        </div>
      </div>
    </div>
  );
};
