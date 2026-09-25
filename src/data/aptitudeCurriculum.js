// CodLingo Aptitude & Placement Reasoning Dataset
// High-yield Quantitative, Logical, and Interview Probability problems with 4-Option Quizzes

export const APTITUDE_UNITS = [
  {
    id: 'apt-u1',
    number: 1,
    title: 'Quantitative: Time, Work & Relative Speed',
    description: 'Work reciprocal formulas, relative speeds of trains, and efficiency rates.',
    color: 'from-amber-500 to-orange-600',
    cards: ['apt-01', 'apt-02', 'apt-03']
  },
  {
    id: 'apt-u2',
    number: 2,
    title: 'Probability, Dice & Combinations',
    description: 'Dice sums, card draws, independent events, and nCr combination tricks.',
    color: 'from-emerald-500 to-teal-600',
    cards: ['apt-04', 'apt-05', 'apt-06']
  },
  {
    id: 'apt-u3',
    number: 3,
    title: 'Logical Reasoning & Brain Teasers',
    description: 'Clock angle formula, seating arrangements, and deduction puzzles.',
    color: 'from-purple-500 to-pink-600',
    cards: ['apt-07', 'apt-08']
  }
];

export const APTITUDE_CARDS = [
  {
    id: 'apt-01',
    unitId: 'apt-u1',
    title: 'Time & Work: Combined Rate Formula',
    tag: 'Quant Aptitude',
    front: {
      question: 'A can finish a task in 10 days, and B can finish it in 15 days. Working together, how many days will they take?',
      code: `Rate A = 1/10 per day\nRate B = 1/15 per day\nCombined Rate = 1/10 + 1/15`,
      hint: 'Find the combined daily work fraction: (3 + 2) / 30 = 5/30 = 1/6.'
    },
    back: {
      concept: 'Harmonic Work Rate Principle',
      explanation: 'Work done per day = 1/A + 1/B = (A + B) / (A * B).\nTotal days taken = (A * B) / (A + B) = (10 * 15) / (10 + 15) = 150 / 25 = 6 days.',
      mnemonic: 'Product over Sum: (A * B) / (A + B)',
      codeSnippet: `// Shortcut: (10 * 15) / (10 + 15) = 6 days`
    },
    quiz: {
      question: 'If A takes 10 days and B takes 15 days, in how many days can they complete the work together?',
      options: ['6 days', '7.5 days', '5 days', '12 days'],
      correctAnswer: '6 days',
      explanation: 'Formula: (A * B) / (A + B) = (10 * 15) / (10 + 15) = 150 / 25 = 6 days.'
    },
    drill: {
      type: 'predict-output',
      prompt: 'If A takes 20 days and B takes 30 days, how many days do they take together?',
      options: ['12 days', '25 days', '15 days', '10 days'],
      correctAnswer: '12 days',
      explanation: '(20 * 30) / (20 + 30) = 600 / 50 = 12 days.'
    }
  },
  {
    id: 'apt-02',
    unitId: 'apt-u1',
    title: 'Relative Speed of Two Moving Objects',
    tag: 'Speed & Distance',
    front: {
      question: 'How do you calculate Relative Speed when two objects travel towards each other vs in the same direction?',
      code: `Towards each other: S_rel = S1 + S2\nSame direction: S_rel = |S1 - S2|`,
      hint: 'When moving towards each other, the distance between them shrinks faster.'
    },
    back: {
      concept: 'Relative Velocity Frame',
      explanation: '1. Opposite directions (towards each other): Speeds ADD together ($S_1 + S_2$) because they close distance at combined speed.\n2. Same direction: Speeds SUBTRACT ($|S_1 - S_2|$) because one is only gaining by the difference.',
      mnemonic: 'Opposite = ADD. Same = SUBTRACT.',
      codeSnippet: `Distance = Relative_Speed * Time`
    },
    quiz: {
      question: 'Two trains at 60 km/h and 40 km/h travel TOWARDS each other. What is their relative speed?',
      options: ['100 km/h', '20 km/h', '50 km/h', '2400 km/h'],
      correctAnswer: '100 km/h',
      explanation: 'When moving towards each other, relative speed is the sum: 60 + 40 = 100 km/h.'
    },
    drill: {
      type: 'predict-output',
      prompt: 'What is the relative speed of two cars driving in the SAME direction at 80 km/h and 50 km/h?',
      options: ['30 km/h', '130 km/h', '40 km/h', '15 km/h'],
      correctAnswer: '30 km/h',
      explanation: 'Same direction subtracts: 80 - 50 = 30 km/h.'
    }
  },
  {
    id: 'apt-03',
    unitId: 'apt-u1',
    title: 'Percentage Successive Discount Shortcut',
    tag: 'Percentages',
    front: {
      question: 'A store offers successive discounts of 20% and 10%. What is the single equivalent overall discount percentage?',
      code: `Net Change = a + b + (a * b) / 100\nWith discounts: a = -20, b = -10`,
      hint: 'It is NOT 30%! The second discount applies to the already discounted price.'
    },
    back: {
      concept: 'Successive Percentage Formula',
      explanation: 'Net change = a + b + (ab / 100)\n= -20 + (-10) + ((-20 * -10) / 100)\n= -30 + 2 = -28%.\nThe single equivalent discount is exactly 28%.',
      mnemonic: 'Discounts compound on the reduced amount, not the original 100%!',
      codeSnippet: `100 * 0.80 * 0.90 = 72 (28% off)`
    },
    quiz: {
      question: 'What is the single equivalent discount of two successive discounts of 20% and 10%?',
      options: ['28%', '30%', '25%', '22%'],
      correctAnswer: '28%',
      explanation: '100 -> minus 20% = 80 -> minus 10% (8) = 72. Total discount = 100 - 72 = 28%.'
    },
    drill: {
      type: 'predict-output',
      prompt: 'What is the equivalent single discount for successive 50% and 50% discounts?',
      options: ['75%', '100% (Free)', '80%', '50%'],
      correctAnswer: '75%',
      explanation: '100 -> 50 -> 25. You pay 25%, so the discount is 75%!'
    }
  },

  // UNIT 2
  {
    id: 'apt-04',
    unitId: 'apt-u2',
    title: 'Two Dice Sum: Probability of Rolling 7',
    tag: 'Probability',
    front: {
      question: 'When rolling two fair 6-sided dice, why is the sum of 7 the most probable outcome, and what is its probability?',
      code: `Outcomes: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1)\nTotal sample space: 6 * 6 = 36`,
      hint: 'There are 6 distinct combinations that sum to 7 out of 36 possibilities.'
    },
    back: {
      concept: 'Symmetric Dice Sum Distribution',
      explanation: 'There are 36 total outcomes ($6 \\times 6$). Exactly 6 pairs sum to 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). Probability = $6/36 = 1/6$ (approximately 16.67%).',
      mnemonic: '7 is lucky in dice because it has the most combinations (6)!',
      codeSnippet: `P(Sum = 7) = 6 / 36 = 1/6`
    },
    quiz: {
      question: 'What is the probability of rolling a sum of 7 with two standard 6-sided dice?',
      options: ['1/6', '1/12', '7/36', '1/7'],
      correctAnswer: '1/6',
      explanation: '6 favorable outcomes out of 36 total = 6/36 = 1/6.'
    },
    drill: {
      type: 'predict-output',
      prompt: 'How many total outcomes exist when rolling two 6-sided dice?',
      options: ['36', '12', '24', '64'],
      correctAnswer: '36',
      explanation: '6 * 6 = 36 total combinations.'
    }
  },
  {
    id: 'apt-05',
    unitId: 'apt-u2',
    title: 'Combinations vs Permutations (nCr vs nPr)',
    tag: 'Combinatorics',
    front: {
      question: 'In how many ways can you select a committee of 3 people from a group of 5 candidates?',
      code: `Order does NOT matter -> Use Combination nCr:\n5C3 = 5! / (3! * 2!)`,
      hint: 'Permutation = Order matters (President, VP). Combination = Just selection.'
    },
    back: {
      concept: 'Unordered Subset Selection',
      explanation: 'Formula for nCr = n! / (r! * (n - r)!).\n$5C3 = (5 \\times 4 \\times 3) / (3 \\times 2 \\times 1) = 60 / 6 = 10$ ways.',
      mnemonic: 'Permutation = Position/Order. Combination = Collection/Group.',
      codeSnippet: `5C3 = (5 * 4) / (2 * 1) = 10`
    },
    quiz: {
      question: 'How many ways can 3 committee members be chosen from 5 people?',
      options: ['10', '60', '15', '120'],
      correctAnswer: '10',
      explanation: '5C3 = (5 * 4 * 3) / (3 * 2 * 1) = 10 ways.'
    },
    drill: {
      type: 'predict-output',
      prompt: 'What is the value of 4C2?',
      options: ['6', '12', '8', '24'],
      correctAnswer: '6',
      explanation: '4C2 = (4 * 3) / (2 * 1) = 6.'
    }
  },
  {
    id: 'apt-06',
    unitId: 'apt-u2',
    title: 'The Dirichlet / Pigeonhole Principle',
    tag: 'Discrete Logic',
    front: {
      question: 'In a room of 13 people, why is it mathematically GUARANTEED that at least two share the same birth month?',
      code: `Pigeons = 13 people\nPigeonholes = 12 calendar months`,
      hint: 'If n items are put into m containers and n > m, at least one container must hold > 1 item.'
    },
    back: {
      concept: 'Pigeonhole Guarantee',
      explanation: 'If there are 12 calendar months (pigeonholes) and 13 people (pigeons), even if the first 12 people were born in 12 different months, the 13th person MUST share a birth month with someone.',
      mnemonic: 'More pigeons than holes? They must share!',
      codeSnippet: `ceil(13 / 12) = 2 people guaranteed`
    },
    quiz: {
      question: 'What is the minimum number of socks you must draw from a drawer with black and white socks to guarantee a matching pair?',
      options: ['3', '2', '4', 'Depends on sock count'],
      correctAnswer: '3',
      explanation: 'There are 2 colors (holes). By Pigeonhole Principle, drawing 2 + 1 = 3 socks guarantees at least two of the same color.'
    },
    drill: {
      type: 'predict-output',
      prompt: 'With 3 colors of socks, how many must you pull out to guarantee at least one matching pair?',
      options: ['4', '3', '6', '5'],
      correctAnswer: '4',
      explanation: '3 colors + 1 = 4 socks guarantees a pair by Pigeonhole Principle.'
    }
  },

  // UNIT 3
  {
    id: 'apt-07',
    unitId: 'apt-u3',
    title: 'Clock Angle Formula: Hours vs Minutes',
    tag: 'Logical Puzzles',
    front: {
      question: 'What is the angle between the hour and minute hand of a clock at 3:30?',
      code: `Angle = |30*H - (11/2)*M|\nAt 3:30: H = 3, M = 30`,
      hint: 'Remember that at 3:30, the hour hand has moved halfway towards 4!'
    },
    back: {
      concept: 'Relative Hand Rotation',
      explanation: 'Minute hand moves at 6°/min. Hour hand moves at 0.5°/min (30°/hour).\nFormula: $\\theta = |30H - 5.5M|$\n$= |30(3) - 5.5(30)| = |90 - 165| = 75^\\circ$.',
      mnemonic: 'Angle = |30H - 5.5M|',
      codeSnippet: `Angle at 3:30 is exactly 75 degrees.`
    },
    quiz: {
      question: 'What is the angle between clock hands at 3:30?',
      options: ['75°', '90°', '60°', '85°'],
      correctAnswer: '75°',
      explanation: '|30(3) - 5.5(30)| = |90 - 165| = 75 degrees.'
    },
    drill: {
      type: 'predict-output',
      prompt: 'What angle do clock hands make at 9:00?',
      options: ['90°', '270°', '120°', '180°'],
      correctAnswer: '90°',
      explanation: 'At 9:00, hands are perpendicular at 90 degrees.'
    }
  },
  {
    id: 'apt-08',
    unitId: 'apt-u3',
    title: 'Syllogism: Logical Deductions',
    tag: 'Logical Reasoning',
    front: {
      question: 'Given:\n1. All Coders drink Coffee.\n2. Some Coffee drinkers love C.\nCan we logically conclude that "All Coders love C"?',
      code: `Premise 1: Coders ⊆ Coffee\nPremise 2: Coffee ∩ C ≠ ∅\nConclusion: Coders ⊆ C ?`,
      hint: 'The subset of Coffee drinkers who love C might not overlap with Coders at all!'
    },
    back: {
      concept: 'Venn Logic Intersections',
      explanation: 'No! Just because all Coders drink coffee and SOME coffee drinkers love C does not imply that the Coders are part of that specific subset. The conclusion does NOT strictly follow.',
      mnemonic: 'Unless the Venn circle is entirely inside, you cannot say "All"!',
      codeSnippet: `// Invalid deductive syllogism (Undistributed Middle)`
    },
    quiz: {
      question: 'If "All A are B" and "Some B are C", does it necessarily follow that "Some A are C"?',
      options: [
        'No, it does not necessarily follow',
        'Yes, it is guaranteed',
        'Only if C is larger than A',
        'Always false'
      ],
      correctAnswer: 'No, it does not necessarily follow',
      explanation: 'The overlap between B and C might lie completely outside the set A.'
    },
    drill: {
      type: 'predict-output',
      prompt: 'If "All P are Q" and "All Q are R", what can we definitively conclude?',
      options: ['All P are R', 'Some R are not P', 'No P are R', 'P is larger than R'],
      correctAnswer: 'All P are R',
      explanation: 'By transitivity of subsets: P ⊆ Q and Q ⊆ R implies P ⊆ R.'
    }
  }
];
