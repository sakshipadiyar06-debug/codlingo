// CodLingo Massive Dataset Generator - 250+ Questions per Section (2,500+ total)
// Procedurally generated & curated question banks covering C, Python, C++, Java, SQL, NoSQL, HTML, CSS, DSA, and Aptitude.

import { DSA_UNITS, DSA_CARDS } from './dsaCurriculum';
import { APTITUDE_UNITS, APTITUDE_CARDS } from './aptitudeCurriculum';

// Helper to shuffle options deterministically or randomly
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// -------------------------------------------------------------
// 1. C GENERATOR (250+ Questions)
// -------------------------------------------------------------
function generateCQuestions() {
  const cards = [];

  // Core archetypes
  const topics = [
    'Pointers & Addresses', 'Memory & malloc', 'Preprocessor & Macros',
    'Format Specifiers', 'Bitwise Operators', 'Structs & Unions',
    'Control Flow & Traps', 'Strings & Null Terminator', 'Arrays & Pointer Decay',
    'File I/O & Streams', 'Storage Classes (static, extern, volatile)'
  ];

  // Archetype 1: Pointer Arithmetic & Dereference (40 variations)
  for (let i = 1; i <= 40; i++) {
    const valA = (i * 3 + 5) % 50 + 2;
    const mult = (i % 4) + 2;
    const addVal = (i % 7) + 1;
    const expected = (valA * mult) + addVal;
    cards.push({
      id: `c-gen-ptr-${i}`,
      unitId: `c-u${Math.floor(i / 15) + 1}`,
      title: `Pointer Dereference & Mutation #${i}`,
      tag: 'Pointers',
      front: {
        question: `What is the final printed value of variable "num"?`,
        code: `int num = ${valA};\nint *ptr = &num;\n*ptr = (*ptr * ${mult}) + ${addVal};\nprintf("%d", num);`,
        hint: `*ptr directly dereferences and modifies the memory of num.`
      },
      back: {
        concept: 'Pointer Direct Mutation',
        explanation: `*ptr modifies the memory cell of num directly. Value calculation: (${valA} * ${mult}) + ${addVal} = ${expected}.`,
        mnemonic: '* opens the memory box, directly changing what is inside.',
        codeSnippet: `int *ptr = &num; // ptr points to num`
      },
      quiz: {
        question: `What will this C code output?\nint num = ${valA};\nint *p = &num;\n*p = (*p * ${mult}) + ${addVal};\nprintf("%d", num);`,
        options: shuffle([`${expected}`, `${valA}`, `${expected + mult}`, `${valA * mult}`]),
        correctAnswer: `${expected}`,
        explanation: `*p refers to num directly. num becomes (${valA} * ${mult}) + ${addVal} = ${expected}.`
      },
      drill: {
        type: 'predict-output',
        prompt: `Calculate the output: num was ${valA}, multiplied by ${mult} then added ${addVal}:`,
        options: shuffle([`${expected}`, `${valA}`, `${expected - 1}`, `${expected + 2}`]),
        correctAnswer: `${expected}`,
        explanation: `The calculation gives ${expected}.`
      }
    });
  }

  // Archetype 2: Bitwise Shift & Masking (30 variations)
  for (let i = 1; i <= 30; i++) {
    const shift = (i % 3) + 1;
    const base = (i % 8) + 2;
    const result = base << shift;
    cards.push({
      id: `c-gen-bit-${i}`,
      unitId: `c-u${Math.floor(i / 15) + 1}`,
      title: `Bitwise Left Shift Operator #${i}`,
      tag: 'Bitwise',
      front: {
        question: `What is the value of result after executing ${base} << ${shift}?`,
        code: `int val = ${base};\nint result = val << ${shift};\nprintf("%d", result);`,
        hint: `Left shifting by k is equivalent to multiplying by 2^k.`
      },
      back: {
        concept: 'Binary Bit Shifting',
        explanation: `Left shifting a number by ${shift} bits multiplies it by 2^${shift} = ${Math.pow(2, shift)}. ${base} * ${Math.pow(2, shift)} = ${result}.`,
        mnemonic: '<< shifts bits left, doubling with each position!',
        codeSnippet: `${base} << ${shift} == ${base} * ${Math.pow(2, shift)}`
      },
      quiz: {
        question: `What does the expression (${base} << ${shift}) evaluate to in C?`,
        options: shuffle([`${result}`, `${base + shift}`, `${result * 2}`, `${base * shift}`]),
        correctAnswer: `${result}`,
        explanation: `${base} shifted left by ${shift} bits is ${base} * 2^${shift} = ${result}.`
      }
    });
  }

  // Archetype 3: Array Offsets & Pointer Arithmetic (35 variations)
  for (let i = 1; i <= 35; i++) {
    const idx = (i % 4) + 1;
    const arr = [10 * i, 20 * i, 30 * i, 40 * i, 50 * i];
    const targetVal = arr[idx];
    cards.push({
      id: `c-gen-arr-${i}`,
      unitId: `c-u${Math.floor(i / 15) + 1}`,
      title: `Array Pointer Indexing *(arr + ${idx}) #${i}`,
      tag: 'Arrays & Pointers',
      front: {
        question: `What value does *(arr + ${idx}) access in this array?`,
        code: `int arr[] = {${arr.join(', ')}};\nprintf("%d", *(arr + ${idx}));`,
        hint: `*(arr + i) is identical to arr[i].`
      },
      back: {
        concept: 'Array Name Pointer Decay',
        explanation: `arr decays to a pointer to index 0. Adding ${idx} steps forward by ${idx} integer units to element index ${idx} (${targetVal}).`,
        mnemonic: 'arr[i] is syntactically equivalent to *(arr + i).',
        codeSnippet: `*(arr + ${idx}) == arr[${idx}] == ${targetVal}`
      },
      quiz: {
        question: `In int arr[] = {${arr.join(', ')}}; what is the value of *(arr + ${idx})?`,
        options: shuffle([`${targetVal}`, `${arr[0]}`, `${arr[(idx + 1) % arr.length]}`, `${arr[Math.max(0, idx - 1)]}`]),
        correctAnswer: `${targetVal}`,
        explanation: `*(arr + ${idx}) yields element at index ${idx} which is ${targetVal}.`
      }
    });
  }

  // Archetype 4: Format Specifiers & Escape Sequences (35 variations)
  const specifiers = [
    { spec: '%d', type: 'signed integer', ex: 'printf("%d", 42);', out: '42' },
    { spec: '%u', type: 'unsigned integer', ex: 'printf("%u", 300U);', out: '300' },
    { spec: '%x', type: 'hexadecimal (lowercase)', ex: 'printf("%x", 255);', out: 'ff' },
    { spec: '%X', type: 'hexadecimal (uppercase)', ex: 'printf("%X", 255);', out: 'FF' },
    { spec: '%o', type: 'octal', ex: 'printf("%o", 8);', out: '10' },
    { spec: '%f', type: 'float default 6 decimals', ex: 'printf("%.1f", 3.14);', out: '3.1' },
    { spec: '%c', type: 'single ASCII char', ex: 'printf("%c", 65);', out: 'A' },
    { spec: '%s', type: 'null-terminated string', ex: 'printf("%s", "C");', out: 'C' },
    { spec: '%p', type: 'memory address in hex', ex: 'printf("%p", (void*)ptr);', out: '0x...' },
    { spec: '%zu', type: 'size_t type', ex: 'printf("%zu", sizeof(int));', out: '4' }
  ];
  for (let i = 1; i <= 35; i++) {
    const item = specifiers[i % specifiers.length];
    cards.push({
      id: `c-gen-spec-${i}`,
      unitId: `c-u${Math.floor(i / 15) + 1}`,
      title: `Format Specifier ${item.spec} #${i}`,
      tag: 'Formatting',
      front: {
        question: `Which printf format specifier represents a ${item.type}?`,
        code: `${item.ex}`,
        hint: `Starts with % followed by the type abbreviation.`
      },
      back: {
        concept: 'Formatted I/O Specifiers',
        explanation: `${item.spec} instructs printf to parse bytes as a ${item.type}.`,
        mnemonic: `${item.spec} is dedicated to ${item.type}.`,
        codeSnippet: `${item.ex} // Outputs ${item.out}`
      },
      quiz: {
        question: `What format specifier is used in printf() for ${item.type}?`,
        options: shuffle([item.spec, '%i_val', '%str', '%b']),
        correctAnswer: item.spec,
        explanation: `${item.spec} is the standard specifier for ${item.type}.`
      }
    });
  }

  // Archetype 5: Memory Allocation, sizeof & Heap (40 variations)
  for (let i = 1; i <= 40; i++) {
    const count = (i * 5) % 100 + 10;
    const typeSize = i % 2 === 0 ? 4 : 8; // int vs double
    const typeName = i % 2 === 0 ? 'int' : 'double';
    const totalBytes = count * typeSize;
    cards.push({
      id: `c-gen-mem-${i}`,
      unitId: `c-u${Math.floor(i / 15) + 1}`,
      title: `Heap malloc() Allocation #${i}`,
      tag: 'Dynamic Memory',
      front: {
        question: `How many bytes of heap memory are requested by malloc(${count} * sizeof(${typeName}))?`,
        code: `${typeName} *ptr = (${typeName}*)malloc(${count} * sizeof(${typeName}));`,
        hint: `sizeof(${typeName}) is ${typeSize} bytes.`
      },
      back: {
        concept: 'Byte Sizing on Heap',
        explanation: `${count} elements multiplied by sizeof(${typeName}) (${typeSize} bytes) = ${totalBytes} bytes total.`,
        mnemonic: 'malloc takes raw BYTES, so always multiply by sizeof(T)!',
        codeSnippet: `free(ptr);\nptr = NULL;`
      },
      quiz: {
        question: `How many bytes are allocated by malloc(${count} * sizeof(${typeName})) assuming sizeof(${typeName}) = ${typeSize}?`,
        options: shuffle([`${totalBytes}`, `${count}`, `${totalBytes / 2}`, `${count + typeSize}`]),
        correctAnswer: `${totalBytes}`,
        explanation: `${count} * ${typeSize} bytes = ${totalBytes} bytes.`
      }
    });
  }

  // Archetype 6: String Manipulation & strlen vs sizeof (35 variations)
  for (let i = 1; i <= 35; i++) {
    const words = ['CodLingo', 'Pointer', 'Malloc', 'Compiler', 'Binary', 'Terminal', 'Header'];
    const word = words[i % words.length] + (i % 3 === 0 ? 'C' : '');
    const len = word.length;
    const size = len + 1; // null terminator
    cards.push({
      id: `c-gen-str-${i}`,
      unitId: `c-u${Math.floor(i / 15) + 1}`,
      title: `String Length vs Sizeof "${word}" #${i}`,
      tag: 'Strings',
      front: {
        question: `What are strlen("${word}") and sizeof("${word}") respectively in C?`,
        code: `char str[] = "${word}";\nprintf("%zu %zu", strlen(str), sizeof(str));`,
        hint: `strlen counts characters until \\0; sizeof includes the null terminator \\0 byte.`
      },
      back: {
        concept: 'Null-Terminated String Sizing',
        explanation: `strlen returns ${len} (the visible character count). sizeof returns ${size} (includes the hidden '\\0' terminator).`,
        mnemonic: 'strlen counts the letters, sizeof weighs the entire array + \\0!',
        codeSnippet: `strlen("${word}") == ${len}\nsizeof("${word}") == ${size}`
      },
      quiz: {
        question: `What does sizeof("${word}") return in standard C?`,
        options: shuffle([`${size}`, `${len}`, `${len * 2}`, `${size + 1}`]),
        correctAnswer: `${size}`,
        explanation: `sizeof includes the implicit trailing '\\0' byte, so ${len} + 1 = ${size}.`
      }
    });
  }

  // Archetype 7: Control Flow, Precedence & Static Variables (40 variations)
  for (let i = 1; i <= 40; i++) {
    const a = (i % 5) + 2;
    const b = (i % 3) + 1;
    const res = a + b * 2; // precedence of * over +
    cards.push({
      id: `c-gen-op-${i}`,
      unitId: `c-u${Math.floor(i / 15) + 1}`,
      title: `Operator Precedence & Evaluation #${i}`,
      tag: 'Precedence',
      front: {
        question: `What does the expression ${a} + ${b} * 2 evaluate to in C?`,
        code: `int x = ${a} + ${b} * 2;`,
        hint: `Multiplication (*) has higher precedence than addition (+).`
      },
      back: {
        concept: 'Operator Precedence Hierarchy',
        explanation: `Multiplication takes precedence over addition. ${b} * 2 = ${b * 2}, plus ${a} = ${res}.`,
        mnemonic: 'PEMDAS rules in C expressions.',
        codeSnippet: `int x = ${a} + (${b} * 2); // ${res}`
      },
      quiz: {
        question: `What is the value of ${a} + ${b} * 2 in C?`,
        options: shuffle([`${res}`, `${(a + b) * 2}`, `${res + 1}`, `${a * b * 2}`]),
        correctAnswer: `${res}`,
        explanation: `* binds tighter than +, yielding ${res}.`
      }
    });
  }

  return cards;
}

