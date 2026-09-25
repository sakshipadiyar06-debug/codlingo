// Comprehensive C Programming Curriculum for CLingo
// Combines Flashcard Learn Mode + Interactive Gamified Drills (Predict output, Spot bug, Fill blank, Scramble)

export const UNITS = [
  {
    id: 'unit-1',
    number: 1,
    title: 'C Fundamentals & I/O',
    description: 'Master preprocessors, main(), format specifiers, and basic input/output.',
    color: 'from-emerald-500 to-green-600',
    borderColor: 'border-green-600',
    textColor: 'text-green-700',
    bgLight: 'bg-green-50',
    icon: 'Terminal',
    cards: ['c-01', 'c-02', 'c-03', 'c-04', 'c-05']
  },
  {
    id: 'unit-2',
    number: 2,
    title: 'Logic Traps & Control Flow',
    description: 'Learn C truthiness, post vs pre-increment, and dangerous switch fallthroughs.',
    color: 'from-sky-500 to-blue-600',
    borderColor: 'border-blue-600',
    textColor: 'text-blue-700',
    bgLight: 'bg-blue-50',
    icon: 'Cpu',
    cards: ['c-06', 'c-07', 'c-08', 'c-09']
  },
  {
    id: 'unit-3',
    number: 3,
    title: 'Pointers & Memory Addresses',
    description: 'Conquer the dereference operator *, address-of &, and pointer arithmetic.',
    color: 'from-amber-500 to-orange-600',
    borderColor: 'border-orange-600',
    textColor: 'text-orange-700',
    bgLight: 'bg-orange-50',
    icon: 'Crosshair',
    cards: ['c-10', 'c-11', 'c-12', 'c-13', 'c-14']
  },
  {
    id: 'unit-4',
    number: 4,
    title: 'Arrays, Strings & Heap Allocation',
    description: 'Null terminators \0, malloc(), free(), and preventing segmentation faults.',
    color: 'from-purple-500 to-indigo-600',
    borderColor: 'border-indigo-600',
    textColor: 'text-indigo-700',
    bgLight: 'bg-purple-50',
    icon: 'Layers',
    cards: ['c-15', 'c-16', 'c-17', 'c-18']
  }
];

