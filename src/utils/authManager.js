// CodLingo Account & Authentication Manager (Local & Multi-Profile Support)

const ACCOUNTS_REGISTRY_KEY = 'codlingo_accounts_v1';
const ACTIVE_USER_ID_KEY = 'codlingo_active_user_id_v1';

export const AVATARS = [
  { id: 'crab', emoji: '🦀', name: 'Clingy Crab', bg: 'bg-rose-100 border-rose-300' },
  { id: 'python', emoji: '🐍', name: 'Python Viper', bg: 'bg-emerald-100 border-emerald-300' },
  { id: 'ninja', emoji: '🥷', name: 'Code Ninja', bg: 'bg-slate-100 border-slate-300' },
  { id: 'robot', emoji: '🤖', name: 'Robo Coder', bg: 'bg-sky-100 border-sky-300' },
  { id: 'wizard', emoji: '🧙‍♂️', name: 'Java Wizard', bg: 'bg-purple-100 border-purple-300' },
  { id: 'rocket', emoji: '🚀', name: 'Tech Pilot', bg: 'bg-amber-100 border-amber-300' },
  { id: 'fox', emoji: '🦊', name: 'Byte Fox', bg: 'bg-orange-100 border-orange-300' },
  { id: 'owl', emoji: '🦉', name: 'Web Owl', bg: 'bg-cyan-100 border-cyan-300' }
];

const getTodayDateString = (offsetDays = 0) => {
  const d = new Date();
  if (offsetDays !== 0) d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
};

const createInitialUser = (username = 'AlexCoder', email = 'alex@codlingo.dev', avatar = 'crab') => {
  const today = getTodayDateString();
  const yesterday = getTodayDateString(-1);
  const twoDaysAgo = getTodayDateString(-2);

  return {
    id: 'user_' + Date.now(),
    username,
    email,
    avatar,
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
    currentLanguage: 'c',
    completedCards: ['c-01', 'c-02'],
    cardConfidence: {
      'c-01': 'mastered',
      'c-02': 'learning'
    },
    history: {
      [twoDaysAgo]: { xp: 40, completed: true },
      [yesterday]: { xp: 60, completed: true },
      [today]: { xp: 20, completed: true }
    },
    dayOffset: 0,
    createdAt: new Date().toISOString()
  };
};

export const loadAllAccounts = () => {
  try {
    const raw = localStorage.getItem(ACCOUNTS_REGISTRY_KEY);
    if (!raw) {
      const defaultUser = createInitialUser();
      const accounts = [defaultUser];
      localStorage.setItem(ACCOUNTS_REGISTRY_KEY, JSON.stringify(accounts));
      localStorage.setItem(ACTIVE_USER_ID_KEY, defaultUser.id);
      return accounts;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load accounts:', e);
    return [createInitialUser()];
  }
};

export const getActiveAccount = () => {
  const accounts = loadAllAccounts();
  const activeId = localStorage.getItem(ACTIVE_USER_ID_KEY);
  const found = accounts.find((a) => a.id === activeId);
  return found || accounts[0];
};

export const saveActiveAccount = (user) => {
  try {
    const accounts = loadAllAccounts();
    const updated = accounts.map((a) => (a.id === user.id ? user : a));
    // If not found, push
    if (!updated.some((a) => a.id === user.id)) {
      updated.push(user);
    }
    localStorage.setItem(ACCOUNTS_REGISTRY_KEY, JSON.stringify(updated));
    localStorage.setItem(ACTIVE_USER_ID_KEY, user.id);
  } catch (e) {
    console.error('Failed to save account:', e);
  }
};

export const registerAccount = (username, email, avatar = 'crab') => {
  const accounts = loadAllAccounts();
  // Check if exists
  const existing = accounts.find(
    (a) => a.email.toLowerCase() === email.toLowerCase() || a.username.toLowerCase() === username.toLowerCase()
  );
  if (existing) {
    return { success: false, message: 'An account with that username or email already exists!' };
  }

  const newUser = createInitialUser(username, email, avatar);
  newUser.streak = 1;
  newUser.xp = 0;
  newUser.dailyXp = 0;
  newUser.gems = 100; // Welcome gift
  newUser.completedCards = [];
  newUser.cardConfidence = {};

  accounts.push(newUser);
  localStorage.setItem(ACCOUNTS_REGISTRY_KEY, JSON.stringify(accounts));
  localStorage.setItem(ACTIVE_USER_ID_KEY, newUser.id);

  return { success: true, user: newUser };
};

export const switchAccount = (userId) => {
  const accounts = loadAllAccounts();
  const found = accounts.find((a) => a.id === userId);
  if (found) {
    localStorage.setItem(ACTIVE_USER_ID_KEY, found.id);
    return found;
  }
  return null;
};