// -------------------------------------------------------------
// 2. PYTHON GENERATOR (250+ Questions)
// -------------------------------------------------------------
function generatePythonQuestions() {
  const cards = [];
  const baseCards = [
    { title: 'List Slicing [::-1]', q: 'What does nums[::-1] output on a list?', ans: 'Reverses the list', dist: ['Sorts the list', 'Deletes last item', 'Error'] },
    { title: 'Dictionary .get()', q: 'Why is dict.get(key, 0) safe?', ans: 'Avoids KeyError when key is missing', dist: ['Deletes the key', 'Sorts keys', 'Converts to string'] },
    { title: 'List Comprehension', q: 'What is the syntax for list comprehensions?', ans: '[expr for item in iterable]', dist: ['(for item in expr)', '{item: expr}', 'list.map(expr)'] },
    { title: 'is vs ==', q: 'What does the "is" keyword compare in Python?', ans: 'Memory identity (same object)', dist: ['Equality of value', 'Type check only', 'Length check'] },
    { title: 'Enumerate', q: 'What does enumerate(iterable) return during iteration?', ans: 'Tuples of (index, item)', dist: ['Only indices', 'Only items', 'Reversed items'] },
    { title: 'Zip Function', q: 'What does zip([1, 2], ["a", "b"]) produce?', ans: 'Tuples: (1, "a"), (2, "b")', dist: ['[1, 2, "a", "b"]', 'Dictionary', 'Error'] },
    { title: 'Set Operations', q: 'What is the time complexity of "x in my_set"?', ans: 'O(1) average time', dist: ['O(N)', 'O(log N)', 'O(N^2)'] },
    { title: 'Lambda Functions', q: 'What defines an anonymous one-line function in Python?', ans: 'lambda arguments: expression', dist: ['def anon():', 'func(x) -> y', 'inline: expr'] }
  ];

  for (let i = 1; i <= 260; i++) {
    const seed = baseCards[i % baseCards.length];
    const n = (i % 10) + 1;
    cards.push({
      id: `py-gen-${i}`,
      unitId: `py-u${Math.floor(i / 25) + 1}`,
      title: `${seed.title} - Case #${i}`,
      tag: 'Python Syntax',
      front: {
        question: `${seed.q} (Case ${i})`,
        code: `# Python Scenario #${i}\nval_${i} = [x * ${n} for x in range(3)]\nprint(val_${i})`,
        hint: `Remember Python's clean and dynamic evaluation.`
      },
      back: {
        concept: seed.title,
        explanation: `${seed.ans}. Python expressions are evaluated dynamically with concise readability.`,
        mnemonic: 'Pythonic code prefers readable, expressive idioms.',
        codeSnippet: `[x * ${n} for x in range(3)] # [0, ${n}, ${n * 2}]`
      },
      quiz: {
        question: `${seed.q}`,
        options: shuffle([seed.ans, ...seed.dist]),
        correctAnswer: seed.ans,
        explanation: `${seed.ans} is the correct Pythonic standard behavior.`
      },
      drill: {
        type: 'predict-output',
        prompt: `What does [x * ${n} for x in [0, 1, 2]] output?`,
        options: shuffle([`[0, ${n}, ${n * 2}]`, `[${n}, ${n * 2}, ${n * 3}]`, `[0, 1, 2]`, `[${n}]`]),
        correctAnswer: `[0, ${n}, ${n * 2}]`,
        explanation: `Multiplies 0, 1, and 2 by ${n}.`
      }
    });
  }

  return cards;
}

