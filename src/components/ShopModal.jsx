import React from 'react';
import { X, Shield, Heart, Gem, Zap, Crown, Check, AlertCircle } from 'lucide-react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

export const ShopModal = ({
  isOpen,
  onClose,
  userState,
  onBuyFreeze,
  onRefillHearts
}) => {
  if (!isOpen) return null;

  const handleBuyFreeze = () => {
    if (userState.gems < 200) {
      sound.playError();
      return;
    }
    sound.playSuccess();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
    onBuyFreeze(200);
  };

  const handleRefill = () => {
    if (userState.gems < 100) {
      sound.playError();
      return;
    }
    sound.playSuccess();
    onRefillHearts(100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-3xl border-4 border-[#e5e5e5] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-sky-400 to-blue-500 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <Gem className="w-6 h-6 fill-white text-sky-200" />
            </div>
            <div>
              <h3 className="text-xl font-black">CLingo Shop</h3>
              <p className="text-xs text-sky-100 font-bold">
                Your Balance: {userState.gems} Gems 💎
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

        {/* Shop Items List */}
        <div className="p-5 space-y-4 overflow-y-auto">
          {/* Item 1: Streak Freeze */}
          <div className="p-4 rounded-2xl border-2 border-gray-200 hover:border-cyan-400 flex items-center justify-between gap-4 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-100 flex items-center justify-center text-cyan-600 shrink-0">
                <Shield className="w-7 h-7 fill-cyan-500 text-white" />
              </div>
              <div>
                <h4 className="font-black text-gray-800 text-sm">Streak Freeze</h4>
                <p className="text-xs text-gray-500 font-bold leading-tight">
                  Protects your streak from resetting if you miss one day of practice.
                </p>
                <div className="text-[11px] font-black text-cyan-700 mt-1">
                  Currently Equipped: {userState.streakFreezes}
                </div>
              </div>
            </div>

            <button
              onClick={handleBuyFreeze}
              disabled={userState.gems < 200}
              className={`px-3 py-2 rounded-xl font-black text-xs shrink-0 flex items-center gap-1 cursor-pointer ${
                userState.gems >= 200
                  ? 'bg-cyan-500 hover:bg-cyan-600 text-white shadow-[0_2px_0_#0891b2] active:translate-y-0.5'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Gem className="w-3.5 h-3.5 fill-current" />
              <span>200</span>
            </button>
          </div>

          {/* Item 2: Heart Refill */}
          <div className="p-4 rounded-2xl border-2 border-gray-200 hover:border-rose-400 flex items-center justify-between gap-4 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                <Heart className="w-7 h-7 fill-rose-500 text-white" />
              </div>
              <div>
                <h4 className="font-black text-gray-800 text-sm">Full Heart Refill</h4>
                <p className="text-xs text-gray-500 font-bold leading-tight">
                  Instantly restore your hearts back to full health (5/5).
                </p>
                <div className="text-[11px] font-black text-rose-700 mt-1">
                  Current Hearts: {userState.hearts}/5
                </div>
              </div>
            </div>

            <button
              onClick={handleRefill}
              disabled={userState.gems < 100 || userState.hearts >= 5}
              className={`px-3 py-2 rounded-xl font-black text-xs shrink-0 flex items-center gap-1 cursor-pointer ${
                userState.hearts >= 5
                  ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                  : userState.gems >= 100
                  ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-[0_2px_0_#e11d48] active:translate-y-0.5'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {userState.hearts >= 5 ? (
                <span>Full</span>
              ) : (
                <>
                  <Gem className="w-3.5 h-3.5 fill-current" />
                  <span>100</span>
                </>
              )}
            </button>
          </div>

          {/* Item 3: Golden Pointer Mascot Crown */}
          <div className="p-4 rounded-2xl border-2 border-gray-200 bg-amber-50/50 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                <Crown className="w-7 h-7 fill-amber-500 text-yellow-100" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-black text-gray-800 text-sm">C Pointer Crown</h4>
                  <span className="text-[9px] uppercase font-black bg-amber-400 text-amber-950 px-1.5 py-0.5 rounded">
                    Cosmetic
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-bold leading-tight">
                  Dresses Clingy the crab in a golden CPU crown for C veterans.
                </p>
              </div>
            </div>

            <div className="px-3 py-1.5 rounded-xl font-black text-xs text-amber-700 bg-amber-100 border border-amber-300">
              Unlocked!
            </div>
          </div>
        </div>

        {/* Footer tip */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 text-center">
          <p className="text-xs font-bold text-gray-500">
            Earn more Gems by maintaining daily streaks & completing drills!
          </p>
        </div>
      </div>
    </div>
  );
};
