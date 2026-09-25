import React, { useState } from 'react';
import {
  X,
  Heart,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Trophy,
  ArrowRight,
  Flame,
  Gem,
  AlertCircle
} from 'lucide-react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Mascot } from './Mascot';

export const GameDrillModal = ({
  cards,
  unit,
  userState,
  onClose,
  onLoseHeart,
  onEarnReward,
  onOpenShop
}) => {
  // Filter cards with drill questions
  const drillCards = cards.filter((c) => c.drill);
  const [currentIdx, setCurrentIdx] = useState(0);

  // Question state
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedBugLine, setSelectedBugLine] = useState(null);
  const [scrambleTokens, setScrambleTokens] = useState([]);
  const [availableTokens, setAvailableTokens] = useState(() => {
    const card = drillCards[0];
    if (card?.drill?.type === 'scramble') {
      return [...card.drill.tokens].sort(() => Math.random() - 0.5);
    }
    return [];
  });

  const [feedbackStatus, setFeedbackStatus] = useState(null); // 'correct' | 'wrong' | null
  const [heartsShaking, setHeartsShaking] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [scoreStats, setScoreStats] = useState({ correct: 0, total: 0, xpEarned: 0 });

  const currentCard = drillCards[currentIdx];
  const drill = currentCard?.drill;

  // Setup next question
  const setupQuestion = (idx) => {
    setCurrentIdx(idx);
    setSelectedOption(null);
    setSelectedBugLine(null);
    setFeedbackStatus(null);

    const nextCard = drillCards[idx];
    if (nextCard?.drill?.type === 'scramble') {
      setScrambleTokens([]);
      setAvailableTokens([...nextCard.drill.tokens].sort(() => Math.random() - 0.5));
    }
  };

  const handleSelectOption = (opt) => {
    if (feedbackStatus) return;
    sound.playPop();
    setSelectedOption(opt);
  };

  const handleSelectBugLine = (lineIdx) => {
    if (feedbackStatus) return;
    sound.playPop();
    setSelectedBugLine(lineIdx);
  };

  const handlePickToken = (token, index) => {
    if (feedbackStatus) return;
    sound.playPop();
    setScrambleTokens([...scrambleTokens, token]);
    const updated = [...availableTokens];
    updated.splice(index, 1);
    setAvailableTokens(updated);
  };

  const handleRemoveToken = (token, index) => {
    if (feedbackStatus) return;
    sound.playPop();
    const updated = [...scrambleTokens];
    updated.splice(index, 1);
    setScrambleTokens(updated);
    setAvailableTokens([...availableTokens, token]);
  };

  const checkAnswer = () => {
    if (!drill) return;
    let isCorrect = false;

    if (drill.type === 'predict-output' || drill.type === 'fill-blank') {
      isCorrect = selectedOption === drill.correctAnswer;
    } else if (drill.type === 'spot-bug') {
      isCorrect = selectedBugLine === drill.bugLineIndex;
    } else if (drill.type === 'scramble') {
      isCorrect =
        scrambleTokens.join(' ') === drill.correctSequence.join(' ') ||
        scrambleTokens.join('') === drill.correctSequence.join('');
    }

    if (isCorrect) {
      sound.playSuccess();
      setFeedbackStatus('correct');
      setScoreStats((prev) => ({
        correct: prev.correct + 1,
        total: prev.total + 1,
        xpEarned: prev.xpEarned + 15
      }));
    } else {
      sound.playError();
      setFeedbackStatus('wrong');
      setHeartsShaking(true);
      setTimeout(() => setHeartsShaking(false), 700);
      onLoseHeart();
      setScoreStats((prev) => ({
        ...prev,
        total: prev.total + 1
      }));
    }
  };

  const handleContinue = () => {
    sound.playPop();
    if (currentIdx < drillCards.length - 1) {
      setupQuestion(currentIdx + 1);
    } else {
      // Completed drill session!
      sound.playFanfare();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      setIsCompleted(true);
      onEarnReward(scoreStats.xpEarned + 15, 10);
    }
  };

  // If user runs out of hearts
  if (userState.hearts <= 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs select-none animate-fade-in">
        <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border-4 border-[#e5e5e5] text-center shadow-2xl space-y-5">
          <Mascot mood="sad" size="lg" />
          <h2 className="text-2xl font-black text-gray-800">You Ran Out of Hearts!</h2>
          <p className="text-gray-500 font-bold text-sm">
            Mistakes happen while learning C! Refill your hearts in the shop or wait for them to regenerate.
          </p>

          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={() => {
                onClose();
                onOpenShop();
              }}
              className="w-full duo-btn duo-btn-blue py-3 text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Gem className="w-4 h-4 fill-white" />
              <span>Refill Hearts in Shop (100 Gems)</span>
            </button>
            <button
              onClick={onClose}
              className="w-full duo-btn duo-btn-outline py-3 text-sm text-gray-600 cursor-pointer"
            >
              <span>Exit to Course Map</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Drill Completed Screen
  if (isCompleted) {
    const accuracy = Math.round((scoreStats.correct / scoreStats.total) * 100) || 100;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs select-none animate-fade-in">
        <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border-4 border-emerald-400 text-center shadow-2xl space-y-6">
          <div className="inline-block relative">
            <Trophy className="w-20 h-20 text-yellow-400 fill-amber-300 drop-shadow-md mx-auto" />
            <Sparkles className="w-6 h-6 text-yellow-500 absolute -top-1 -right-1 animate-spin" />
          </div>

          <div className="space-y-1">
            <h2 className="text-3xl font-black text-gray-800">Lesson Complete!</h2>
            <p className="text-emerald-600 font-extrabold text-sm uppercase tracking-wide">
              {unit?.title || 'C Practice'} Mastered
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 py-2">
            <div className="p-3 bg-amber-50 border-2 border-amber-200 rounded-2xl">
              <div className="text-[10px] font-black uppercase text-amber-700">XP Earned</div>
              <div className="text-lg font-black text-amber-900">+{scoreStats.xpEarned + 15}</div>
            </div>
            <div className="p-3 bg-sky-50 border-2 border-sky-200 rounded-2xl">
              <div className="text-[10px] font-black uppercase text-sky-700">Gems Bonus</div>
              <div className="text-lg font-black text-sky-900">+10 💎</div>
            </div>
            <div className="p-3 bg-emerald-50 border-2 border-emerald-200 rounded-2xl">
              <div className="text-[10px] font-black uppercase text-emerald-700">Accuracy</div>
              <div className="text-lg font-black text-emerald-900">{accuracy}%</div>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="w-full duo-btn duo-btn-green py-3.5 text-base flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <span>Continue Your Journey</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  const isAnswerSelected =
    drill?.type === 'spot-bug'
      ? selectedBugLine !== null
      : drill?.type === 'scramble'
      ? scrambleTokens.length > 0
      : selectedOption !== null;

  const progressPct = ((currentIdx + 1) / drillCards.length) * 100;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#f7f9fa] select-none animate-fade-in">
      {/* Top Header with Progress Bar and Hearts */}
      <div className="px-4 py-3 sm:px-8 bg-white border-b-2 border-gray-200 flex items-center justify-between gap-4">
        <button
          onClick={() => {
            sound.playPop();
            onClose();
          }}
          className="p-2 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Duolingo Progress Bar */}
        <div className="flex-1 max-w-xl h-4 bg-gray-200 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full transition-all duration-300 shadow-inner"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Hearts indicator */}
        <div
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 transition-transform ${
            heartsShaking ? 'animate-bounce text-rose-600 scale-110' : ''
          }`}
        >
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
          <span className="font-black text-rose-600 text-sm">{userState.hearts}</span>
        </div>
      </div>

      {/* Main Question Arena */}
      <div className="flex-1 max-w-2xl w-full mx-auto p-4 sm:p-6 overflow-y-auto flex flex-col justify-center">
        {/* Question Title & Prompt */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-gray-200 text-gray-700 text-[11px] font-black uppercase tracking-wider">
              {drill?.type === 'spot-bug'
                ? '🐛 Bug Hunter'
                : drill?.type === 'scramble'
                ? '🧩 Code Builder'
                : drill?.type === 'fill-blank'
                ? '✍️ Fill in the Syntax'
                : '🎯 Predict Output'}
            </span>
            <span className="text-xs font-bold text-gray-400">{currentCard?.title}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-gray-800 leading-snug">
            {drill?.prompt}
          </h2>
        </div>

        {/* DRILL TYPE 1: PREDICT OUTPUT */}
        {drill?.type === 'predict-output' && (
          <div className="space-y-4">
            {currentCard.front.code && (
              <div className="bg-[#1e293b] rounded-2xl p-4 font-mono text-emerald-400 text-sm sm:text-base border border-slate-700 shadow-inner overflow-x-auto whitespace-pre">
                {currentCard.front.code}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {drill.options.map((opt, i) => {
                const isSelected = selectedOption === opt;
                return (
                  <button
                    key={i}
                    disabled={feedbackStatus !== null}
                    onClick={() => handleSelectOption(opt)}
                    className={`p-4 rounded-2xl text-left font-mono font-bold text-sm sm:text-base transition-all border-2 shadow-[0_4px_0_#e5e5e5] active:translate-y-1 active:shadow-none cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50 text-sky-900 shadow-[0_4px_0_#0284c7]'
                        : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-800'
                    }`}
                  >
                    <span>{opt}</span>
                    <span className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-xs font-sans text-gray-400">
                      {i + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* DRILL TYPE 2: SPOT THE BUG */}
        {drill?.type === 'spot-bug' && (
          <div className="space-y-3">
            <p className="text-xs font-bold text-gray-500">
              Tap the specific line of C code that causes the bug:
            </p>
            <div className="bg-[#0f172a] rounded-2xl p-3 border border-slate-800 shadow-inner font-mono text-xs sm:text-sm overflow-x-auto">
              {drill.codeLines.map((line, idx) => {
                const isSelected = selectedBugLine === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectBugLine(idx)}
                    className={`flex items-center gap-3 py-1.5 px-2.5 rounded-lg cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-rose-950/80 text-rose-300 border border-rose-500/80 font-bold'
                        : 'hover:bg-slate-800/60 text-slate-300'
                    }`}
                  >
                    <span className="text-slate-600 select-none w-5 text-right font-sans text-xs">
                      {idx + 1}
                    </span>
                    <span className="flex-1">{line}</span>
                    {isSelected && (
                      <span className="text-[10px] bg-rose-600 text-white px-2 py-0.5 rounded-full uppercase font-black font-sans">
                        Bug here!
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* DRILL TYPE 3: FILL IN THE BLANK */}
        {drill?.type === 'fill-blank' && (
          <div className="space-y-4">
            <div className="bg-[#1e293b] rounded-2xl p-5 font-mono text-sm sm:text-base border border-slate-700 shadow-inner text-white whitespace-pre">
              <span>{drill.codeBefore}</span>
              <span className="inline-block mx-1 px-3 py-0.5 rounded-md bg-sky-500/20 text-sky-400 border border-dashed border-sky-400 font-bold">
                {selectedOption || '____'}
              </span>
              <span>{drill.codeAfter}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              {drill.options.map((opt, i) => {
                const isSelected = selectedOption === opt;
                return (
                  <button
                    key={i}
                    disabled={feedbackStatus !== null}
                    onClick={() => handleSelectOption(opt)}
                    className={`p-3.5 rounded-2xl font-mono font-bold text-center border-2 shadow-[0_3px_0_#e5e5e5] cursor-pointer active:translate-y-1 active:shadow-none transition-all ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50 text-sky-900 shadow-[0_3px_0_#0284c7]'
                        : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-800'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* DRILL TYPE 4: CODE SCRAMBLE */}
        {drill?.type === 'scramble' && (
          <div className="space-y-4">
            {/* Target Assembly Area */}
            <div className="min-h-[90px] p-4 bg-white rounded-2xl border-2 border-dashed border-gray-300 flex flex-wrap items-center gap-2 shadow-inner">
              {scrambleTokens.length === 0 ? (
                <span className="text-xs font-bold text-gray-400">
                  Tap code blocks below in the correct order to assemble the C statement...
                </span>
              ) : (
                scrambleTokens.map((token, i) => (
                  <button
                    key={i}
                    onClick={() => handleRemoveToken(token, i)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-100 border-2 border-emerald-400 text-emerald-900 font-mono font-bold text-sm shadow-xs cursor-pointer hover:bg-rose-50 hover:border-rose-300 hover:text-rose-700 transition-colors"
                  >
                    {token}
                  </button>
                ))
              )}
            </div>

            {/* Word bank tray */}
            <div className="p-3 bg-gray-100 rounded-2xl flex flex-wrap gap-2 justify-center">
              {availableTokens.map((token, i) => (
                <button
                  key={i}
                  onClick={() => handlePickToken(token, i)}
                  className="px-3.5 py-2 rounded-xl bg-white border-2 border-gray-300 font-mono font-bold text-sm text-gray-800 shadow-[0_3px_0_#d4d4d8] active:translate-y-0.5 active:shadow-none cursor-pointer hover:border-sky-400 transition-all"
                >
                  {token}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Duolingo Classic Bottom Action / Feedback Sheet */}
      <div
        className={`p-4 sm:px-8 sm:py-5 border-t-2 transition-all ${
          feedbackStatus === 'correct'
            ? 'bg-[#d7ffb8] border-[#b8f28b] text-[#2b7200]'
            : feedbackStatus === 'wrong'
            ? 'bg-[#ffdfe0] border-[#ffb8ba] text-[#ea2b2b]'
            : 'bg-white border-gray-200'
        }`}
      >
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Feedback message display */}
          {feedbackStatus === 'correct' && (
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-12 h-12 rounded-full bg-[#58cc02] flex items-center justify-center text-white shrink-0 shadow-sm">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-black">Nicely done!</h3>
                <p className="text-xs sm:text-sm font-bold text-emerald-800">
                  {drill?.explanation}
                </p>
              </div>
            </div>
          )}

          {feedbackStatus === 'wrong' && (
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-12 h-12 rounded-full bg-[#ff4b4b] flex items-center justify-center text-white shrink-0 shadow-sm">
                <XCircle className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-black">Not quite right</h3>
                <p className="text-xs sm:text-sm font-bold text-rose-800">
                  {drill?.type === 'spot-bug'
                    ? drill.bugExplanation
                    : `Correct answer: ${drill?.correctAnswer || drill?.correctSequence?.join(' ')}`}
                </p>
              </div>
            </div>
          )}

          {!feedbackStatus && (
            <div className="hidden sm:block text-xs font-bold text-gray-400">
              Select your answer and press Check
            </div>
          )}

          {/* Action button */}
          <div className="w-full sm:w-auto shrink-0">
            {!feedbackStatus ? (
              <button
                disabled={!isAnswerSelected}
                onClick={checkAnswer}
                className={`w-full sm:w-44 py-3.5 duo-btn text-base cursor-pointer ${
                  isAnswerSelected
                    ? 'duo-btn-green'
                    : 'bg-gray-200 text-gray-400 border-b-4 border-gray-300 cursor-not-allowed'
                }`}
              >
                CHECK
              </button>
            ) : (
              <button
                onClick={handleContinue}
                className={`w-full sm:w-44 py-3.5 duo-btn text-base cursor-pointer ${
                  feedbackStatus === 'correct' ? 'duo-btn-green' : 'duo-btn-red'
                }`}
              >
                CONTINUE
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