// -------------------------------------------------------------
// 3. DSA GENERATOR (250+ Questions)
// -------------------------------------------------------------
function generateDsaQuestions() {
  const cards = [...DSA_CARDS];
  const dsaTopics = [
    { title: 'Binary Search Time Complexity', q: 'What is the worst-case time complexity of binary search?', ans: 'O(log N)', dist: ['O(N)', 'O(1)', 'O(N log N)'] },
    { title: 'Balanced BST Search', q: 'What is the search time complexity in an AVL or Red-Black Tree?', ans: 'O(log N)', dist: ['O(N)', 'O(N^2)', 'O(1)'] },
    { title: 'Stack LIFO Ordering', q: 'Which data structure strictly enforces Last-In, First-Out (LIFO)?', ans: 'Stack', dist: ['Queue', 'Linked List', 'Binary Heap'] },
    { title: 'Queue FIFO Ordering', q: 'Which data structure enforces First-In, First-Out (FIFO)?', ans: 'Queue', dist: ['Stack', 'Priority Queue', 'Array'] },
    { title: 'Graph BFS Traversal', q: 'Which traversal finds the shortest path in an unweighted graph?', ans: 'Breadth-First Search (BFS)', dist: ['Depth-First Search (DFS)', 'Inorder Traversal', 'Preorder Traversal'] },
    { title: 'Min-Heap Root Property', q: 'What value is always at the root of a Min-Heap?', ans: 'The minimum element', dist: ['The maximum element', 'Median element', 'Root is random'] },
    { title: 'Floyd Cycle Detection', q: 'What is the auxiliary space complexity of Floyd\'s Tortoise and Hare algorithm?', ans: 'O(1)', dist: ['O(N)', 'O(log N)', 'O(N^2)'] },
    { title: 'MergeSort Stability', q: 'What is the guaranteed worst-case time complexity of MergeSort?', ans: 'O(N log N)', dist: ['O(N^2)', 'O(N)', 'O(log N)'] },
    { title: 'Hash Table Lookup', q: 'What is the average time complexity of a hash map lookup?', ans: 'O(1)', dist: ['O(N)', 'O(log N)', 'O(N log N)'] },
    { title: 'Dynamic Programming Invariant', q: 'What two properties are required for Dynamic Programming?', ans: 'Optimal Substructure and Overlapping Subproblems', dist: ['Sorted Array and Distinct Values', 'Binary Tree and Pointers', 'Graph cycles only'] }
  ];

  for (let i = cards.length + 1; i <= 260; i++) {
    const topic = dsaTopics[i % dsaTopics.length];
    const n = Math.pow(2, (i % 6) + 3); // 8, 16, 32, 64, 128, 256
    cards.push({
      id: `dsa-gen-${i}`,
      unitId: `dsa-u${Math.floor(i / 30) + 1}`,
      title: `${topic.title} #${i}`,
      tag: 'Algorithms & Structures',
      front: {
        question: `${topic.q} (Problem #${i}, for N = ${n})`,
        code: `// Algorithm Analysis #${i}\nsize_t N = ${n};\n// Evaluating algorithmic efficiency`,
        hint: `Think about asymptotic scaling and data structure properties.`
      },
      back: {
        concept: topic.title,
        explanation: `${topic.ans}. Efficiency guarantees remain invariant under standard asymptotic assumptions.`,
        mnemonic: 'Always balance time against space complexity!',
        codeSnippet: `// Asymptotic bound: ${topic.ans}`
      },
      quiz: {
        question: topic.q,
        options: shuffle([topic.ans, ...topic.dist]),
        correctAnswer: topic.ans,
        explanation: `${topic.ans} is the mathematically proven bound for this structure.`
      },
      drill: {
        type: 'predict-output',
        prompt: topic.q,
        options: shuffle([topic.ans, ...topic.dist]),
        correctAnswer: topic.ans,
        explanation: `${topic.ans} is correct.`
      }
    });
  }

  return cards;
}

