// CodLingo Multi-Track Curriculum Database
// Includes Programming Languages, DSA (Data Structures & Algorithms), and Aptitude/Reasoning tracks!

import { DSA_UNITS, DSA_CARDS } from './dsaCurriculum';
import { APTITUDE_UNITS, APTITUDE_CARDS } from './aptitudeCurriculum';

export const TRACK_CATEGORIES = [
  { id: 'all', name: 'All Tracks', icon: '🌟' },
  { id: 'prog', name: 'Coding & Web', icon: '💻' },
  { id: 'dsa', name: 'DSA & Algorithms', icon: '⚡' },
  { id: 'apt', name: 'Interview Aptitude', icon: '🧠' }
];

export const LANGUAGES = [
  // Coding & Web
  {
    id: 'c',
    category: 'prog',
    name: 'C',
    symbol: 'C',
    emoji: '🦀',
    mascotName: 'Clingy the Crab',
    themeColor: '#58cc02',
    accentColor: 'from-emerald-500 to-green-600',
    tagline: 'Low-level memory, pointers, and direct hardware control'
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
    tagline: 'Clean syntax, dynamic typing, comprehensions & rich libraries'
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
    tagline: 'High performance, OOP, templates, RAII & STL containers'
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
    tagline: 'Write once, run anywhere with JVM, OOP, and garbage collection'
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
    tagline: 'Relational databases, JOINs, aggregations, and subqueries'
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
    tagline: 'Document stores, JSON collections, Redis caching & key-values'
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
    tagline: 'Semantic web layout, forms, accessibility, and modern DOM'
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
    tagline: 'Flexbox, CSS Grid, animations, selectors, and responsive design'
  },

  // DSA Track
  {
    id: 'dsa',
    category: 'dsa',
    name: 'DSA & Algorithms',
    symbol: 'DSA',
    emoji: '🧮',
    mascotName: 'Algo the Tree Owl',
    themeColor: '#6366f1',
    accentColor: 'from-indigo-600 to-blue-700',
    tagline: 'Two pointers, sliding window, cycle detection, trees, DP & Big-O'
  },

  // Aptitude Track
  {
    id: 'aptitude',
    category: 'apt',
    name: 'Aptitude & Logic',
    symbol: 'APT',
    emoji: '🧠',
    mascotName: 'Newton the Brainiac',
    themeColor: '#f59e0b',
    accentColor: 'from-amber-500 to-orange-600',
    tagline: 'Time & work, relative speed, dice probability, clock angles & logic'
  }
];

