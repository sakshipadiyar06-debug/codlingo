// Duolingo-style Streak & Daily Login Engine with Spaced Repetition persistence

const STORAGE_KEY = 'clingo_user_profile_v2';

export const getTodayDateString = (offsetDays = 0) => {
  const d = new Date();
  if (offsetDays !== 0) {
    d.setDate(d.getDate() + offsetDays);
  }
  return d.toISOString().split('T')[0];
};

const getInitialState = () => {
  const today = getTodayDateString();
  // Provide a welcoming 3-day history so the user immediately sees a streak fire
  const yesterday = getTodayDateString(-1);
  const twoDaysAgo = getTodayDateString(-2);

  const initialHistory = {
    [twoDaysAgo]: { xp: 40, completed: true },
    [yesterday]: { xp: 60, completed: true },
    [today]: { xp: 20, completed: true }
  };

  return {
    username: 'Code Voyager',
    streak: 3,
    highestStreak: 7,
    lastLoginDate: today,
    streakFreezes: 1,
    freezeSavedDate: null,
    hearts: 5,
    maxHearts: 5,
    lastHeartLostAt: null,
    gems: 350,
    xp: 280,
    dailyXp: 20,
    dailyGoal: 50,
    history: initialHistory,
    completedCards: ['c-01', 'c-02'],
    cardConfidence: {
      'c-01': 'mastered',
      'c-02': 'learning'
    },
    // Simulated offset for immediate streak testing in UI
    dayOffset: 0
  };
};

export const loadUserState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = getInitialState();
      saveUserState(initial);
      return initial;
    }
    const state = JSON.parse(raw);
    return state;
  } catch (err) {
    console.error('Failed to load user state:', err);
    return getInitialState();
  }
};

export const saveUserState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save user state:', err);
  }
};

export const getCurrentDateWithOffset = (offset = 0) => {
  return getTodayDateString(offset);
};

export const processDailyStreakCheck = (currentState) => {
  const effectiveToday = getCurrentDateWithOffset(currentState.dayOffset);
  const lastDate = currentState.lastLoginDate;

  if (lastDate === effectiveToday) {
    return {
      status: 'active_today',
      streak: currentState.streak,
      state: currentState,
      message: `You're on a ${currentState.streak}-day streak! Keep going!`
    };
  }

  // Calculate day difference
  const lastD = new Date(lastDate);
  const currD = new Date(effectiveToday);
  const diffTime = currD.getTime() - lastD.getTime();
  const diffDays = Math.round(diffTime / (1000 * 3600 * 24));

  let updatedState = { ...currentState, lastLoginDate: effectiveToday };

  if (diffDays === 1) {
    // Normal streak continuation!
    updatedState.streak += 1;
    if (updatedState.streak > updatedState.highestStreak) {
      updatedState.highestStreak = updatedState.streak;
    }
    // Daily login bonus: +20 Gems
    updatedState.gems += 20;
    updatedState.dailyXp = 0; // reset daily counter

    // Mark today in history
    if (!updatedState.history[effectiveToday]) {
      updatedState.history[effectiveToday] = { xp: 0, completed: false };
    }

    saveUserState(updatedState);
    return {
      status: 'streak_extended',
      streak: updatedState.streak,
      bonusGems: 20,
      state: updatedState,
      message: `Streak extended to ${updatedState.streak} days! +20 Gems earned!`
    };
  } else if (diffDays === 2 && currentState.streakFreezes > 0) {
    // Streak freeze consumed!
    updatedState.streakFreezes -= 1;
    updatedState.freezeSavedDate = effectiveToday;
    updatedState.dailyXp = 0;

    saveUserState(updatedState);
    return {
      status: 'freeze_used',
      streak: updatedState.streak,
      state: updatedState,
      message: `Streak Freeze activated! Your ${updatedState.streak}-day streak was saved.`
    };
  } else {
    // Streak broke
    const prevStreak = currentState.streak;
    updatedState.streak = 1;
    updatedState.dailyXp = 0;

    saveUserState(updatedState);
    return {
      status: 'streak_reset',
      previousStreak: prevStreak,
      streak: 1,
      state: updatedState,
      message: `You missed a day and had no streak freeze. Streak reset to 1. Rebuild today!`
    };
  }
};