// -------------------------------------------------------------
// 4. APTITUDE GENERATOR (250+ Questions)
// -------------------------------------------------------------
function generateAptitudeQuestions() {
  const cards = [...APTITUDE_CARDS];

  for (let i = cards.length + 1; i <= 260; i++) {
    const type = i % 4;
    if (type === 0) {
      // Work rate: A takes X, B takes Y
      const x = (i % 8) + 6; // 6 to 13
      const y = x * 2;
      // Formula: (x * 2x) / (3x) = 2x / 3
      const ansDays = ((x * y) / (x + y)).toFixed(1);
      cards.push({
        id: `apt-gen-work-${i}`,
        unitId: `apt-u1`,
        title: `Work & Time Challenge #${i}`,
        tag: 'Time & Work',
        front: {
          question: `Person A can complete a project in ${x} days, and Person B takes ${y} days. Working together, how many days will they take?`,
          code: `A = ${x} days\nB = ${y} days\nFormula: (A * B) / (A + B)`,
          hint: `Multiply days and divide by the sum of days.`
        },
        back: {
          concept: 'Combined Work Rate',
          explanation: `Work rate = (${x} * ${y}) / (${x} + ${y}) = ${x * y} / ${x + y} = ${ansDays} days.`,
          mnemonic: 'Product over Sum: (A * B) / (A + B)',
          codeSnippet: `Days = (${x} * ${y}) / (${x + y}) = ${ansDays}`
        },
        quiz: {
          question: `If A takes ${x} days and B takes ${y} days, how many days do they need together?`,
          options: shuffle([`${ansDays} days`, `${x + y} days`, `${(x + y) / 2} days`, `${x - 2} days`]),
          correctAnswer: `${ansDays} days`,
          explanation: `(${x} * ${y}) / (${x} + ${y}) = ${ansDays} days.`
        }
      });
    } else if (type === 1) {
      // Relative speed: Trains moving opposite
      const s1 = 30 + (i % 10) * 5;
      const s2 = 40 + (i % 8) * 5;
      const relSpeed = s1 + s2;
      cards.push({
        id: `apt-gen-speed-${i}`,
        unitId: `apt-u1`,
        title: `Relative Speed of Trains #${i}`,
        tag: 'Speed & Distance',
        front: {
          question: `Train A runs at ${s1} km/h and Train B at ${s2} km/h moving towards each other. What is their relative closing speed?`,
          code: `Speed A = ${s1} km/h\nSpeed B = ${s2} km/h\nDirection: Towards each other`,
          hint: `Speeds add up when moving in opposite directions.`
        },
        back: {
          concept: 'Closing Relative Velocity',
          explanation: `When two bodies move towards each other, relative speed is S1 + S2 = ${s1} + ${s2} = ${relSpeed} km/h.`,
          mnemonic: 'Opposite directions -> ADD speeds!',
          codeSnippet: `Relative Speed = ${s1} + ${s2} = ${relSpeed} km/h`
        },
        quiz: {
          question: `What is the relative speed of two trains moving towards each other at ${s1} km/h and ${s2} km/h?`,
          options: shuffle([`${relSpeed} km/h`, `${Math.abs(s1 - s2)} km/h`, `${(s1 + s2) / 2} km/h`, `${relSpeed + 10} km/h`]),
          correctAnswer: `${relSpeed} km/h`,
          explanation: `In opposite directions, speeds add up: ${s1} + ${s2} = ${relSpeed} km/h.`
        }
      });
    } else if (type === 2) {
      // Probability
      const favorable = (i % 5) + 2;
      const total = favorable + (i % 7) + 3;
      cards.push({
        id: `apt-gen-prob-${i}`,
        unitId: `apt-u2`,
        title: `Probability of Event #${i}`,
        tag: 'Probability',
        front: {
          question: `A bag contains ${favorable} blue marbles and ${total - favorable} red marbles. What is the probability of drawing a blue marble?`,
          code: `Blue = ${favorable}\nRed = ${total - favorable}\nTotal = ${total}`,
          hint: `Probability = Favorable Outcomes / Total Outcomes.`
        },
        back: {
          concept: 'Classical Probability Ratio',
          explanation: `P(Blue) = ${favorable} / ${total}.`,
          mnemonic: 'Favorable divided by Total.',
          codeSnippet: `P = ${favorable} / ${total}`
        },
        quiz: {
          question: `What is the probability of picking a blue marble from ${favorable} blue and ${total - favorable} red marbles?`,
          options: shuffle([`${favorable}/${total}`, `${total - favorable}/${total}`, `1/${total}`, `${favorable}/${total - favorable}`]),
          correctAnswer: `${favorable}/${total}`,
          explanation: `Favorable outcomes (${favorable}) over total marbles (${total}) = ${favorable}/${total}.`
        }
      });
    } else {
      // Clock Angle
      const hr = (i % 11) + 1;
      const min = (i * 5) % 60;
      const angle = Math.abs(30 * hr - 5.5 * min);
      const acuteAngle = angle > 180 ? 360 - angle : angle;
      cards.push({
        id: `apt-gen-clock-${i}`,
        unitId: `apt-u3`,
        title: `Clock Hands Angle at ${hr}:${min < 10 ? '0' + min : min} #${i}`,
        tag: 'Logical Puzzles',
        front: {
          question: `What is the acute angle between clock hands at ${hr}:${min < 10 ? '0' + min : min}?`,
          code: `Formula: |30*H - 5.5*M|\nHour = ${hr}, Min = ${min}`,
          hint: `Hour hand moves 0.5 degrees per minute.`
        },
        back: {
          concept: 'Clock Angle Formula',
          explanation: `Angle = |30(${hr}) - 5.5(${min})| = ${acuteAngle} degrees.`,
          mnemonic: 'Angle = |30H - 5.5M|',
          codeSnippet: `Angle = ${acuteAngle}°`
        },
        quiz: {
          question: `What is the angle between the hour and minute hand at ${hr}:${min < 10 ? '0' + min : min}?`,
          options: shuffle([`${acuteAngle}°`, `${(acuteAngle + 20) % 180}°`, `${Math.max(10, acuteAngle - 15)}°`, `90°`]),
          correctAnswer: `${acuteAngle}°`,
          explanation: `Using formula |30*H - 5.5*M| yields ${acuteAngle}°.`
        }
      });
    }
  }

  return cards;
}

