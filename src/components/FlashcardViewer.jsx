import React, { useState, useEffect } from 'react';
import {
  RotateCw,
  CheckCircle2,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Zap,
  Code2,
  BookOpen,
  Gamepad2,
  Check,
  XCircle,
  Trophy
} from 'lucide-react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

export const FlashcardViewer = ({
  cards,
  unit,
  onClose,
  onCardMastered,
  onCardReview,
  onStartDrill
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardMode, setCardMode] = useState('study'); // 'study' | 'quiz'
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // 4-Option Quiz State
  const [selectedQuizOption, setSelectedQuizOption] = useState(null);
  const [quizStatus, setQuizStatus] = useState(null); // 'correct' | 'wrong' | null

  const card = cards[currentIndex] || cards[0];
  const quiz = card?.quiz;

  // Reset when navigating cards
  useEffect(() => {
    setIsFlipped(false);
    setShowHint(false);
    setSelectedQuizOption(null);
    setQuizStatus(null);
  }, [currentIndex, cardMode]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (cardMode === 'study') {
        if (e.code === 'Space') {
          e.preventDefault();
          handleFlip();
        }
      }
      if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isFlipped, cardMode]);

  const handleFlip = () => {
    sound.playFlip();
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      sound.playPop();
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      sound.playPop();
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleAnswerQuiz = (opt) => {
    if (quizStatus !== null || !quiz) return;
    setSelectedQuizOption(opt);

    if (opt === quiz.correctAnswer) {
      sound.playSuccess();
      setQuizStatus('correct');
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.65 }
      });
      onCardMastered(card.id);
    } else {
      sound.playError();
      setQuizStatus('wrong');
      onCardReview(card.id);
    }
  };

  const handleMaster = () => {
    sound.playSuccess();
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 }
    });
    onCardMastered(card.id);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleReview = () => {
    sound.playPop();
    onCardReview(card.id);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const progressPercentage = ((currentIndex + 1) / cards.length) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in select-none">
      <div className="bg-[#f7f9fa] w-full max-w-2xl rounded-3xl border-4 border-[#e5e5e5] shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header Bar */}
        <div className="px-4 py-3 bg-white border-b-2 border-gray-200 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="flex items-center gap-1.5 text-xs font-black uppercase text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>

          {/* Mode Switcher Tabs (3D Flip vs 4-Option Quiz) */}
          <div className="flex items-center bg-gray-100 p-1 rounded-2xl border border-gray-200">
            <button
              onClick={() => {
                sound.playPop();
                setCardMode('study');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                cardMode === 'study'
                  ? 'bg-white text-emerald-700 shadow-sm border border-gray-200'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Study & Flip</span>
            </button>

            <button
              onClick={() => {
                sound.playPop();
                setCardMode('quiz');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                cardMode === 'quiz'
                  ? 'bg-white text-sky-700 shadow-sm border border-gray-200'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <Zap className="w-3.5 h-3.5 fill-sky-500 text-sky-500" />
              <span>4-Option Quiz</span>
            </button>
          </div>

          {/* Card counter */}
          <span className="text-xs font-black text-gray-400">
            {currentIndex + 1}/{cards.length}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-gray-200">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-green-500 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Body Arena */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto flex flex-col items-center justify-center">
          {/* TAB 1: 3D FLIP FLASHCARD */}
          {cardMode === 'study' && (
            <div
              onClick={handleFlip}
              className="w-full max-w-xl min-h-[380px] sm:min-h-[420px] cursor-pointer group perspective-1000 relative"
            >
              <div
                className={`w-full h-full transition-transform duration-500 transform-style-preserve-3d relative rounded-3xl ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* FRONT */}
                <div className="w-full h-full absolute inset-0 backface-hidden bg-white border-3 border-gray-200 hover:border-emerald-400 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_8px_0_#e5e5e5] transition-all">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-black uppercase tracking-wider">
                      {card.tag}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-bold text-gray-400">
                      <RotateCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                      <span>Click to flip</span>
                    </div>
                  </div>

                  <div className="my-auto py-3">
                    <h3 className="text-xl sm:text-2xl font-black text-gray-800 leading-snug">
                      {card.front.question}
                    </h3>

                    {card.front.code && (
                      <div className="mt-4 bg-[#1e293b] rounded-2xl p-4 text-emerald-400 font-mono text-xs sm:text-sm border border-slate-700 shadow-inner overflow-x-auto text-left whitespace-pre">
                        {card.front.code}
                      </div>
                    )}

                    {card.front.hint && (
                      <div className="mt-3 text-left" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setShowHint(!showHint)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:text-sky-800 cursor-pointer"
                        >
                          <HelpCircle className="w-3.5 h-3.5" />
                          <span>{showHint ? 'Hide Hint' : 'Show Mnemonic Hint'}</span>
                        </button>
                        {showHint && (
                          <div className="mt-1.5 p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-xs font-bold text-sky-800 animate-fade-in">
                            💡 {card.front.hint}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t-2 border-gray-100 flex items-center justify-center text-xs font-extrabold text-emerald-600">
                    <span>TAP TO REVEAL EXPLANATION ➔</span>
                  </div>
                </div>

                {/* BACK */}
                <div className="w-full h-full absolute inset-0 backface-hidden rotate-y-180 bg-white border-3 border-emerald-400 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_8px_0_#d1fae5] transition-all overflow-y-auto">
                  <div className="flex items-center justify-between pb-3 border-b-2 border-gray-100">
                    <span className="px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-black uppercase tracking-wider">
                      {card.back.concept}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-bold text-gray-400">
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Flip Back</span>
                    </div>
                  </div>

                  <div className="py-3 space-y-3 text-left">
                    <p className="text-gray-700 text-xs sm:text-sm font-bold leading-relaxed">
                      {card.back.explanation}
                    </p>

                    {card.back.mnemonic && (
                      <div className="p-3 bg-amber-50 border-2 border-amber-200 rounded-2xl">
                        <div className="text-[10px] font-black uppercase text-amber-700 tracking-wide mb-0.5">
                          🧠 Memory Hack
                        </div>
                        <div className="text-xs font-black text-amber-900 whitespace-pre-line">
                          {card.back.mnemonic}
                        </div>
                      </div>
                    )}

                    {card.back.codeSnippet && (
                      <div className="bg-[#0f172a] rounded-xl p-3 text-sky-300 font-mono text-xs overflow-x-auto whitespace-pre border border-slate-700">
                        {card.back.codeSnippet}
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-gray-100 text-center text-xs font-bold text-gray-400">
                    Rate confidence below or try the 4-Option Quiz!
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INTEGRATED 4-OPTION QUIZ */}
          {cardMode === 'quiz' && quiz && (
            <div className="w-full max-w-xl bg-white border-3 border-sky-400 rounded-3xl p-5 sm:p-7 shadow-[0_8px_0_#e0f2fe] space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-sky-100 text-sky-800 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 fill-sky-600 text-sky-600" />
                  <span>4-Option Quiz Challenge</span>
                </span>
                <span className="text-xs font-black text-amber-500 flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5" /> +15 XP
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-black text-gray-800 leading-snug">
                {quiz.question}
              </h3>

              {card.front.code && (
                <div className="bg-[#1e293b] rounded-xl p-3 text-sky-300 font-mono text-xs border border-slate-700 overflow-x-auto whitespace-pre">
                  {card.front.code}
                </div>
              )}

              {/* 4 Chunky Duolingo Options */}
              <div className="grid grid-cols-1 gap-2.5 pt-1">
                {quiz.options.map((opt, i) => {
                  const letter = ['A', 'B', 'C', 'D'][i];
                  const isSelected = selectedQuizOption === opt;
                  const isCorrectAnswer = opt === quiz.correctAnswer;

                  let btnStyle = 'border-gray-200 bg-white hover:bg-gray-50 text-gray-800 shadow-[0_3px_0_#e5e5e5]';
                  if (quizStatus !== null) {
                    if (isCorrectAnswer) {
                      btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-[0_3px_0_#059669] font-black ring-2 ring-emerald-400';
                    } else if (isSelected && !isCorrectAnswer) {
                      btnStyle = 'border-rose-500 bg-rose-50 text-rose-900 shadow-[0_3px_0_#e11d48] font-black';
                    }
                  } else if (isSelected) {
                    btnStyle = 'border-sky-500 bg-sky-50 text-sky-900 shadow-[0_3px_0_#0284c7]';
                  }

                  return (
                    <button
                      key={i}
                      disabled={quizStatus !== null}
                      onClick={() => handleAnswerQuiz(opt)}
                      className={`p-3.5 rounded-2xl text-left font-bold text-xs sm:text-sm border-2 transition-all flex items-center justify-between cursor-pointer active:translate-y-0.5 ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-xs font-black text-gray-600">
                          {letter}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {quizStatus !== null && isCorrectAnswer && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {quizStatus !== null && isSelected && !isCorrectAnswer && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Instant Quiz Feedback */}
              {quizStatus === 'correct' && (
                <div className="p-3.5 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-emerald-800 text-xs font-bold animate-fade-in flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-black text-emerald-900">Boom! Spot on! (+15 XP)</div>
                    <div>{quiz.explanation}</div>
                  </div>
                </div>
              )}

              {quizStatus === 'wrong' && (
                <div className="p-3.5 bg-rose-50 border-2 border-rose-300 rounded-2xl text-rose-800 text-xs font-bold animate-fade-in flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-black text-rose-900">Not quite!</div>
                    <div>Correct answer is: <span className="font-black">{quiz.correctAnswer}</span></div>
                    <div className="mt-1 text-[11px] text-rose-700">{quiz.explanation}</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Controls Bar */}
        <div className="p-4 bg-white border-t-2 border-gray-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`p-2.5 rounded-xl border-2 border-gray-200 font-bold ${
                currentIndex === 0
                  ? 'opacity-40 cursor-not-allowed'
                  : 'hover:bg-gray-100 cursor-pointer text-gray-700'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === cards.length - 1}
              className={`p-2.5 rounded-xl border-2 border-gray-200 font-bold ${
                currentIndex === cards.length - 1
                  ? 'opacity-40 cursor-not-allowed'
                  : 'hover:bg-gray-100 cursor-pointer text-gray-700'
              }`}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2.5 flex-1 sm:flex-initial justify-end">
            <button
              onClick={handleReview}
              className="flex-1 sm:flex-initial px-4 py-2.5 duo-btn duo-btn-orange text-xs flex items-center justify-center gap-1.5"
            >
              <span>Review Again</span>
            </button>

            <button
              onClick={handleMaster}
              className="flex-1 sm:flex-initial px-5 py-2.5 duo-btn duo-btn-green text-xs flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Mastered! (+15 XP)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