export const CURRICULUM_BY_LANG = {
  // DSA TRACK
  dsa: {
    units: DSA_UNITS,
    cards: DSA_CARDS
  },

  // APTITUDE TRACK
  aptitude: {
    units: APTITUDE_UNITS,
    cards: APTITUDE_CARDS
  },

  // ================= C =================
  c: {
    units: [
      {
        id: 'c-u1',
        number: 1,
        title: 'C Fundamentals & Memory Model',
        description: 'Header files, printf format specifiers, and basic execution flow.',
        color: 'from-emerald-500 to-green-600',
        cards: ['c-01', 'c-02', 'c-03', 'c-04', 'c-05']
      },
      {
        id: 'c-u2',
        number: 2,
        title: 'Pointers & Addresses (Boss Level)',
        description: 'Address-of &, dereference *, pointer arithmetic, and NULL safety.',
        color: 'from-amber-500 to-orange-600',
        cards: ['c-10', 'c-11']
      }
    ],
    cards: [
      {
        id: 'c-01',
        unitId: 'c-u1',
        title: '#include <stdio.h>',
        tag: 'Preprocessors',
        front: {
          question: 'What is the purpose of #include <stdio.h> in C?',
          code: `#include <stdio.h>\n\nint main(void) {\n    printf("Hello World\\n");\n    return 0;\n}`,
          hint: 'Think about standard input/output function declarations.'
        },
        back: {
          concept: 'Preprocessor Header Inclusion',
          explanation: 'Tells the preprocessor to include standard input/output declarations (like printf and scanf) prior to compiling.',
          mnemonic: 'stdio = STanDard Input Output',
          codeSnippet: `#include <stdio.h> // Standard I/O`
        },
        quiz: {
          question: 'Which header file is mandatory to declare printf() and scanf() in standard C?',
          options: ['<stdio.h>', '<stdlib.h>', '<iostream>', '<conio.h>'],
          correctAnswer: '<stdio.h>',
          explanation: '<stdio.h> contains function prototypes for standard input/output streams.'
        },
        drill: {
          type: 'fill-blank',
          prompt: 'Complete the standard I/O include header:',
          codeBefore: '#include <',
          codeAfter: '>\nint main() { return 0; }',
          options: ['stdio.h', 'stdlib.h', 'math.h', 'string.h'],
          correctAnswer: 'stdio.h',
          explanation: 'stdio.h is standard for printf() and scanf() in C.'
        }
      },
      {
        id: 'c-02',
        unitId: 'c-u1',
        title: 'Format Specifiers in printf()',
        tag: 'Formatting',
        front: {
          question: 'Which specifier prints a decimal integer vs a character?',
          code: `int age = 25;\nchar grade = 'A';\nprintf("Age: %?, Grade: %?\\n", age, grade);`,
          hint: '%d is decimal, %c is character.'
        },
        back: {
          concept: 'Type Mapping',
          explanation: '%d prints a signed decimal integer, %c prints a single ASCII character, %f for float, %s for string.',
          mnemonic: '%d = Decimal, %c = Character, %f = Float',
          codeSnippet: `printf("%d %c %f", 42, 'Z', 3.14);`
        },
        quiz: {
          question: 'What format specifier must you supply to printf() to print a single char?',
          options: ['%c', '%d', '%s', '%char'],
          correctAnswer: '%c',
          explanation: '%c is reserved for individual 1-byte character variables.'
        },
        drill: {
          type: 'predict-output',
          prompt: 'What format specifier is required to print a character in C?',
          options: ['%c', '%d', '%s', '%char'],
          correctAnswer: '%c',
          explanation: '%c is the format specifier for a single char.'
        }
      },
      {
        id: 'c-03',
        unitId: 'c-u1',
        title: 'The Address-Of & in scanf()',
        tag: 'Memory & I/O',
        front: {
          question: 'Why does scanf() require the & operator for primitive variables?',
          code: `int age;\nscanf("%d", &age); // Why &age?`,
          hint: 'C passes arguments by value. scanf needs to modify your variable!'
        },
        back: {
          concept: 'Pass By Address',
          explanation: 'In C, functions cannot modify caller variables unless given their memory address. & gives the memory address.',
          mnemonic: '& = Address (GPS location) where value should be delivered.',
          codeSnippet: `int x;\nscanf("%d", &x); // Correct`
        },
        quiz: {
          question: 'What happens if you omit the & operator when calling scanf("%d", x)?',
          options: [
            'Program causes undefined behavior or Segmentation Fault',
            'Compiler automatically creates a reference',
            'Value is stored safely in stack register',
            'Function returns EOF'
          ],
          correctAnswer: 'Program causes undefined behavior or Segmentation Fault',
          explanation: 'Without &, scanf interprets the uninitialized variable value as a raw memory address and attempts to write to it!'
        },
        drill: {
          type: 'spot-bug',
          prompt: 'Find the bug that causes an undefined behavior crash:',
          codeLines: [
            '#include <stdio.h>',
            'int main() {',
            '    int number;',
            '    scanf("%d", number); /* BUG */',
            '    return 0;',
            '}'
          ],
          bugLineIndex: 3,
          bugExplanation: 'Missing & before number in scanf!'
        }
      },
      {
        id: 'c-04',
        unitId: 'c-u1',
        title: 'Truthiness in C',
        tag: 'Logic',
        front: {
          question: 'What numeric value is treated as FALSE in C?',
          code: `if (0) { /* ... */ }\nif (-1) { /* ... */ }`,
          hint: 'Only zero is false.'
        },
        back: {
          concept: 'Zero vs Non-Zero',
          explanation: 'Only 0 evaluates to false in C. Any non-zero integer (like -1, 42, or 999) evaluates to true!',
          mnemonic: '0 = False. Everything else = True.',
          codeSnippet: `if (0) printf("No");\nif (-5) printf("Yes!"); // Prints Yes!`
        },
        quiz: {
          question: 'In C, what does the condition if (-42) evaluate to?',
          options: ['TRUE (the block executes)', 'FALSE (block skipped)', 'Compilation Error', 'Runtime Trap'],
          correctAnswer: 'TRUE (the block executes)',
          explanation: 'In C, any non-zero value is treated as true, even negative numbers like -42.'
        },
        drill: {
          type: 'predict-output',
          prompt: 'What does this print?\n\nint x = -10;\nif (x)\n  printf("TRUE");\nelse\n  printf("FALSE");',
          options: ['TRUE', 'FALSE', 'Compilation Error', 'Runtime Crash'],
          correctAnswer: 'TRUE',
          explanation: '-10 is non-zero, so it evaluates to TRUE in C!'
        }
      },
      {
        id: 'c-05',
        unitId: 'c-u1',
        title: 'sizeof Operator',
        tag: 'Memory',
        front: {
          question: 'What is guaranteed about sizeof(char) on every C compiler?',
          code: `printf("%zu", sizeof(char));`,
          hint: 'By definition of the C specification.'
        },
        back: {
          concept: 'C Standard Byte Unit',
          explanation: 'In C, sizeof(char) is guaranteed to equal exactly 1 byte on all architectures.',
          mnemonic: 'char is the 1-byte atom of C memory.',
          codeSnippet: `sizeof(char) == 1; // Always true`
        },
        quiz: {
          question: 'What is the return type of the sizeof operator in standard C?',
          options: ['size_t', 'int', 'long', 'unsigned int'],
          correctAnswer: 'size_t',
          explanation: 'sizeof yields a value of unsigned integer type size_t.'
        },
        drill: {
          type: 'predict-output',
          prompt: 'What does sizeof(char) return by definition in standard C?',
          options: ['1', '2', '4', '8'],
          correctAnswer: '1',
          explanation: 'sizeof(char) is always 1 byte.'
        }
      },
      {
        id: 'c-10',
        unitId: 'c-u2',
        title: 'Pointers: & vs *',
        tag: 'Pointers',
        front: {
          question: 'What does *ptr do when ptr is a pointer storing an address?',
          code: `int x = 42;\nint *ptr = &x;\n*ptr = 100;\nprintf("%d", x);`,
          hint: '* dereferences, reading or writing to the target memory.'
        },
        back: {
          concept: 'Dereferencing',
          explanation: '& gets the address of a variable. * goes to that address and accesses or changes the value.',
          mnemonic: '& = Address. * = Unpack the box at that address.',
          codeSnippet: `int a = 5;\nint *p = &a;\n*p = 10; // a is now 10`
        },
        quiz: {
          question: 'Given "int x = 10; int *p = &x;", what does "*p" represent?',
          options: ['The value stored in x (10)', 'The memory address of x', 'The address of pointer p', 'A NULL reference'],
          correctAnswer: 'The value stored in x (10)',
          explanation: '*p dereferences the pointer, fetching or mutating the integer value at address &x.'
        },
        drill: {
          type: 'predict-output',
          prompt: 'What is printed?\n\nint a = 7;\nint *p = &a;\n*p = *p * 3;\nprintf("%d", a);',
          options: ['21', '7', 'Address of a', 'Segmentation fault'],
          correctAnswer: '21',
          explanation: '*p modifies variable a directly, multiplying 7 by 3 to get 21.'
        }
      },
      {
        id: 'c-11',
        unitId: 'c-u2',
        title: 'Null Pointers & Segfaults',
        tag: 'Memory Safety',
        front: {
          question: 'What happens if you dereference a NULL pointer (*NULL)?',
          code: `int *p = NULL;\n*p = 5; // DANGER`,
          hint: 'The OS protects address 0.'
        },
        back: {
          concept: 'Segmentation Fault',
          explanation: 'Address 0 is inaccessible. Trying to read or write to it triggers a hardware protection trap from the OS (Segmentation fault).',
          mnemonic: 'Always check if (ptr != NULL) before dereferencing!',
          codeSnippet: `if (ptr != NULL) { *ptr = 5; }`
        },
        quiz: {
          question: 'Why does dereferencing NULL crash with "Segmentation Fault (core dumped)"?',
          options: [
            'Address 0 is protected by OS virtual memory pages',
            'NULL has size 0 and runs out of heap',
            'The compiler deletes the function',
            'Pointers only accept positive values'
          ],
          correctAnswer: 'Address 0 is protected by OS virtual memory pages',
          explanation: 'The OS maps the lowest virtual address pages with no read/write permissions to immediately trap NULL dereferences.'
        },
        drill: {
          type: 'spot-bug',
          prompt: 'Spot the line causing a Segmentation Fault:',
          codeLines: [
            'int *ptr = NULL;',
            'int val = 10;',
            '*ptr = val; /* BUG */',
            'return 0;'
          ],
          bugLineIndex: 2,
          bugExplanation: 'Dereferencing a NULL pointer crashes with a Segmentation fault!'
        }
      }
    ]
  },

  // ================= PYTHON =================
  python: {
    units: [
      {
        id: 'py-u1',
        number: 1,
        title: 'Python Essentials & Data Structures',
        description: 'Dynamic typing, list slicing, dictionary lookups, and truthiness.',
        color: 'from-sky-500 to-blue-600',
        cards: ['py-01', 'py-02', 'py-03', 'py-04']
      }
    ],
    cards: [
      {
        id: 'py-01',
        unitId: 'py-u1',
        title: 'List Slicing [start:stop:step]',
        tag: 'Lists',
        front: {
          question: 'What does the slice nums[::-1] do in Python?',
          code: `nums = [1, 2, 3, 4, 5]\nrev = nums[::-1]\nprint(rev)`,
          hint: 'A negative step traverses backwards!'
        },
        back: {
          concept: 'Reversal via Slicing',
          explanation: 'In Python, slice notation takes [start:stop:step]. When step is -1 and start/stop are omitted, it copies the list in reverse order.',
          mnemonic: '[::-1] = Turn the list around backwards!',
          codeSnippet: `'hello'[::-1] # 'olleh'`
        },
        quiz: {
          question: 'What does `"CodLingo"[::-1]` output in Python?',
          options: ['"ognilDoC"', '"CodLingo"', '"C"', 'IndexError'],
          correctAnswer: '"ognilDoC"',
          explanation: 'A step of -1 traverses backwards from end to beginning.'
        },
        drill: {
          type: 'predict-output',
          prompt: 'What does print([10, 20, 30][::-1]) output?',
          options: ['[30, 20, 10]', '[10, 20, 30]', '[30]', 'Error'],
          correctAnswer: '[30, 20, 10]',
          explanation: '[::-1] reverses any sequence in Python.'
        }
      },
      {
        id: 'py-02',
        unitId: 'py-u1',
        title: 'List Comprehensions',
        tag: 'Pythonic Syntax',
        front: {
          question: 'How do list comprehensions replace traditional for loops?',
          code: `evens = [x for x in range(10) if x % 2 == 0]\nprint(evens)`,
          hint: '[expression for item in iterable if condition]'
        },
        back: {
          concept: 'Concise Declarative List Generation',
          explanation: 'List comprehensions construct lists in a single readable line, executing faster than append() inside standard for loops in CPython.',
          mnemonic: '[What you want | Where it comes from | Filter rule]',
          codeSnippet: `squares = [n*n for n in range(5)] # [0, 1, 4, 9, 16]`
        },
        quiz: {
          question: 'What is the output of `[i for i in range(5) if i > 2]`?',
          options: ['[3, 4]', '[0, 1, 2]', '[2, 3, 4]', '[3, 4, 5]'],
          correctAnswer: '[3, 4]',
          explanation: 'range(5) produces 0, 1, 2, 3, 4. Filtering with i > 2 leaves [3, 4].'
        },
        drill: {
          type: 'predict-output',
          prompt: 'What does [x * 2 for x in [1, 2, 3]] evaluate to?',
          options: ['[2, 4, 6]', '[1, 2, 3, 1, 2, 3]', '[2]', '[6]'],
          correctAnswer: '[2, 4, 6]',
          explanation: 'Multiplies each element in the list by 2.'
        }
      },
      {
        id: 'py-03',
        unitId: 'py-u1',
        title: 'Dictionary .get() vs []',
        tag: 'Dictionaries',
        front: {
          question: 'Why is user.get("age", 0) safer than user["age"]?',
          code: `user = {"name": "Alice"}\n# What happens if "age" does not exist?`,
          hint: 'One raises a KeyError, the other returns a fallback default.'
        },
        back: {
          concept: 'KeyError Prevention',
          explanation: 'Accessing an absent key with [] raises a KeyError. .get(key, default) gracefully returns the default value without crashing.',
          mnemonic: 'get() never crashes your code.',
          codeSnippet: `d = {"a": 1}\nd.get("b", 100) # Returns 100`
        },
        quiz: {
          question: 'What does `{"score": 99}.get("bonus", 0)` return?',
          options: ['0', '99', 'KeyError', 'None'],
          correctAnswer: '0',
          explanation: 'Since "bonus" is not in the dictionary, the fallback default (0) is returned.'
        },
        drill: {
          type: 'spot-bug',
          prompt: 'Find the line that crashes with a KeyError:',
          codeLines: [
            'data = {"role": "admin"}',
            'print(data.get("email", "N/A"))',
            'print(data["missing_key"]) /* BUG */',
            'print("Done")'
          ],
          bugLineIndex: 2,
          bugExplanation: 'Accessing data["missing_key"] triggers a KeyError!'
        }
      },
      {
        id: 'py-04',
        unitId: 'py-u1',
        title: 'Mutable Default Arguments Trap',
        tag: 'Functions',
        front: {
          question: 'Why should you NEVER use def append_to(item, target=[]) in Python?',
          code: `def add(val, arr=[]):\n    arr.append(val)\n    return arr\n\nprint(add(1))\nprint(add(2)) # Prints [1, 2]!`,
          hint: 'Default argument expressions are evaluated once when the function is defined, not when called!'
        },
        back: {
          concept: 'Persistent Default Objects',
          explanation: 'In Python, default arguments are created ONCE at function definition time. A mutable list is shared across every call that omits the parameter! Use target=None instead.',
          mnemonic: 'Never put mutable lists or dicts in function defaults!',
          codeSnippet: `def add(val, arr=None):\n    if arr is None: arr = []`
        },
        quiz: {
          question: 'What should you use as the default value for an optional list argument in Python?',
          options: ['None', '[]', 'list()', 'False'],
          correctAnswer: 'None',
          explanation: 'Use None as a sentinel default, then create a new list inside the function body.'
        },
        drill: {
          type: 'fill-blank',
          prompt: 'What idiomatic value should replace mutable default arguments?',
          codeBefore: 'def add_item(item, items=',
          codeAfter: '):\n    if items is None: items = []',
          options: ['None', '[]', '{}', 'False'],
          correctAnswer: 'None',
          explanation: 'Use None as the default argument, then instantiate the list inside the function.'
        }
      }
    ]
  },

  // ================= C++ =================
  cpp: {
    units: [
      {
        id: 'cpp-u1',
        number: 1,
        title: 'C++ Modern OOP & References',
        description: 'std::cout, references vs pointers, constructors, and RAII.',
        color: 'from-indigo-500 to-purple-600',
        cards: ['cpp-01', 'cpp-02']
      }
    ],
    cards: [
      {
        id: 'cpp-01',
        unitId: 'cpp-u1',
        title: 'References (&) vs Pointers (*)',
        tag: 'Memory',
        front: {
          question: 'In C++, how does a reference int &ref = x differ from a pointer?',
          code: `int x = 10;\nint &ref = x;\nref = 20; // x becomes 20`,
          hint: 'References cannot be NULL and cannot be reseated to point to another variable.'
        },
        back: {
          concept: 'Aliases in C++',
          explanation: 'A reference is an immutable alias for an existing object. It cannot be NULL, cannot be uninitialized, and uses standard dot/value syntax without dereference operators.',
          mnemonic: 'Reference = A nickname for the same object.',
          codeSnippet: `void increment(int &val) {\n    val++; // Modifies caller directly\n}`
        },
        quiz: {
          question: 'Which of the following is true about a C++ reference (e.g., int &ref = x;)?',
          options: [
            'It cannot be NULL and cannot be reseated to another variable',
            'It requires the -> operator to access members',
            'It can be left uninitialized',
            'It consumes extra heap memory'
          ],
          correctAnswer: 'It cannot be NULL and cannot be reseated to another variable',
          explanation: 'References are permanent aliases established at initialization time.'
        },
        drill: {
          type: 'predict-output',
          prompt: 'What does this print?\n\nint a = 5;\nint &b = a;\nb += 10;\nstd::cout << a;',
          options: ['15', '5', '10', 'Compilation Error'],
          correctAnswer: '15',
          explanation: 'b is an alias for a, so mutating b modifies a directly.'
        }
      },
      {
        id: 'cpp-02',
        unitId: 'cpp-u1',
        title: 'std::vector vs Raw Arrays',
        tag: 'STL',
        front: {
          question: 'Why is std::vector preferred over raw C-style arrays int arr[N]?',
          code: `std::vector<int> v = {1, 2, 3};\nv.push_back(4); // Dynamically resizes!`,
          hint: 'Automatic memory management (RAII) and bounds-checking methods like .at().'
        },
        back: {
          concept: 'RAII Vector Container',
          explanation: 'std::vector manages its own heap memory, grows automatically, prevents memory leaks when going out of scope, and knows its own .size().',
          mnemonic: 'RAII = Resource Acquisition Is Initialization (Cleaned up automatically).',
          codeSnippet: `std::vector<int> nums;\nnums.push_back(10);\nnums.size(); // 1`
        },
        quiz: {
          question: 'What C++ container provides dynamic array resizing with automatic RAII memory cleanup?',
          options: ['std::vector', 'std::array', 'int[]', 'malloc_array'],
          correctAnswer: 'std::vector',
          explanation: 'std::vector dynamically allocates and cleans up its own elements.'
        },
        drill: {
          type: 'predict-output',
          prompt: 'Which method adds an element to the back of a std::vector in C++?',
          options: ['push_back()', 'append()', 'add()', 'insert_end()'],
          correctAnswer: 'push_back()',
          explanation: 'push_back() appends elements to the end of a vector.'
        }
      }
    ]
  },

  // ================= JAVA =================
  java: {
    units: [
      {
        id: 'java-u1',
        number: 1,
        title: 'Java Fundamentals & OOP',
        description: 'public static void main, Strings, equals() vs ==, and class architecture.',
        color: 'from-amber-500 to-orange-600',
        cards: ['java-01', 'java-02']
      }
    ],
    cards: [
      {
        id: 'java-01',
        unitId: 'java-u1',
        title: 'String Comparison: == vs .equals()',
        tag: 'Strings & Memory',
        front: {
          question: 'Why should you compare Strings using .equals() instead of == in Java?',
          code: `String s1 = new String("CodLingo");\nString s2 = new String("CodLingo");\n\nSystem.out.println(s1 == s2);      // false!\nSystem.out.println(s1.equals(s2)); // true!`,
          hint: '== compares memory references, while .equals() compares the actual text content.'
        },
        back: {
          concept: 'Reference vs Value Equality',
          explanation: 'In Java, == checks if both references point to the exact same memory address. .equals() compares character-by-character text content.',
          mnemonic: '== checks Identity. .equals() checks Value.',
          codeSnippet: `if (name.equals("Alice")) { /* Safe */ }`
        },
        quiz: {
          question: 'In Java, what does the "==" operator compare between two object references?',
          options: [
            'Their memory addresses (identity)',
            'Their character content',
            'Their hashcodes',
            'Their byte sizes'
          ],
          correctAnswer: 'Their memory addresses (identity)',
          explanation: '== checks if both variables refer to the exact same heap memory address.'
        },
        drill: {
          type: 'predict-output',
          prompt: 'What does this print?\n\nString a = new String("Hi");\nString b = new String("Hi");\nSystem.out.print(a.equals(b));',
          options: ['true', 'false', 'Compilation Error', 'NullPointerException'],
          correctAnswer: 'true',
          explanation: '.equals() compares the character sequence, which is identical.'
        }
      },
      {
        id: 'java-02',
        unitId: 'java-u1',
        title: 'Anatomy of public static void main',
        tag: 'Entrypoint',
        front: {
          question: 'Why must the main method be declared static in Java?',
          code: `public static void main(String[] args) { ... }`,
          hint: 'How does the JVM run main before any objects of the class are instantiated?'
        },
        back: {
          concept: 'JVM Bootstrap',
          explanation: 'static allows the JVM to invoke the main method without having to instantiate an object of the outer class first.',
          mnemonic: 'static = No object needed to run.',
          codeSnippet: `public class App {\n    public static void main(String[] args) {\n        System.out.println("Hello Java!");\n    }\n}`
        },
        quiz: {
          question: 'Why is the main method static in Java?',
          options: [
            'So the JVM can execute it without creating an object instance',
            'To make execution run in a separate thread',
            'To prevent any memory garbage collection',
            'Because main cannot accept arguments'
          ],
          correctAnswer: 'So the JVM can execute it without creating an object instance',
          explanation: 'static methods belong to the class, not an instantiated instance.'
        },
        drill: {
          type: 'scramble',
          prompt: 'Assemble the iconic Java main method signature:',
          tokens: ['public', 'static', 'void', 'main(String[] args)'],
          correctSequence: ['public', 'static', 'void', 'main(String[] args)'],
          explanation: 'public static void main(String[] args) is the official JVM entrypoint.'
        }
      }
    ]
  },

  // ================= SQL =================
  sql: {
    units: [
      {
        id: 'sql-u1',
        number: 1,
        title: 'Relational Queries & Filtering',
        description: 'SELECT, WHERE, ORDER BY, LIMIT, and logical conditions.',
        color: 'from-cyan-500 to-teal-600',
        cards: ['sql-01', 'sql-02']
      }
    ],
    cards: [
      {
        id: 'sql-01',
        unitId: 'sql-u1',
        title: 'WHERE vs HAVING',
        tag: 'Filtering',
        front: {
          question: 'What is the critical difference between WHERE and HAVING in SQL?',
          code: `SELECT dept, COUNT(*) \nFROM employees \nWHERE salary > 50000 \nGROUP BY dept \nHAVING COUNT(*) > 5;`,
          hint: 'WHERE filters rows BEFORE grouping. HAVING filters groups AFTER aggregation.'
        },
        back: {
          concept: 'Execution Order Filtering',
          explanation: 'WHERE filters individual raw table rows before aggregation. HAVING filters grouped rows after aggregate functions (COUNT, SUM, AVG) are computed.',
          mnemonic: 'WHERE raw rows, HAVING group rows.',
          codeSnippet: `WHERE age > 18 -- Row level\nHAVING AVG(score) > 80 -- Group level`
        },
        quiz: {
          question: 'In SQL, which clause filters results based on aggregate functions like COUNT(*) > 10?',
          options: ['HAVING', 'WHERE', 'ORDER BY', 'LIMIT'],
          correctAnswer: 'HAVING',
          explanation: 'HAVING operates after aggregation groups are computed.'
        },
        drill: {
          type: 'predict-output',
          prompt: 'Which clause is used to filter results based on aggregate functions like COUNT() or AVG()?',
          options: ['HAVING', 'WHERE', 'ORDER BY', 'GROUP BY'],
          correctAnswer: 'HAVING',
          explanation: 'HAVING filters aggregated groups, whereas WHERE cannot use aggregates directly.'
        }
      },
      {
        id: 'sql-02',
        unitId: 'sql-u1',
        title: 'INNER JOIN vs LEFT JOIN',
        tag: 'Joins',
        front: {
          question: 'If a customer has no orders, does LEFT JOIN customers c ON c.id = o.cust_id include them?',
          code: `SELECT c.name, o.id \nFROM customers c \nLEFT JOIN orders o ON c.id = o.customer_id;`,
          hint: 'LEFT JOIN keeps ALL rows from the left table regardless of matches.'
        },
        back: {
          concept: 'Outer vs Inner Join',
          explanation: 'INNER JOIN only returns rows where both tables match. LEFT JOIN returns ALL rows from the left table, populating unmatched right columns with NULL.',
          mnemonic: 'LEFT JOIN = Left table never gets left behind.',
          codeSnippet: `// If no orders, o.id will be NULL`
        },
        quiz: {
          question: 'What does a LEFT JOIN return if there is no corresponding row in the right table?',
          options: [
            'The left row with NULL in the right table columns',
            'An empty result set',
            'A SQL syntax exception',
            'The row is omitted completely'
          ],
          correctAnswer: 'The left row with NULL in the right table columns',
          explanation: 'LEFT JOIN preserves all rows from the left table and fills missing right fields with NULL.'
        },
        drill: {
          type: 'predict-output',
          prompt: 'What value appears for right-table columns when a LEFT JOIN has no match?',
          options: ['NULL', '0', 'EMPTY_STRING', 'Error'],
          correctAnswer: 'NULL',
          explanation: 'Unmatched rows from the right table are filled with NULL.'
        }
      }
    ]
  },

  // ================= NOSQL =================
  nosql: {
    units: [
      {
        id: 'nosql-u1',
        number: 1,
        title: 'Document Stores & Key-Values',
        description: 'BSON documents, MongoDB queries, indexing, and Redis caching.',
        color: 'from-emerald-600 to-teal-700',
        cards: ['nosql-01', 'nosql-02']
      }
    ],
    cards: [
      {
        id: 'nosql-01',
        unitId: 'nosql-u1',
        title: 'Schema Flexibility in Document Stores',
        tag: 'Data Modeling',
        front: {
          question: 'How do MongoDB documents differ from rows in a relational database table?',
          code: `{\n  "_id": ObjectId("64a1b2c3"),\n  "name": "Alex",\n  "skills": ["C", "Python", "SQL"],\n  "profile": { "github": "alexdev" }\n}`,
          hint: 'Documents can contain nested arrays and sub-documents with dynamic schemas.'
        },
        back: {
          concept: 'Denormalized JSON / BSON',
          explanation: 'Documents store rich polymorphic data. Different documents in the same collection can have different fields and embed nested hierarchies without rigid table ALTER migrations.',
          mnemonic: 'Store together what is queried together.',
          codeSnippet: `db.users.insertOne({ name: "Alex", tags: ["dev"] });`
        },
        quiz: {
          question: 'What format does MongoDB use natively to serialize and store documents?',
          options: ['BSON (Binary JSON)', 'XML', 'Raw CSV', 'Protocol Buffers'],
          correctAnswer: 'BSON (Binary JSON)',
          explanation: 'MongoDB stores records in BSON, a binary-encoded JSON format supporting datatypes like Date and ObjectId.'
        },
        drill: {
          type: 'predict-output',
          prompt: 'What format does MongoDB use natively to serialize and store documents?',
          options: ['BSON (Binary JSON)', 'XML', 'Plain CSV', 'Protocol Buffers'],
          correctAnswer: 'BSON (Binary JSON)',
          explanation: 'MongoDB stores documents internally in BSON, a binary JSON representation.'
        }
      },
      {
        id: 'nosql-02',
        unitId: 'nosql-u1',
        title: 'Redis In-Memory Key-Value Caching',
        tag: 'Key-Value',
        front: {
          question: 'Why is Redis capable of sub-millisecond read and write speeds?',
          code: `SET user:101:streak 5\nINCR user:101:streak\nEXPIRE user:101:streak 86400`,
          hint: 'It stores its active datasets directly in RAM (memory).'
        },
        back: {
          concept: 'In-Memory Data Structures',
          explanation: 'Redis keeps the entire primary dataset in RAM and uses single-threaded non-blocking I/O event loops, avoiding disk seek latency.',
          mnemonic: 'RAM is hundreds of times faster than SSD/Disk.',
          codeSnippet: `GET my_cached_key`
        },
        quiz: {
          question: 'Which Redis command atomically increments an integer value stored at a key?',
          options: ['INCR', 'ADD', 'APPEND', 'COUNT_UP'],
          correctAnswer: 'INCR',
          explanation: 'INCR atomically increments numerical keys in Redis.'
        },
        drill: {
          type: 'fill-blank',
          prompt: 'Which command increments an integer value stored at a key in Redis?',
          codeBefore: '',
          codeAfter: ' user:streak',
          options: ['INCR', 'ADD', 'APPEND', 'INCREMENT'],
          correctAnswer: 'INCR',
          explanation: 'INCR atomically increments the integer value of a key in Redis.'
        }
      }
    ]
  },

  // ================= HTML =================
  html: {
    units: [
      {
        id: 'html-u1',
        number: 1,
        title: 'HTML5 Semantics & Structure',
        description: 'Semantic tags, inputs, accessibility, and modern document layout.',
        color: 'from-orange-500 to-red-600',
        cards: ['html-01', 'html-02']
      }
    ],
    cards: [
      {
        id: 'html-01',
        unitId: 'html-u1',
        title: 'Semantic Tags vs Generic <div>',
        tag: 'Semantics',
        front: {
          question: 'Why use <main>, <article>, <nav>, and <section> instead of <div> everywhere?',
          code: `<header>\n  <nav><!-- Links --></nav>\n</header>\n<main>\n  <article><!-- Story --></article>\n</main>`,
          hint: 'Think about screen readers, accessibility (a11y), and search engine optimization (SEO).'
        },
        back: {
          concept: 'Web Accessibility & SEO',
          explanation: 'Semantic tags give meaning to content. Screen readers navigate landmarks like <nav> and <main>, and search engine crawlers understand document hierarchy.',
          mnemonic: '<div> has 0 meaning. Semantic tags tell WHO is what.',
          codeSnippet: `<main role="main">\n  <h1>Title</h1>\n</main>`
        },
        quiz: {
          question: 'Which semantic HTML tag should wrap the dominant unique content of the document body?',
          options: ['<main>', '<section>', '<div>', '<article>'],
          correctAnswer: '<main>',
          explanation: '<main> represents the dominant central content of the <body>.'
        },
        drill: {
          type: 'predict-output',
          prompt: 'Which semantic HTML tag should wrap the primary navigation links of a website?',
          options: ['<nav>', '<menu>', '<header>', '<links>'],
          correctAnswer: '<nav>',
          explanation: '<nav> is the standard HTML5 element for major navigation links.'
        }
      },
      {
        id: 'html-02',
        unitId: 'html-u1',
        title: 'Accessibility: alt Attribute',
        tag: 'Accessibility (a11y)',
        front: {
          question: 'Why is the alt attribute required on every <img> tag in HTML?',
          code: `<img src="clingo_crab.png" alt="CodLingo Crab Mascot cheering">`,
          hint: 'What happens if the image fails to load or a blind user navigates via screen reader?'
        },
        back: {
          concept: 'Visual Fallback & Screen Readers',
          explanation: 'alt describes image content to screen readers and displays when network requests fail. Decorative images should use alt="" so screen readers know to skip them.',
          mnemonic: 'No alt = Invisible to screen readers.',
          codeSnippet: `<img src="logo.svg" alt="Company Logo">`
        },
        quiz: {
          question: 'What should the alt attribute contain for a purely decorative background image?',
          options: ['alt="" (empty string)', 'alt="image"', 'alt="none"', 'Omit the alt attribute entirely'],
          correctAnswer: 'alt="" (empty string)',
          explanation: 'alt="" explicitly tells assistive screen readers that the graphic is decorative and can be skipped.'
        },
        drill: {
          type: 'spot-bug',
          prompt: 'Find the inaccessible image missing an alt description:',
          codeLines: [
            '<figure>',
            '  <img src="chart.png"> /* BUG: Missing alt */',
            '  <figcaption>Quarterly profits</figcaption>',
            '</figure>'
          ],
          bugLineIndex: 1,
          bugExplanation: 'Missing alt attribute on <img> is a core accessibility failure!'
        }
      }
    ]
  },

  // ================= CSS =================
  css: {
    units: [
      {
        id: 'css-u1',
        number: 1,
        title: 'Modern CSS Layouts & Flexbox',
        description: 'Flexbox centering, CSS Grid, box model, and responsive styling.',
        color: 'from-pink-500 to-rose-600',
        cards: ['css-01', 'css-02']
      }
    ],
    cards: [
      {
        id: 'css-01',
        unitId: 'css-u1',
        title: 'Centering Anything in Flexbox',
        tag: 'Flexbox',
        front: {
          question: 'What 3 lines of CSS perfectly center any child element both horizontally and vertically?',
          code: `.parent {\n  display: flex;\n  justify-content: center; /* Main axis */\n  align-items: center;     /* Cross axis */\n}`,
          hint: 'display, justify-content, align-items.'
        },
        back: {
          concept: 'Two-Axis Alignment',
          explanation: 'justify-content aligns along the main axis (row by default). align-items aligns along the cross axis (column by default).',
          mnemonic: 'display: flex + justify: center + align: center = Perfect center!',
          codeSnippet: `// Alternatively with CSS Grid:\ndisplay: grid;\nplace-items: center;`
        },
        quiz: {
          question: 'In Flexbox with flex-direction: row, which property aligns items along the vertical cross-axis?',
          options: ['align-items', 'justify-content', 'align-content', 'vertical-align'],
          correctAnswer: 'align-items',
          explanation: 'align-items controls alignment along the cross-axis (vertical when direction is row).'
        },
        drill: {
          type: 'scramble',
          prompt: 'Order the CSS rules to center an element with Flexbox:',
          tokens: ['display: flex;', 'justify-content: center;', 'align-items: center;'],
          correctSequence: ['display: flex;', 'justify-content: center;', 'align-items: center;'],
          explanation: 'Standard flex centering recipe.'
        }
      },
      {
        id: 'css-02',
        unitId: 'css-u1',
        title: 'box-sizing: border-box',
        tag: 'Box Model',
        front: {
          question: 'Why do modern CSS resets include * { box-sizing: border-box; }?',
          code: `* {\n  box-sizing: border-box;\n}\n\n// Element with width: 100px; padding: 20px;\n// Total width stays 100px!`,
          hint: 'Under the default content-box, padding and border expand the actual width!'
        },
        back: {
          concept: 'Predictable Sizing',
          explanation: 'With border-box, width and height include padding and borders. Without it (content-box), a 100px box with 20px padding explodes to 140px in total width.',
          mnemonic: 'border-box stops padding from blowing up your layout.',
          codeSnippet: `*, *::before, *::after {\n  box-sizing: border-box;\n}`
        },
        quiz: {
          question: 'What is the default box-sizing model in CSS if not overridden?',
          options: ['content-box', 'border-box', 'padding-box', 'margin-box'],
          correctAnswer: 'content-box',
          explanation: 'The CSS default is content-box, where padding and borders are added on top of specified width.'
        },
        drill: {
          type: 'predict-output',
          prompt: 'With box-sizing: border-box, what is the total rendered width of a box with width: 200px and padding: 20px?',
          options: ['200px', '240px', '220px', '180px'],
          correctAnswer: '200px',
          explanation: 'With border-box, padding is absorbed inside the specified 200px width.'
        }
      }
    ]
  }
};