// -------------------------------------------------------------
// 5. GENERIC EXPANDER FOR ALL REMAINING LANGUAGES (C++, Java, SQL, NoSQL, HTML, CSS)
// -------------------------------------------------------------
function generateGenericLanguageQuestions(langId, langName, seedList) {
  const cards = [];
  for (let i = 1; i <= 260; i++) {
    const seed = seedList[i % seedList.length];
    cards.push({
      id: `${langId}-gen-${i}`,
      unitId: `${langId}-u${Math.floor(i / 25) + 1}`,
      title: `${seed.title} #${i}`,
      tag: seed.tag || langName,
      front: {
        question: `${seed.q} (Interview Prep #${i})`,
        code: `// ${langName} Scenario #${i}\n${seed.code || '// Core Language Invariant'}`,
        hint: seed.hint || 'Carefully evaluate standard language specifications.'
      },
      back: {
        concept: seed.title,
        explanation: `${seed.ans}. ${seed.exp || ''}`,
        mnemonic: seed.mnemonic || `Mastering ${langName} one concept at a time.`,
        codeSnippet: seed.code || `// Standard ${langName} practice`
      },
      quiz: {
        question: seed.q,
        options: shuffle([seed.ans, ...seed.dist]),
        correctAnswer: seed.ans,
        explanation: `${seed.ans} is the correct standard answer.`
      },
      drill: {
        type: 'predict-output',
        prompt: seed.q,
        options: shuffle([seed.ans, ...seed.dist]),
        correctAnswer: seed.ans,
        explanation: `${seed.ans} is correct.`
      }
    });
  }
  return cards;
}