export const FLASHCARDS = [
  // UNIT 1
  {
    id: 'c-01',
    unitId: 'unit-1',
    title: 'Preprocessor: #include <stdio.h>',
    tag: 'Preprocessors',
    front: {
      question: 'What is the exact purpose of #include <stdio.h> in a C program?',
      code: `#include <stdio.h>

int main(void) {
    printf("Hello, C-Lingo!\\n");
    return 0;
}`,
      hint: 'Think about where printf() gets its declaration.'
    },
    back: {
      concept: 'Header Inclusion & Preprocessor',
      explanation: 'Lines starting with # are processed before compilation begins. <stdio.h> provides function declarations for standard I/O (like printf and scanf). Without it, the compiler does not know what printf expects.',
      mnemonic: 'stdio = STanDard Input Output',
      codeSnippet: `// Angle brackets < > search system library headers
#include <stdio.h>

// Double quotes " " search local project directory
#include "my_header.h"`
    },
    drill: {
      type: 'fill-blank',
      prompt: 'Complete the header inclusion for standard input and output:',
      codeBefore: '#include <',
      codeAfter: '>\n\nint main() { return 0; }',
      options: ['stdio.h', 'stdlib.h', 'iostream', 'string.h'],
      correctAnswer: 'stdio.h',
      explanation: 'stdio.h is C standard library header containing definitions for input/output operations.'
    }
  },

  {
    id: 'c-02',
    unitId: 'unit-1',
    title: 'main() & Exit Codes',
    tag: 'Execution Entrypoint',
    front: {
      question: 'What does "return 0;" indicate at the end of main()?',
      code: `int main(void) {
    // Your awesome C code
    return 0;
}`,
      hint: 'How does the OS know if your program succeeded or crashed?'
    },
    back: {
      concept: 'Process Return Status Code',
      explanation: 'The return value of main() is sent back to the operating system. By universal convention, 0 means SUCCESS (no error). Any non-zero value (e.g., return 1; or EXIT_FAILURE) signals an error occurred.',
      mnemonic: '0 Errors = 0 Worries!',
      codeSnippet: `int main() {
    if (file_not_found) {
        return 1; // Error code to OS
    }
    return 0; // Success!
}`
    },
    drill: {
      type: 'predict-output',
      prompt: 'What return code signals to the OS that the program ran successfully?',
      options: ['0', '1', '-1', 'NULL'],
      correctAnswer: '0',
      explanation: 'In C and POSIX systems, returning 0 signals clean execution with 0 errors.'
    }
  },

  {
    id: 'c-03',
    unitId: 'unit-1',
    title: 'Format Specifiers in printf()',
    tag: 'Formatting',
    front: {
      question: 'Which format specifier matches each primitive type in printf?',
      code: `int age = 21;
char grade = 'A';
float pi = 3.14f;

printf("%? %? %?", age, grade, pi);`,
      hint: 'd is for decimal, c is for character, f is for float.'
    },
    back: {
      concept: 'C Type Specifier Mapping',
      explanation: 'printf is variadic and has no runtime type inspection. You must tell it explicitly how many bytes to read and how to format them using % placeholders.',
      mnemonic: '%d = Decimal integer\n%c = Char (single byte)\n%f = Floating point\n%s = String\n%p = Pointer address (hex)',
      codeSnippet: `printf("Age: %d, Grade: %c, Pi: %.2f\\n", age, grade, pi);
// Output: Age: 21, Grade: A, Pi: 3.14`
    },
    drill: {
      type: 'scramble',
      prompt: 'Reassemble valid C code to print an integer variable x:',
      tokens: ['printf(', '"%d\\n",', 'x', ');'],
      correctSequence: ['printf(', '"%d\\n",', 'x', ');'],
      explanation: 'printf takes the format string first ("%d\\n"), followed by matching variable arguments.'
    }
  },

  {
    id: 'c-04',
    unitId: 'unit-1',
    title: 'The sizeof Operator',
    tag: 'Memory',
    front: {
      question: 'What unit does sizeof() return, and is it evaluated at runtime or compile-time?',
      code: `printf("%zu bytes\\n", sizeof(int));
printf("%zu bytes\\n", sizeof(char));`,
      hint: 'In C, char is always guaranteed to be exactly 1 byte.'
    },
    back: {
      concept: 'Compile-Time Size Determination',
      explanation: 'sizeof is NOT a function; it is a compile-time operator! It yields the size of an expression or type in BYTES (specifically size_t). sizeof(char) is guaranteed to be 1 byte.',
      mnemonic: 'sizeof = Compiler weighs the bytes!',
      codeSnippet: `int arr[10];
size_t bytes = sizeof(arr); // 10 * sizeof(int) = 40 bytes
size_t count = sizeof(arr) / sizeof(arr[0]); // 10 elements`
    },
    drill: {
      type: 'predict-output',
      prompt: 'What does sizeof(char) evaluate to in standard C on any architecture?',
      options: ['1', '2', '4', 'Depends on 32-bit vs 64-bit'],
      correctAnswer: '1',
      explanation: 'The C standard defines 1 byte as sizeof(char) by definition on every compliant architecture.'
    }
  },

  {
    id: 'c-05',
    unitId: 'unit-1',
    title: 'The scanf() & Address-Of Trap',
    tag: 'Pointers & I/O',
    front: {
      question: 'Why does scanf() require the & operator for primitive types?',
      code: `int score;
// Why &score instead of just score?
scanf("%d", &score);`,
      hint: 'C passes arguments by value. How can scanf modify a variable in your main()?'
    },
    back: {
      concept: 'Pass-by-Address for Mutation',
      explanation: 'In C, functions only receive COPIES of variables. If you passed `score`, scanf would only modify its own internal copy! Passing `&score` hands scanf the memory address where score lives, allowing it to write directly into your memory.',
      mnemonic: '& gives the House Address, not the person inside.',
      codeSnippet: `int num;
scanf("%d", &num); // Correct! Writes to address
// scanf("%d", num); // BUG! Segfaults or writes to random address!`
    },
    drill: {
      type: 'spot-bug',
      prompt: 'Identify the buggy line causing undefined behavior/crash:',
      codeLines: [
        '#include <stdio.h>',
        'int main() {',
        '    int val;',
        '    printf("Enter number: ");',
        '    scanf("%d", val); /* BUG */',
        '    return 0;',
        '}'
      ],
      bugLineIndex: 4,
      bugExplanation: 'Missing & before val! scanf expects a pointer (int*), not an uninitialized integer value.'
    }
  },

  // UNIT 2
  {
    id: 'c-06',
    unitId: 'unit-2',
    title: 'Truthiness in C',
    tag: 'Control Flow',
    front: {
      question: 'In C, what evaluates to TRUE, and what evaluates to FALSE in an if condition?',
      code: `if (-42) {
    printf("Executed!\\n");
}`,
      hint: 'There was no native bool type in original C (K&R).'
    },
    back: {
      concept: 'Zero vs Non-Zero Truth Value',
      explanation: 'In C: 0 (and NULL or 0.0) is FALSE. Any NON-ZERO number (including negative numbers like -1 or -42) is TRUE! Therefore if (-42) executes.',
      mnemonic: 'Only ZERO is False. Everything else is True.',
      codeSnippet: `if (0)   { /* Never runs */ }
if (1)   { /* Runs */ }
if (-5)  { /* Runs! */ }
if (100) { /* Runs! */ }`
    },
    drill: {
      type: 'predict-output',
      prompt: 'What does this code print?\n\nint x = -1;\nif (x)\n    printf("YES");\nelse\n    printf("NO");',
      options: ['YES', 'NO', 'Compilation Error', 'Runtime Crash'],
      correctAnswer: 'YES',
      explanation: '-1 is non-zero, so the condition evaluates to true in C!'
    }
  },

  {
    id: 'c-07',
    unitId: 'unit-2',
    title: 'The Switch Fallthrough Trap',
    tag: 'Control Flow',
    front: {
      question: 'What happens if you omit "break;" inside a switch statement case?',
      code: `int opt = 1;
switch (opt) {
    case 1:
        printf("One ");
    case 2:
        printf("Two ");
    default:
        printf("Done");
}`,
      hint: 'Execution falls through to the next lines!'
    },
    back: {
      concept: 'Case Fallthrough',
      explanation: 'In C, cases act as jump labels. Once execution matches case 1, it continues executing every following case until it hits a `break;` or the end of the switch!',
      mnemonic: 'Forget your break, pay for the mistake!',
      codeSnippet: `// Prints: "One Two Done"
// To fix, put break; after each case:`
    },
    drill: {
      type: 'predict-output',
      prompt: 'What is printed by this snippet?\n\nint n = 1;\nswitch(n) {\n  case 1: printf("A");\n  case 2: printf("B"); break;\n  default: printf("C");\n}',
      options: ['AB', 'A', 'B', 'ABC'],
      correctAnswer: 'AB',
      explanation: 'Case 1 has no break statement, so it prints "A" and falls through into case 2, printing "B" before hitting break.'
    }
  },

  {
    id: 'c-08',
    unitId: 'unit-2',
    title: 'Pre-increment vs Post-increment',
    tag: 'Operators',
    front: {
      question: 'What is the subtle difference between ++x and x++?',
      code: `int a = 5;
int b = a++;

int x = 5;
int y = ++x;`,
      hint: 'When does the increment happen: before evaluating or after?'
    },
    back: {
      concept: 'Pre vs Post Increment Sequencing',
      explanation: '++x increments FIRST, then returns the new value (y becomes 6). x++ returns the CURRENT value first, then increments (b becomes 5, while a becomes 6 afterwards).',
      mnemonic: 'Pre = Pay first, take later.\nPost = Take first, pay later.',
      codeSnippet: `int i = 3;
printf("%d\\n", i++); // Prints 3 (now i is 4)
printf("%d\\n", ++i); // Increments to 5, prints 5`
    },
    drill: {
      type: 'predict-output',
      prompt: 'What does this print?\n\nint i = 10;\nint res = i++;\nprintf("%d,%d", res, i);',
      options: ['10,11', '11,11', '10,10', '11,10'],
      correctAnswer: '10,11',
      explanation: 'res receives the original value (10), and i is incremented to 11 right after.'
    }
  },

  {
    id: 'c-09',
    unitId: 'unit-2',
    title: 'do-while vs while',
    tag: 'Loops',
    front: {
      question: 'What is the key guarantee provided by a do-while loop compared to a standard while loop?',
      code: `int x = 100;
do {
    printf("Executed!\\n");
} while (x < 10);`,
      hint: 'Where is the condition evaluated: top or bottom?'
    },
    back: {
      concept: 'Exit-Condition Loop',
      explanation: 'In a `while` loop, the condition is evaluated at the start, meaning the body may execute ZERO times. In a `do-while` loop, the condition is tested at the END, guaranteeing the body executes AT LEAST ONCE.',
      mnemonic: 'Do first, ask questions while later.',
      codeSnippet: `// Guaranteed at least 1 iteration:
do {
    printf("Enter positive number: ");
    scanf("%d", &num);
} while (num <= 0);`
    }
  },

  // UNIT 3: POINTERS & MEMORY (THE BOSS LEVEL)
  {
    id: 'c-10',
    unitId: 'unit-3',
    title: 'The Address-Of (&) vs Dereference (*)',
    tag: 'Pointers',
    front: {
      question: 'What is the exact distinction between &x and *ptr in C?',
      code: `int x = 42;
int *ptr = &x;

printf("Value: %d\\n", *ptr);
printf("Address: %p\\n", (void*)ptr);`,
      hint: '& means "Where do you live?", * means "Go there and open the door!"'
    },
    back: {
      concept: 'Pointer Duality',
      explanation: '&x gets the physical RAM memory address of x.\n*ptr dereferences the pointer: it looks up the address stored inside ptr and reads/writes the value residing there.',
      mnemonic: '& = Address (GPS Coordinates)\n* = Unbox / Open the package at that address',
      codeSnippet: `int num = 10;
int *p = &num; // p stores e.g. 0x7ffd98b
*p = 99;       // num is now 99!`
    },
    drill: {
      type: 'predict-output',
      prompt: 'What does this print?\n\nint a = 5;\nint *p = &a;\n*p = *p * 2;\nprintf("%d", a);',
      options: ['10', '5', 'Address of a', 'Segmentation fault'],
      correctAnswer: '10',
      explanation: '*p modifies the memory of variable a directly, doubling 5 into 10.'
    }
  },

  {
    id: 'c-11',
    unitId: 'unit-3',
    title: 'Wild Pointers & Uninitialized Memory',
    tag: 'Memory Safety',
    front: {
      question: 'What is a "Wild Pointer" and why is it extremely dangerous?',
      code: `int *ptr; // Uninitialized!
*ptr = 100; // DANGER!`,
      hint: 'Local variables in C contain whatever garbage was previously in that memory slot.'
    },
    back: {
      concept: 'Uninitialized Pointer Hazard',
      explanation: 'In C, local variables are not zeroed out by default; they contain garbage values. A wild pointer points to an arbitrary random memory address. Writing `*ptr = 100` might overwrite OS code or other variables, triggering a Segmentation Fault.',
      mnemonic: 'Always tame your wild pointers: initialize with NULL or a valid address!',
      codeSnippet: `// Safe practice:
int *ptr = NULL;`
    },
    drill: {
      type: 'spot-bug',
      prompt: 'Find the line with the dangerous wild pointer dereference:',
      codeLines: [
        '#include <stdio.h>',
        'int main() {',
        '    int *p;',
        '    *p = 500; /* DANGER */',
        '    printf("%d", *p);',
        '    return 0;',
        '}'
      ],
      bugLineIndex: 3,
      bugExplanation: 'Dereferencing uninitialized pointer p! It points to random memory.'
    }
  },

  {
    id: 'c-12',
    unitId: 'unit-3',
    title: 'Pointer Arithmetic Steps',
    tag: 'Pointers',
    front: {
      question: 'If ptr is an int* pointing to address 1000, what address does (ptr + 1) point to?',
      code: `int *ptr = (int*)1000;
printf("%p\\n", ptr + 1); // Assume 4-byte int`,
      hint: 'Pointers advance by the sizeof(data type), NOT by 1 raw byte!'
    },
    back: {
      concept: 'Type-Scaled Pointer Arithmetic',
      explanation: 'When adding 1 to a pointer `ptr + 1`, the compiler scales the step by `sizeof(*ptr)`. For a 4-byte `int`, `1000 + 1` steps to `1004`! For a `char` (1 byte), it steps to `1001`.',
      mnemonic: 'Pointers take giant steps sized like their data type.',
      codeSnippet: `int arr[3] = {10, 20, 30};
int *p = arr;
// *(p + 1) is equivalent to arr[1] (20)`
    },
    drill: {
      type: 'predict-output',
      prompt: 'If sizeof(int) is 4 bytes, how many bytes does ptr advance when evaluating (ptr + 2)?',
      options: ['8 bytes', '2 bytes', '4 bytes', '16 bytes'],
      correctAnswer: '8 bytes',
      explanation: '2 elements * 4 bytes per int = 8 bytes forward in memory.'
    }
  },

  {
    id: 'c-13',
    unitId: 'unit-3',
    title: 'Pass-by-Reference in C: The Swap Function',
    tag: 'Functions',
    front: {
      question: 'How do you correctly write a function in C to swap two integers in caller scope?',
      code: `void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}`,
      hint: 'Caller passes &x and &y!'
    },
    back: {
      concept: 'Simulating Pass-by-Reference with Pointers',
      explanation: 'C does not have C++ reference types (`int &x`). To let a function mutate variables in main, you must pass pointer arguments (`swap(&x, &y)`) and dereference them inside.',
      mnemonic: 'Pass the address, unlock the mutation.',
      codeSnippet: `int x = 5, y = 9;
swap(&x, &y);
// Now x == 9 and y == 5`
    },
    drill: {
      type: 'scramble',
      prompt: 'Order the statements to swap values using pointers:',
      tokens: ['int temp = *a;', '*a = *b;', '*b = temp;'],
      correctSequence: ['int temp = *a;', '*a = *b;', '*b = temp;'],
      explanation: 'Standard 3-step swap: store *a into temporary, overwrite *a with *b, assign temporary to *b.'
    }
  },

  {
    id: 'c-14',
    unitId: 'unit-3',
    title: 'NULL Pointer Dereference',
    tag: 'Memory Safety',
    front: {
      question: 'What happens at the CPU/OS level when you attempt to dereference a NULL pointer (*NULL)?',
      code: `int *ptr = NULL;
printf("%d", *ptr);`,
      hint: 'Address 0x0 is protected by OS virtual memory pages.'
    },
    back: {
      concept: 'Segmentation Fault / Page Fault',
      explanation: 'NULL points to memory address 0 (or a reserved page). Modern operating systems protect page 0 with no read/write permissions. Attempting to dereference triggers a hardware memory protection fault, instantly crashing the program with `Segmentation fault (core dumped)`.',
      mnemonic: 'Never touch NULL without checking `if (ptr != NULL)` first!',
      codeSnippet: `if (ptr != NULL) {
    printf("%d", *ptr);
} else {
    printf("Pointer is empty!\\n");
}`
    }
  },

  // UNIT 4: ARRAYS, STRINGS & HEAP
  {
    id: 'c-15',
    unitId: 'unit-4',
    title: 'Array Decay to Pointers',
    tag: 'Arrays',
    front: {
      question: 'Why is arr[i] completely identical to *(arr + i) in C?',
      code: `int arr[] = {10, 20, 30};
printf("%d %d\\n", arr[1], *(arr + 1));`,
      hint: 'Array indexing in C is purely syntactic sugar for pointer offset.'
    },
    back: {
      concept: 'Array Name Decays to Pointer to First Element',
      explanation: 'In most expressions, the array name `arr` decays into a pointer `&arr[0]`. The bracket syntax `arr[i]` is defined by the C standard as syntactic sugar for `*(arr + i)`. Fun fact: because addition is commutative, `1[arr]` is also valid C!',
      mnemonic: 'arr[i] == *(arr + i) == i[arr]',
      codeSnippet: `int nums[] = {5, 10, 15};
int *p = nums;
printf("%d\\n", *(p + 2)); // Prints 15`
    },
    drill: {
      type: 'predict-output',
      prompt: 'What does this print?\n\nint arr[] = {100, 200, 300};\nprintf("%d", *(arr + 2));',
      options: ['300', '100', '200', 'Address of array'],
      correctAnswer: '300',
      explanation: '*(arr + 2) accesses index 2 (the third element, 300).'
    }
  },

  {
    id: 'c-16',
    unitId: 'unit-4',
    title: 'The Hidden Null Terminator \\0',
    tag: 'Strings',
    front: {
      question: 'How many bytes does the string literal "C-Lingo" occupy in memory?',
      code: `char str[] = "C-Lingo";
printf("%zu bytes", sizeof(str));`,
      hint: 'Count the characters... plus the secret end marker!'
    },
    back: {
      concept: 'Null-Terminated Strings (ASCIIZ)',
      explanation: 'C has no string class. Strings are arrays of char ending with an implicit null terminator byte `\'\\0\'` (ASCII 0). "C-Lingo" has 7 visible characters + 1 null terminator = 8 bytes total!',
      mnemonic: 'Every C string needs a null caboose on its train: \'\\0\'',
      codeSnippet: `// Explicit character array equivalent:
char str[8] = {'C', '-', 'L', 'i', 'n', 'g', 'o', '\\0'};`
    },
    drill: {
      type: 'predict-output',
      prompt: 'What does sizeof("Hello") return in C?',
      options: ['6', '5', '4', '8'],
      correctAnswer: '6',
      explanation: '5 characters (\'H\',\'e\',\'l\',\'l\',\'o\') plus the implicit \'\\0\' = 6 bytes.'
    }
  },

  {
    id: 'c-17',
    unitId: 'unit-4',
    title: 'malloc() and free() on the Heap',
    tag: 'Dynamic Memory',
    front: {
      question: 'What happens if you allocate memory with malloc() but never call free()?',
      code: `int *buffer = (int*)malloc(100 * sizeof(int));
// ... finish using buffer without free(buffer);`,
      hint: 'The OS process keeps holding onto that RAM until exit.'
    },
    back: {
      concept: 'Memory Leaks on the Heap',
      explanation: 'Stack variables disappear automatically when their function returns. Heap memory allocated via `malloc()`, `calloc()`, or `realloc()` remains allocated until explicitly released with `free()`. Failing to free causes a MEMORY LEAK.',
      mnemonic: 'Every malloc must have a matching free!',
      codeSnippet: `int *arr = malloc(10 * sizeof(int));
if (arr == NULL) {
    // Allocation failed!
    return -1;
}
// Use arr...
free(arr);
arr = NULL; // Prevent dangling pointer!`
    },
    drill: {
      type: 'fill-blank',
      prompt: 'Complete the statement to safely release dynamically allocated memory:',
      codeBefore: 'int *ptr = malloc(sizeof(int) * 50);\n/* use memory */\n',
      codeAfter: '(ptr);\nptr = NULL;',
      options: ['free', 'delete', 'release', 'clear'],
      correctAnswer: 'free',
      explanation: 'free() is the C standard library function used to deallocate heap memory.'
    }
  },

  {
    id: 'c-18',
    unitId: 'unit-4',
    title: 'Dangling Pointers after free()',
    tag: 'Memory Safety',
    front: {
      question: 'What is a Dangling Pointer, and how do you neutralize it immediately after free()?',
      code: `int *ptr = malloc(sizeof(int));
*ptr = 42;
free(ptr);
// ptr still holds old address!`,
      hint: 'What should you set ptr to immediately after freeing?'
    },
    back: {
      concept: 'Dangling Pointer Prevention',
      explanation: 'Calling `free(ptr)` marks that heap block as available for reuse, but does NOT change the variable `ptr`. `ptr` is now a "Dangling Pointer". Dereferencing it is Use-After-Free (UAF), a severe security vulnerability! Always set `ptr = NULL;` immediately after freeing.',
      mnemonic: 'Free it, then NULL it.',
      codeSnippet: `free(ptr);
ptr = NULL; // Now ptr can never be accidentally read or double-freed!`
    },
    drill: {
      type: 'spot-bug',
      prompt: 'Spot the Use-After-Free bug line:',
      codeLines: [
        'int *p = malloc(sizeof(int));',
        '*p = 10;',
        'free(p);',
        'printf("%d", *p); /* BUG: Use after free */',
        'return 0;'
      ],
      bugLineIndex: 3,
      bugExplanation: 'Dereferencing pointer p after it was already freed!'
    }
  }
];
