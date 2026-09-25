import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CoursePath } from './components/CoursePath';
import { FlashcardViewer } from './components/FlashcardViewer';
import { GameDrillModal } from './components/GameDrillModal';
import { DailyLoginModal } from './components/DailyLoginModal';
import { ShopModal } from './components/ShopModal';
import { DevTimeTraveler } from './components/DevTimeTraveler';
import { LanguageSelectorModal } from './components/LanguageSelectorModal';
import { AuthModal } from './components/AuthModal';
import { Mascot } from './components/Mascot';
import {
  getActiveAccount,
  saveActiveAccount,
  AVATARS
} from './utils/authManager';
import {
  processDailyStreakCheck,
  getCurrentDateWithOffset
} from './utils/streakManager';
import { LANGUAGES, CURRICULUM_BY_LANG } from './data/languagesData';
import { sound } from './utils/audio';
import {
  Flame,
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  BookOpen,
  User,
  Zap
} from 'lucide-react';
import './App.css';

export function App() {
  const [userState, setUserState] = useState(() => getActiveAccount());
  const [currentLanguage, setCurrentLanguage] = useState(
    () => userState.currentLanguage || 'c'
  );
  const [activeModal, setActiveModal] = useState(null); // 'streak' | 'shop' | 'dev' | 'lang' | 'auth' | null
  const [studyMode, setStudyMode] = useState('path'); // 'path' | 'learn' | 'game'
  const [toastMessage, setToastMessage] = useState(null);
  const [soundMuted, setSoundMuted] = useState(false);

  // Active language curriculum
  const currentLangInfo =
    LANGUAGES.find((l) => l.id === currentLanguage) || LANGUAGES[0];
  const langCurriculum = CURRICULUM_BY_LANG[currentLanguage] || CURRICULUM_BY_LANG.c;
  const currentUnits = langCurriculum.units || [];
  const currentCards = langCurriculum.cards || [];

  const [activeUnit, setActiveUnit] = useState(currentUnits[0] || null);
  const [activeCards, setActiveCards] = useState(currentCards);

  // Check Daily Streak status on mount
  useEffect(() => {
    const result = processDailyStreakCheck(userState);
    if (result.status === 'streak_extended') {
      showToast(`🔥 Streak Extended to ${result.streak} Days! +${result.bonusGems} Gems!`);
      setActiveModal('streak');
    } else if (result.status === 'freeze_used') {
      showToast(`🛡️ Streak Freeze Saved your ${result.streak}-Day Streak!`);
      setActiveModal('streak');
    }
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const updateState = (updater) => {
    setUserState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      saveActiveAccount(next);
      return next;
    });
  };

  const handleSelectLanguage = (langId) => {
    setCurrentLanguage(langId);
    updateState((prev) => ({ ...prev, currentLanguage: langId }));
    const targetCurriculum = CURRICULUM_BY_LANG[langId] || CURRICULUM_BY_LANG.c;
    setActiveUnit(targetCurriculum.units[0] || null);
    setActiveCards(targetCurriculum.cards || []);
    showToast(`Switched to ${LANGUAGES.find((l) => l.id === langId)?.name || langId} Track!`);
  };

  const handleUserChanged = (newUser) => {
    setUserState(newUser);
    setCurrentLanguage(newUser.currentLanguage || 'c');
    const targetCurriculum = CURRICULUM_BY_LANG[newUser.currentLanguage || 'c'] || CURRICULUM_BY_LANG.c;
    setActiveUnit(targetCurriculum.units[0] || null);
    setActiveCards(targetCurriculum.cards || []);
    showToast(`Welcome, ${newUser.username}!`);
  };

  const handleToggleSound = () => {
    const enabled = sound.toggleSound();
    setSoundMuted(!enabled);
  };

  // Launch Flashcard Learn Mode
  const handleStartLearn = (unit, specificCard = null) => {
    setActiveUnit(unit);
    const unitCards = currentCards.filter((c) => c.unitId === unit.id);
    if (specificCard) {
      const reordered = [
        specificCard,
        ...unitCards.filter((c) => c.id !== specificCard.id)
      ];
      setActiveCards(reordered);
    } else {
      setActiveCards(unitCards);
    }
    setStudyMode('learn');
  };

  // Launch Game Drill Mode
  const handleStartGame = (unit, specificCard = null) => {
    if (userState.hearts <= 0) {
      sound.playError();
      setActiveModal('shop');
      showToast('❤️ You need at least 1 heart to practice drills!');
      return;
    }
    setActiveUnit(unit);
    const unitCards = currentCards.filter((c) => c.unitId === unit.id && c.drill);
    if (specificCard && specificCard.drill) {
      const reordered = [
        specificCard,
        ...unitCards.filter((c) => c.id !== specificCard.id)
      ];
      setActiveCards(reordered);
    } else {
      setActiveCards(unitCards);
    }
    setStudyMode('game');
  };

  // Flashcard / Quiz Mastery
  const handleCardMastered = (cardId) => {
    updateState((prev) => {
      const completed = prev.completedCards?.includes(cardId)
        ? prev.completedCards
        : [...(prev.completedCards || []), cardId];

      const newXp = prev.xp + 15;
      const newDailyXp = prev.dailyXp + 15;

      return {
        ...prev,
        completedCards: completed,
        cardConfidence: {
          ...prev.cardConfidence,
          [cardId]: 'mastered'
        },
        xp: newXp,
        dailyXp: newDailyXp
      };
    });
    showToast('✨ Mastered! +15 XP');
  };

  const handleCardReview = (cardId) => {
    updateState((prev) => ({
      ...prev,
      cardConfidence: {
        ...prev.cardConfidence,
        [cardId]: 'learning'
      }
    }));
    showToast('Saved to review queue.');
  };

  // Lose Heart
  const handleLoseHeart = () => {
    updateState((prev) => ({
      ...prev,
      hearts: Math.max(0, prev.hearts - 1),
      lastHeartLostAt: Date.now()
    }));
  };

  // Reward after game drill
  const handleEarnReward = (xpBonus, gemsBonus) => {
    updateState((prev) => {
      const todayDate = getCurrentDateWithOffset(prev.dayOffset);
      const prevDay = prev.history[todayDate] || { xp: 0, completed: false };

      return {
        ...prev,
        xp: prev.xp + xpBonus,
        dailyXp: prev.dailyXp + xpBonus,
        gems: prev.gems + gemsBonus,
        history: {
          ...prev.history,
          [todayDate]: {
            xp: prevDay.xp + xpBonus,
            completed: true
          }
        }
      };
    });
    showToast(`🎉 Lesson Complete! +${xpBonus} XP, +${gemsBonus} Gems`);
  };

  // Daily Streak Reward Claim
  const handleClaimDailyBonus = () => {
    updateState((prev) => {
      const todayDate = getCurrentDateWithOffset(prev.dayOffset);
      return {
        ...prev,
        gems: prev.gems + 20,
        history: {
          ...prev.history,
          [todayDate]: {
            xp: (prev.history[todayDate]?.xp || 0) + 10,
            completed: true
          }
        }
      };
    });
    showToast('🎁 Daily Streak Bonus claimed! +20 Gems 💎');
  };

  // Time-Traveler / Testing Handlers
  const handleAdvanceDay = () => {
    const nextOffset = userState.dayOffset + 1;
    const tomorrowStr = getCurrentDateWithOffset(nextOffset);

    updateState((prev) => {
      const nextStreak = prev.streak + 1;
      return {
        ...prev,
        dayOffset: nextOffset,
        streak: nextStreak,
        highestStreak: Math.max(prev.highestStreak, nextStreak),
        lastLoginDate: tomorrowStr,
        dailyXp: 0,
        hearts: 5,
        history: {
          ...prev.history,
          [tomorrowStr]: { xp: 0, completed: true }
        }
      };
    });

    sound.playStreakFlame();
    showToast(`🚀 Advanced 1 Day! Streak is now ${userState.streak + 1} Days 🔥`);
  };

  const handleMissDay = () => {
    const skipOffset = userState.dayOffset + 2;
    const skippedDate = getCurrentDateWithOffset(skipOffset);

    if (userState.streakFreezes > 0) {
      updateState((prev) => ({
        ...prev,
        dayOffset: skipOffset,
        streakFreezes: prev.streakFreezes - 1,
        freezeSavedDate: skippedDate,
        lastLoginDate: skippedDate,
        dailyXp: 0
      }));
      sound.playSuccess();
      showToast(`🛡️ You missed a day, but your STREAK FREEZE saved your ${userState.streak}-day streak!`);
    } else {
      const oldStreak = userState.streak;
      updateState((prev) => ({
        ...prev,
        dayOffset: skipOffset,
        streak: 1,
        lastLoginDate: skippedDate,
        dailyXp: 0
      }));
      sound.playError();
      showToast(`⚠️ You missed a day without a streak freeze. Streak reset from ${oldStreak} to 1.`);
    }
  };

  const handleBuyFreeze = (cost) => {
    updateState((prev) => ({
      ...prev,
      gems: prev.gems - cost,
      streakFreezes: prev.streakFreezes + 1
    }));
    showToast('🛡️ Streak Freeze equipped!');
  };

  const handleRefillHearts = (cost) => {
    updateState((prev) => ({
      ...prev,
      gems: Math.max(0, prev.gems - cost),
      hearts: 5
    }));
    showToast('❤️ Hearts restored to 5/5!');
  };

  const handleAddGems = (amount) => {
    updateState((prev) => ({
      ...prev,
      gems: prev.gems + amount
    }));
    sound.playSuccess();
    showToast(`💎 Added +${amount} Gems!`);
  };

  const handleResetAll = () => {
    localStorage.clear();
    window.location.reload();
  };

  const todayStr = getCurrentDateWithOffset(userState.dayOffset);
  const hasClaimedToday = userState.history && userState.history[todayStr]?.completed;
  const currentAvatar = AVATARS.find((a) => a.id === userState.avatar) || AVATARS[0];

  return (
    <div className="min-h-screen bg-[#f7f9fa] flex flex-col font-sans">
      {/* Sticky Header with CodLingo Branding & User Profile */}
      <Header
        userState={userState}
        currentLangInfo={currentLangInfo}
        onOpenLanguageSelector={() => setActiveModal('lang')}
        onOpenStreakModal={() => setActiveModal('streak')}
        onOpenShop={() => setActiveModal('shop')}
        onOpenDevTraveler={() => setActiveModal('dev')}
        onOpenAuthModal={() => setActiveModal('auth')}
        soundMuted={soundMuted}
        onToggleSound={handleToggleSound}
      />

      {/* Floating Toast Alert */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 text-white px-5 py-2.5 rounded-2xl shadow-xl text-xs sm:text-sm font-black flex items-center gap-2 border border-slate-700 animate-fade-in">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Layout */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6 grid grid-cols-1 lg:grid-cols-[1fr_330px] gap-8">
        {/* Left Column: Learning Roadmap */}
        <section className="flex flex-col items-center">
          <CoursePath
            currentLangInfo={currentLangInfo}
            units={currentUnits}
            cards={currentCards}
            userState={userState}
            onStartLearn={handleStartLearn}
            onStartGame={handleStartGame}
            onOpenStreakModal={() => setActiveModal('streak')}
          />
        </section>

        {/* Right Sidebar: Profile, Daily Streak Widget, Mascot & Quests */}
        <aside className="hidden lg:flex flex-col gap-5 pt-4">
          {/* User Account / Profile Card */}
          <div
            onClick={() => {
              sound.playPop();
              setActiveModal('auth');
            }}
            className="p-4 rounded-3xl bg-white border-2 border-purple-200 hover:border-purple-400 transition-all cursor-pointer shadow-xs flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                <span>{currentAvatar.emoji}</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-gray-800 text-sm">
                    {userState.username || 'Coder'}
                  </span>
                  <span className="text-[10px] font-black uppercase text-purple-600 bg-purple-50 px-2 py-0.2 rounded-full">
                    Profile
                  </span>
                </div>
                <div className="text-xs font-bold text-gray-400 mt-0.5">
                  {userState.xp} Total XP • {userState.streak} Day Streak
                </div>
              </div>
            </div>
            <span className="text-xs font-black text-purple-600 bg-purple-50 px-2.5 py-1 rounded-xl">
              Switch ➔
            </span>
          </div>

          {/* Mascot Widget */}
          <div className="bg-white p-5 rounded-3xl border-2 border-gray-200 shadow-xs flex flex-col items-center text-center">
            <Mascot
              mood={userState.streak > 3 ? 'cheering' : 'happy'}
              message={
                userState.streak > 4
                  ? `Your ${currentLangInfo.name} streak is on fire! 🔥 Keep learning!`
                  : `Master ${currentLangInfo.name} with 4-option quizzes & flashcards!`
              }
              size="md"
            />
            <div className="mt-4 pt-4 border-t border-gray-100 w-full flex items-center justify-around text-xs font-black">
              <div className="flex flex-col items-center">
                <span className="text-gray-400 uppercase text-[10px]">Total XP</span>
                <span className="text-emerald-600 text-base">{userState.xp}</span>
              </div>
              <div className="h-6 w-px bg-gray-200" />
              <div className="flex flex-col items-center">
                <span className="text-gray-400 uppercase text-[10px]">Mastered</span>
                <span className="text-amber-500 text-base">
                  {userState.completedCards?.length || 0}
                </span>
              </div>
            </div>
          </div>

          {/* Daily Streak Card */}
          <div
            onClick={() => {
              sound.playPop();
              setActiveModal('streak');
            }}
            className="p-5 rounded-3xl bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 shadow-xs cursor-pointer hover:border-orange-300 transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-xs">
                  <Flame className="w-6 h-6 fill-white text-yellow-200 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="font-black text-gray-800 text-sm">Daily Streak</h4>
                  <div className="text-xs font-bold text-orange-600">
                    {userState.streak} Days Active
                  </div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-orange-400 group-hover:translate-x-1 transition-transform" />
            </div>

            <p className="text-xs font-bold text-gray-500">
              Practice any language today to keep your streak glowing!
            </p>

            {userState.streakFreezes > 0 ? (
              <div className="mt-3 py-1.5 px-3 rounded-xl bg-cyan-100/70 border border-cyan-300 text-cyan-800 text-[11px] font-black flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 fill-cyan-500" />
                <span>Streak Freeze Active (1 missed day safe)</span>
              </div>
            ) : (
              <div className="mt-3 py-1.5 px-3 rounded-xl bg-orange-100 text-orange-800 text-[11px] font-black flex items-center gap-1">
                <span>No freeze equipped! Buy in shop.</span>
              </div>
            )}
          </div>

          {/* Daily Quests Widget */}
          <div className="bg-white p-5 rounded-3xl border-2 border-gray-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-black text-gray-800 text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Daily Quests</span>
              </h4>
              <span className="text-[10px] font-black uppercase text-gray-400">
                Resets daily
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-extrabold text-gray-600">
                <span>Earn {userState.dailyGoal} XP today</span>
                <span>
                  {userState.dailyXp}/{userState.dailyGoal}
                </span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(100, (userState.dailyXp / userState.dailyGoal) * 100)}%`
                  }}
                />
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* MODAL 1: Flashcard & 4-Option Quiz Learn Mode */}
      {studyMode === 'learn' && (
        <FlashcardViewer
          cards={activeCards}
          unit={activeUnit}
          onClose={() => setStudyMode('path')}
          onCardMastered={handleCardMastered}
          onCardReview={handleCardReview}
          onStartDrill={(card) => handleStartGame(activeUnit, card)}
        />
      )}

      {/* MODAL 2: Duolingo Game Drill Mode */}
      {studyMode === 'game' && (
        <GameDrillModal
          cards={activeCards}
          unit={activeUnit}
          userState={userState}
          onClose={() => setStudyMode('path')}
          onLoseHeart={handleLoseHeart}
          onEarnReward={handleEarnReward}
          onOpenShop={() => setActiveModal('shop')}
        />
      )}

      {/* MODAL 3: Daily Login & Streak Heatmap */}
      <DailyLoginModal
        isOpen={activeModal === 'streak'}
        onClose={() => setActiveModal(null)}
        userState={userState}
        onClaimDailyBonus={handleClaimDailyBonus}
        hasClaimedToday={hasClaimedToday}
        onAdvanceDay={handleAdvanceDay}
        onMissDay={handleMissDay}
      />

      {/* MODAL 4: Duolingo Shop */}
      <ShopModal
        isOpen={activeModal === 'shop'}
        onClose={() => setActiveModal(null)}
        userState={userState}
        onBuyFreeze={handleBuyFreeze}
        onRefillHearts={handleRefillHearts}
      />

      {/* MODAL 5: Dev Time-Traveler Dock */}
      <DevTimeTraveler
        isOpen={activeModal === 'dev'}
        onClose={() => setActiveModal(null)}
        userState={userState}
        onAdvanceDay={handleAdvanceDay}
        onMissDay={handleMissDay}
        onAddGems={handleAddGems}
        onRefillHearts={handleRefillHearts}
        onResetAll={handleResetAll}
      />

      {/* MODAL 6: Course / Multi-Language Selector */}
      <LanguageSelectorModal
        isOpen={activeModal === 'lang'}
        onClose={() => setActiveModal(null)}
        currentLanguage={currentLanguage}
        onSelectLanguage={handleSelectLanguage}
      />

      {/* MODAL 7: User Profile / Account Switcher */}
      <AuthModal
        isOpen={activeModal === 'auth'}
        onClose={() => setActiveModal(null)}
        currentUser={userState}
        onUserChanged={handleUserChanged}
      />
    </div>
  );
}

export default App;