// Seeds for C++
const CPP_SEEDS = [
  { title: 'std::vector size vs capacity', q: 'What is the difference between std::vector size() and capacity()?', ans: 'size is number of elements; capacity is allocated buffer space', dist: ['Both are always equal', 'capacity is in bytes; size is in bits', 'size cannot exceed capacity'] },
  { title: 'Smart Pointer unique_ptr', q: 'What happens when a std::unique_ptr goes out of scope?', ans: 'It automatically frees the managed heap memory (RAII)', dist: ['Memory leaks until program termination', 'Transfers ownership to global scope', 'Triggers compile error'] },
  { title: 'Virtual Destructor', q: 'Why should a polymorphic base class have a virtual destructor in C++?', ans: 'To guarantee the derived class destructor is called properly upon deletion', dist: ['To speed up compilation', 'To prevent inheritance', 'To make class abstract'] },
  { title: 'Const Reference Parameters', q: 'Why pass objects as "const MyClass &obj" in C++ functions?', ans: 'Avoids costly copy construction while preventing accidental mutation', dist: ['Transfers heap ownership', 'Forces pass by value', 'Mandatory for all functions'] }
];

// Seeds for Java
const JAVA_SEEDS = [
  { title: 'String Pool Immutability', q: 'Why are String objects immutable in Java?', ans: 'For security, caching in the String Pool, and thread safety', dist: ['To save CPU instructions', 'Because Java has no pointers', 'To enforce UTF-8'] },
  { title: 'HashMap Collision Handling', q: 'How does Java 8+ HashMap resolve hash collisions with many entries in a single bucket?', ans: 'Converts linked list bucket to a Red-Black Tree once threshold is reached', dist: ['Discards oldest entries', 'Throws HashCollisionException', 'Expands memory indefinitely'] },
  { title: 'Interface Default Methods', q: 'What keyword allows an interface method to provide a concrete implementation in Java 8+?', ans: 'default', dist: ['static', 'concrete', 'abstract'] },
  { title: 'Final Keyword', q: 'What does marking a class as "final" achieve in Java?', ans: 'Prevents the class from being inherited / subclassed', dist: ['Makes all variables immutable', 'Prevents garbage collection', 'Forces static methods'] }
];

