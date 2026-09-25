// CodLingo Multi-Track Curriculum Database
// 250+ Questions per Section across all 10 Tracks (2,500+ Questions Total)

import { EXPANDED_DATASET } from './massiveDataset';

export const TRACK_CATEGORIES = [
  { id: 'all', name: 'All Tracks (10)', icon: '🌟' },
  { id: 'prog', name: 'Coding & Web (8)', icon: '💻' },
  { id: 'dsa', name: 'DSA & Algorithms (250+ Qs)', icon: '⚡' },
  { id: 'apt', name: 'Interview Aptitude (250+ Qs)', icon: '🧠' }
];

export const LANGUAGES = [
  // Coding & Web Tracks (250+ questions each)
  {
    id: 'c',
    category: 'prog',
    name: 'C',
    symbol: 'C',
    emoji: '🦀',
    mascotName: 'Clingy the Crab',
    themeColor: '#58cc02',
    accentColor: 'from-emerald-500 to-green-600',
    tagline: '250+ Questions: Pointers, memory allocation, formats, bitwise & structs'
  },
  {
    id: 'python',
    category: 'prog',
    name: 'Python',
    symbol: 'Py',
    emoji: '🐍',
    mascotName: 'Monty the Python',
    themeColor: '#3b82f6',
    accentColor: 'from-sky-500 to-blue-600',
    tagline: '250+ Questions: Comprehensions, slicing, dictionaries, lambdas & OOP'
  },
  {
    id: 'cpp',
    category: 'prog',
    name: 'C++',
    symbol: 'C++',
    emoji: '⚡',
    mascotName: 'Vector the Cheetah',
    themeColor: '#8b5cf6',
    accentColor: 'from-indigo-500 to-purple-600',
    tagline: '250+ Questions: STL vector, references, smart pointers RAII & templates'
  },
  {
    id: 'java',
    category: 'prog',
    name: 'Java',
    symbol: '☕',
    emoji: '☕',
    mascotName: 'Duke the Java Wizard',
    themeColor: '#f97316',
    accentColor: 'from-amber-500 to-orange-600',
    tagline: '250+ Questions: JVM, String pool, HashMap collisions & interfaces'
  },
  {
    id: 'sql',
    category: 'prog',
    name: 'SQL',
    symbol: 'SQL',
    emoji: '🗄️',
    mascotName: 'Schema the Beaver',
    themeColor: '#06b6d4',
    accentColor: 'from-cyan-500 to-teal-600',
    tagline: '250+ Questions: JOINs, GROUP BY, HAVING, ACID & index optimization'
  },
  {
    id: 'nosql',
    category: 'prog',
    name: 'NoSQL',
    symbol: 'NoSQL',
    emoji: '🍃',
    mascotName: 'BSON the Sloth',
    themeColor: '#10b981',
    accentColor: 'from-emerald-600 to-teal-700',
    tagline: '250+ Questions: MongoDB BSON, CAP theorem, Redis in-memory cache'
  },
  {
    id: 'html',
    category: 'prog',
    name: 'HTML5',
    symbol: 'HTML',
    emoji: '🌐',
    mascotName: 'Taggy the Owl',
    themeColor: '#ea580c',
    accentColor: 'from-orange-500 to-red-600',
    tagline: '250+ Questions: Semantics, web accessibility (a11y), forms & SEO'
  },
  {
    id: 'css',
    category: 'prog',
    name: 'CSS3',
    symbol: 'CSS',
    emoji: '🎨',
    mascotName: 'Flexy the Chameleon',
    themeColor: '#ec4899',
    accentColor: 'from-pink-500 to-rose-600',
    tagline: '250+ Questions: Flexbox centering, CSS Grid, box-sizing & selectors'
  },

  // DSA Track (250+ questions)
  {
    id: 'dsa',
    category: 'dsa',
    name: 'DSA & Algorithms',
    symbol: 'DSA',
    emoji: '🧮',
    mascotName: 'Algo the Tree Owl',
    themeColor: '#6366f1',
    accentColor: 'from-indigo-600 to-blue-700',
    tagline: '250+ Questions: Two pointers, sliding window, BST, BFS/DFS, DP & Big-O'
  },

  // Aptitude Track (250+ questions)
  {
    id: 'aptitude',
    category: 'apt',
    name: 'Aptitude & Logic',
    symbol: 'APT',
    emoji: '🧠',
    mascotName: 'Newton the Brainiac',
    themeColor: '#f59e0b',
    accentColor: 'from-amber-500 to-orange-600',
    tagline: '250+ Questions: Time & work, relative speed, dice probability & clock puzzles'
  }
];

export const CURRICULUM_BY_LANG = EXPANDED_DATASET;