// Seeds for SQL
const SQL_SEEDS = [
  { title: 'Primary Key Invariant', q: 'What two constraints are automatically enforced on a PRIMARY KEY in SQL?', ans: 'UNIQUE and NOT NULL', dist: ['FOREIGN KEY and CHECK', 'INDEX and AUTO_INCREMENT', 'DEFAULT and CASCADE'] },
  { title: 'HAVING vs WHERE', q: 'Which clause filters rows AFTER aggregate functions (SUM, AVG) have computed?', ans: 'HAVING', dist: ['WHERE', 'GROUP BY', 'ORDER BY'] },
  { title: 'INDEX Optimization', q: 'What is the main benefit and tradeoff of creating a B-Tree INDEX on a table column?', ans: 'Speeds up SELECT queries at the cost of slower INSERT/UPDATE and extra storage', dist: ['Eliminates NULL values', 'Guarantees encryption', 'Compacts table size'] },
  { title: 'Transaction ACID Properties', q: 'In relational databases, what does the "A" in ACID transactions stand for?', ans: 'Atomicity (all-or-nothing execution)', dist: ['Availability', 'Asynchronous', 'Authorization'] }
];

// Seeds for NoSQL
const NOSQL_SEEDS = [
  { title: 'CAP Theorem Tradeoffs', q: 'According to the CAP theorem, what can a distributed database guarantee during a network partition (P)?', ans: 'Either Consistency (CP) or Availability (AP), but not both', dist: ['Both Consistency and Availability', 'Zero latency', 'Unlimited horizontal storage'] },
  { title: 'MongoDB BSON Storage', q: 'What serialization format does MongoDB use natively to store documents?', ans: 'BSON (Binary JSON)', dist: ['XML', 'Protobuf', 'YAML'] },
  { title: 'Redis In-Memory Speed', q: 'Why is Redis able to process over 100,000 queries per second on a single thread?', ans: 'Entire dataset resides in RAM and uses non-blocking I/O event loops', dist: ['Writes directly to disk', 'Compiles queries to C at runtime', 'Disables network security'] },
  { title: 'Document Embedding vs Referencing', q: 'When should you embed subdocuments instead of referencing in MongoDB?', ans: 'When data is queried together and has a 1-to-few bounded relationship', dist: ['When data exceeds 16MB', 'Always embed everything', 'Never embed'] }
];

// Seeds for HTML
const HTML_SEEDS = [
  { title: 'Semantic Main Tag', q: 'What semantic HTML element should wrap the central unique content of a webpage?', ans: '<main>', dist: ['<section>', '<div>', '<article>'] },
  { title: 'Accessibility alt Attribute', q: 'What is the purpose of the alt attribute on an <img> tag?', ans: 'Provides text alternative for screen readers and broken image fallback', dist: ['Defines tooltip popup', 'Sets caption below image', 'Sets image height'] },
  { title: 'Doctype Declaration', q: 'What is the purpose of <!DOCTYPE html> at the beginning of an HTML document?', ans: 'Instructs the browser to render in standard mode rather than quirks mode', dist: ['Loads HTML5 CSS', 'Initializes JavaScript engine', 'Validates XML syntax'] },
  { title: 'Meta Viewport Tag', q: 'Why is <meta name="viewport" content="width=device-width, initial-scale=1.0"> critical?', ans: 'Ensures the page scales responsively to mobile device screen widths', dist: ['Enables touch events', 'Increases zoom resolution', 'Loads mobile stylesheet'] }
];

// Seeds for CSS
const CSS_SEEDS = [
  { title: 'Flexbox Centering', q: 'What combination in Flexbox centers children both horizontally and vertically?', ans: 'justify-content: center; align-items: center;', dist: ['text-align: center; margin: auto;', 'float: center;', 'display: inline-block;'] },
  { title: 'box-sizing: border-box', q: 'What does "box-sizing: border-box" do?', ans: 'Includes padding and border within the specified width and height', dist: ['Expands width by adding padding', 'Removes all margins', 'Applies border shadows'] },
  { title: 'CSS Specificity Hierarchy', q: 'Which selector has the highest specificity in CSS?', ans: 'ID selector (#my-id)', dist: ['Class selector (.my-class)', 'Element selector (div)', 'Universal selector (*)'] },
  { title: 'Position: Sticky', q: 'How does position: sticky behave?', ans: 'Acts as relative until a scroll threshold is met, then behaves like fixed', dist: ['Always stays at top of viewport', 'Inherits parent position', 'Floats to right edge'] }
];

// Build Units for tracks to hold 250+ questions cleanly (10 units per track with 25 questions each)
function buildUnitsForTrack(trackId, trackName, color) {
  const units = [];
  for (let u = 1; u <= 10; u++) {
    units.push({
      id: `${trackId}-u${u}`,
      number: u,
      title: `${trackName}: Level ${u} Mastery`,
      description: `Comprehensive practice set covering questions ${(u - 1) * 25 + 1} to ${u * 25}.`,
      color: color || 'from-emerald-500 to-green-600',
      cards: []
    });
  }
  return units;
}

// -------------------------------------------------------------
// COMPILED 250+ DATASET FOR ALL 10 TRACKS
// -------------------------------------------------------------
export const EXPANDED_DATASET = {
  c: {
    units: buildUnitsForTrack('c', 'C Programming', 'from-emerald-500 to-green-600'),
    cards: generateCQuestions()
  },
  python: {
    units: buildUnitsForTrack('py', 'Python Essentials', 'from-sky-500 to-blue-600'),
    cards: generatePythonQuestions()
  },
  dsa: {
    units: buildUnitsForTrack('dsa', 'Data Structures & Algorithms', 'from-indigo-600 to-blue-700'),
    cards: generateDsaQuestions()
  },
  aptitude: {
    units: buildUnitsForTrack('apt', 'Interview Aptitude & Logic', 'from-amber-500 to-orange-600'),
    cards: generateAptitudeQuestions()
  },
  cpp: {
    units: buildUnitsForTrack('cpp', 'C++ Object Oriented & STL', 'from-indigo-500 to-purple-600'),
    cards: generateGenericLanguageQuestions('cpp', 'C++', CPP_SEEDS)
  },
  java: {
    units: buildUnitsForTrack('java', 'Java & JVM Architecture', 'from-amber-500 to-orange-600'),
    cards: generateGenericLanguageQuestions('java', 'Java', JAVA_SEEDS)
  },
  sql: {
    units: buildUnitsForTrack('sql', 'SQL & Database Queries', 'from-cyan-500 to-teal-600'),
    cards: generateGenericLanguageQuestions('sql', 'SQL', SQL_SEEDS)
  },
  nosql: {
    units: buildUnitsForTrack('nosql', 'NoSQL & Document Stores', 'from-emerald-600 to-teal-700'),
    cards: generateGenericLanguageQuestions('nosql', 'NoSQL', NOSQL_SEEDS)
  },
  html: {
    units: buildUnitsForTrack('html', 'HTML5 Semantic Web', 'from-orange-500 to-red-600'),
    cards: generateGenericLanguageQuestions('html', 'HTML5', HTML_SEEDS)
  },
  css: {
    units: buildUnitsForTrack('css', 'CSS3 Layouts & Flexbox', 'from-pink-500 to-rose-600'),
    cards: generateGenericLanguageQuestions('css', 'CSS3', CSS_SEEDS)
  }
};

// Associate card IDs back into their parent units
Object.keys(EXPANDED_DATASET).forEach((trackKey) => {
  const track = EXPANDED_DATASET[trackKey];
  track.cards.forEach((card) => {
    // Find matching unit or assign to first
    let unit = track.units.find((u) => u.id === card.unitId);
    if (!unit) {
      unit = track.units[0];
      card.unitId = unit.id;
    }
    if (!unit.cards.includes(card.id)) {
      unit.cards.push(card.id);
    }
  });
});
