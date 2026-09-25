// CodLingo DSA (Data Structures & Algorithms) Dataset
// Comprehensive question set with 4-Option Quizzes, Visual Code Diagrams & Mnemonic Tricks

export const DSA_UNITS = [
  {
    id: 'dsa-u1',
    number: 1,
    title: 'Arrays, Two Pointers & Sliding Window',
    description: 'Master in-place manipulation, two-pointer convergence, and prefix sums.',
    color: 'from-blue-600 to-indigo-700',
    cards: ['dsa-01', 'dsa-02', 'dsa-03', 'dsa-04']
  },
  {
    id: 'dsa-u2',
    number: 2,
    title: 'Linked Lists, Stacks & Queues',
    description: 'Floyd cycle detection, pointer reversals, and LIFO/FIFO patterns.',
    color: 'from-violet-600 to-purple-700',
    cards: ['dsa-05', 'dsa-06', 'dsa-07']
  },
  {
    id: 'dsa-u3',
    number: 3,
    title: 'Trees, Graphs & Recursion',
    description: 'BST invariants, LCA, BFS queue levels, and DFS recursion trees.',
    color: 'from-teal-600 to-emerald-700',
    cards: ['dsa-08', 'dsa-09', 'dsa-10']
  },
  {
    id: 'dsa-u4',
    number: 4,
    title: 'Dynamic Programming & Big-O Complexity',
    description: 'Overlapping subproblems, memoization tables, and time complexity bounds.',
    color: 'from-rose-600 to-pink-700',
    cards: ['dsa-11', 'dsa-12']
  }
];

export const DSA_CARDS = [
  {
    id: 'dsa-01',
    unitId: 'dsa-u1',
    title: 'Two Pointers: Target Sum in Sorted Array',
    tag: 'Two Pointers',
    front: {
      question: 'Why does the Two-Pointer technique achieve O(N) time for finding a pair sum in a sorted array?',
      code: `int left = 0, right = n - 1;
while (left < right) {
    int sum = arr[left] + arr[right];
    if (sum == target) return true;
    else if (sum < target) left++;
    else right--;
}`,
      hint: 'Because the array is sorted, sum < target guarantees we need a larger element.'
    },
    back: {
      concept: 'Monotonic Search Space Reduction',
      explanation: 'Since the array is sorted, if arr[left] + arr[right] is too small, moving right inwards would only make it smaller! Therefore, advancing left is the ONLY choice that can increase the sum, pruning unnecessary combinations from O(N^2) down to O(N).',
      mnemonic: 'Too small? Advance left. Too big? Step right back.',
      codeSnippet: `// O(N) time, O(1) auxiliary space`
    },
    quiz: {
      question: 'What is the time complexity of the Two-Pointer pair sum technique on a sorted array of size N?',
      options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(log N)'],
      correctAnswer: 'O(N)',
      explanation: 'Each iteration advances left or decrements right, visiting each element at most once.'
    },
    drill: {
      type: 'predict-output',
      prompt: 'If sum < target in a sorted two-pointer sweep, which pointer must move?',
      options: ['left++', 'right--', 'both inwards', 'reset right to end'],
      correctAnswer: 'left++',
      explanation: 'Incrementing left accesses a larger number, helping reach the target sum.'
    }
  },
  {
    id: 'dsa-02',
    unitId: 'dsa-u1',
    title: 'Sliding Window: Maximum Sum Subarray of Size K',
    tag: 'Sliding Window',
    front: {
      question: 'How does Sliding Window avoid recomputing the sum of K elements from scratch?',
      code: `int window_sum = 0;
// Subtract leaving element, add entering element:
window_sum += arr[i] - arr[i - k];`,
      hint: 'Shift the window by updating only the boundary elements in O(1) time.'
    },
    back: {
      concept: 'Incremental Window Maintenance',
      explanation: 'Instead of summing all K elements (which takes O(N * K)), subtract the element dropping off the left edge and add the new element arriving on the right edge in O(1) constant time, achieving O(N) overall.',
      mnemonic: 'Drop the old caboose, attach the new engine!',
      codeSnippet: `window_sum += nums[i] - nums[i - k];\nmax_sum = max(max_sum, window_sum);`
    },
    quiz: {
      question: 'What is the time complexity to find the maximum sum subarray of fixed size K using a sliding window on an array of length N?',
      options: ['O(N)', 'O(N * K)', 'O(K log N)', 'O(N^2)'],
      correctAnswer: 'O(N)',
      explanation: 'Each element enters and leaves the sliding window exactly once in O(1) time.'
    },
    drill: {
      type: 'fill-blank',
      prompt: 'Complete the sliding window formula:',
      codeBefore: 'window_sum = window_sum - nums[i - k] + ',
      codeAfter: ';',
      options: ['nums[i]', 'nums[k]', 'nums[0]', 'nums[i + 1]'],
      correctAnswer: 'nums[i]',
      explanation: 'Add the new element nums[i] entering the window.'
    }
  },
  {
    id: 'dsa-03',
    unitId: 'dsa-u1',
    title: 'Dutch National Flag (0s, 1s, 2s)',
    tag: 'Partitioning',
    front: {
      question: 'How does Dijkstra\'s Dutch National Flag algorithm sort [0, 1, 2] in a single pass?',
      code: `int low = 0, mid = 0, high = n - 1;
// 3 pointers partition array into 4 zones`,
      hint: 'low marks boundary of 0s, mid scans, high marks boundary of 2s.'
    },
    back: {
      concept: '3-Way In-Place Partitioning',
      explanation: 'Maintain 3 pointers: elements before low are 0s, elements after high are 2s, and elements between low and mid-1 are 1s. Achieves O(N) time and O(1) extra space without counting passes.',
      mnemonic: 'Low traps 0, High traps 2, Mid explores the rest.',
      codeSnippet: `if (arr[mid] == 0) swap(arr[low++], arr[mid++]);\nelse if (arr[mid] == 1) mid++;\nelse swap(arr[mid], arr[high--]);`
    },
    quiz: {
      question: 'In the Dutch National Flag algorithm, why does mid NOT increment when swapping with high?',
      options: [
        'The element swapped from high has not been examined yet',
        'high is always 0',
        'low must advance first',
        'To prevent infinite loop'
      ],
      correctAnswer: 'The element swapped from high has not been examined yet',
      explanation: 'The element coming from high is uninspected, so mid must re-check it in the next cycle.'
    },
    drill: {
      type: 'predict-output',
      prompt: 'What is the auxiliary space complexity of the Dutch National Flag 3-pointer sort?',
      options: ['O(1)', 'O(N)', 'O(log N)', 'O(3)'],
      correctAnswer: 'O(1)',
      explanation: 'Sorting is performed in-place with just 3 pointer variables.'
    }
  },
  {
    id: 'dsa-04',
    unitId: 'dsa-u1',
    title: 'Binary Search Invariant',
    tag: 'Binary Search',
    front: {
      question: 'Why should mid be calculated as mid = low + (high - low) / 2 instead of (low + high) / 2?',
      code: `// Avoid integer overflow:\nint mid = low + (high - low) / 2;`,
      hint: 'What happens in C/Java when low + high exceeds 2^31 - 1?'
    },
    back: {
      concept: '32-Bit Integer Overflow Prevention',
      explanation: 'If low and high are large (e.g. > 1 billion), low + high overflows the 32-bit signed integer limit (2,147,483,647) becoming negative! `low + (high - low) / 2` calculates the identical mathematical midpoint without risk of overflow.',
      mnemonic: 'Subtract before you add to keep integers glad!',
      codeSnippet: `int mid = low + (high - low) / 2; // Famous bug discovered by Joshua Bloch`
    },
    quiz: {
      question: 'What dangerous bug occurs when writing `mid = (low + high) / 2` with large arrays in C/Java/C++?',
      options: [
        'Integer overflow wraps around to a negative index',
        'Divide-by-zero runtime trap',
        'Off-by-one infinite loop',
        'Compilation type mismatch'
      ],
      correctAnswer: 'Integer overflow wraps around to a negative index',
      explanation: 'Adding two large signed 32-bit ints exceeds INT_MAX, producing a negative index that triggers an out-of-bounds crash.'
    },
    drill: {
      type: 'predict-output',
      prompt: 'What is the time complexity of Binary Search on a sorted array of length N?',
      options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(1)'],
      correctAnswer: 'O(log N)',
      explanation: 'The search space halves on every step, yielding logarithmic O(log N) time.'
    }
  },

  // UNIT 2
  {
    id: 'dsa-05',
    unitId: 'dsa-u2',
    title: 'Floyd\'s Cycle Detection (Tortoise & Hare)',
    tag: 'Linked Lists',
    front: {
      question: 'How do slow and fast pointers detect a cycle in a linked list without using a hash set?',
      code: `Node *slow = head, *fast = head;
while (fast && fast->next) {
    slow = slow->next;
    fast = fast->next->next;
    if (slow == fast) return true; // Cycle!
}`,
      hint: 'In a circular running track, a runner moving at 2x speed will always lap a runner moving at 1x speed.'
    },
    back: {
      concept: 'Relative Speed Distance Reduction',
      explanation: 'Once both enter the loop of length C, the relative distance between them decreases by 1 node per step. They are guaranteed to meet in at most C steps. O(N) time and O(1) space!',
      mnemonic: 'The Tortoise and the Hare must collide on a track.',
      codeSnippet: `// Meets at intersection point in O(1) space`
    },
    quiz: {
      question: 'What is the space complexity of Floyd\'s Cycle Detection Algorithm?',
      options: ['O(1)', 'O(N)', 'O(log N)', 'O(C) where C is cycle length'],
      correctAnswer: 'O(1)',
      explanation: 'Floyd uses only two pointer variables without any extra hash set allocations.'
    },
    drill: {
      type: 'predict-output',
      prompt: 'If slow advances 1 node per step and fast advances 2 nodes, by how much does their distance shrink each step inside a loop?',
      options: ['1 node', '2 nodes', '0 nodes', 'Depends on head length'],
      correctAnswer: '1 node',
      explanation: 'Relative speed = 2 - 1 = 1 node per step.'
    }
  },
  {
    id: 'dsa-06',
    unitId: 'dsa-u2',
    title: 'Reversing a Singly Linked List',
    tag: 'Linked Lists',
    front: {
      question: 'What 3 pointers are required to reverse a singly linked list iteratively in place?',
      code: `ListNode *prev = NULL, *curr = head, *next = NULL;
while (curr != NULL) {
    next = curr->next;
    curr->next = prev;
    prev = curr;
    curr = next;
}`,
      hint: 'prev tracks the reversed portion, curr is being flipped, next saves the rest.'
    },
    back: {
      concept: 'Pointer Inversion',
      explanation: 'You must save `curr->next` before overwriting it with `prev`, otherwise the remainder of the linked list is permanently lost in memory!',
      mnemonic: 'Save next, reverse link, march forward.',
      codeSnippet: `return prev; // New head of reversed list`
    },
    quiz: {
      question: 'Why must you store `curr->next` in a temporary pointer before executing `curr->next = prev;`?',
      options: [
        'To prevent losing access to the rest of the list',
        'To allocate heap memory for the node',
        'To avoid garbage collection',
        'To verify the node is not NULL'
      ],
      correctAnswer: 'To prevent losing access to the rest of the list',
      explanation: 'Overwriting curr->next breaks the forward chain; without saving next, subsequent nodes become unreachable.'
    },
    drill: {
      type: 'scramble',
      prompt: 'Order the statements to reverse a node in a singly linked list:',
      tokens: ['next = curr->next;', 'curr->next = prev;', 'prev = curr;', 'curr = next;'],
      correctSequence: ['next = curr->next;', 'curr->next = prev;', 'prev = curr;', 'curr = next;'],
      explanation: 'Save next node, redirect current pointer to prev, advance prev, advance curr.'
    }
  },
  {
    id: 'dsa-07',
    unitId: 'dsa-u2',
    title: 'Valid Parentheses using a Stack',
    tag: 'Stacks',
    front: {
      question: 'Why is a LIFO Stack the optimal data structure to validate nested brackets like "{[()()]} "?',
      code: `stack.push(char); // on opening bracket
char top = stack.pop(); // on closing bracket`,
      hint: 'The most recently opened bracket must be the very first one to close!'
    },
    back: {
      concept: 'Last-In, First-Out Nesting',
      explanation: 'Parentheses obey strict hierarchical nesting. The most recent opening symbol must match the next closing symbol. A stack naturally provides this LIFO ordering in O(N) time and O(N) space.',
      mnemonic: 'Last opened, first closed.',
      codeSnippet: `if (matching(stack.top(), c)) stack.pop();\nelse return false;`
    },
    quiz: {
      question: 'What condition verifies that all brackets in a string were successfully closed after processing?',
      options: ['stack.isEmpty() == true', 'stack.size() == 1', 'top == NULL', 'stack.capacity() == 0'],
      correctAnswer: 'stack.isEmpty() == true',
      explanation: 'An empty stack at the end confirms every opened bracket was matched and popped.'
    },
    drill: {
      type: 'predict-output',
      prompt: 'What does Valid Parentheses return for "([)]"?',
      options: ['false (improperly interleaved)', 'true', 'Runtime Error', 'Empty Stack'],
      correctAnswer: 'false (improperly interleaved)',
      explanation: 'The brackets overlap incorrectly: ) is encountered while [ is on top of the stack.'
    }
  },

  // UNIT 3
  {
    id: 'dsa-08',
    unitId: 'dsa-u3',
    title: 'Inorder Traversal Property of a BST',
    tag: 'Binary Search Trees',
    front: {
      question: 'What special sequence do you always obtain when performing an Inorder Traversal on a Binary Search Tree (BST)?',
      code: `void inorder(Node *root) {\n    if (!root) return;\n    inorder(root->left);\n    printf("%d ", root->val);\n    inorder(root->right);\n}`,
      hint: 'Left < Root < Right.'
    },
    back: {
      concept: 'Strict Ascending Order Invariant',
      explanation: 'In a valid BST, all elements in the left subtree are smaller than the root, and all in the right subtree are greater. Inorder (Left -> Root -> Right) visits elements in strictly sorted ascending order!',
      mnemonic: 'Inorder on BST = Instant Sorted Array!',
      codeSnippet: `// Useful for validating BST or finding k-th smallest element`
    },
    quiz: {
      question: 'What does an Inorder Traversal (Left, Root, Right) on a valid Binary Search Tree produce?',
      options: [
        'Elements in strictly sorted ascending order',
        'Elements grouped by depth level',
        'Reverse sorted descending order',
        'Leaf nodes first followed by internal nodes'
      ],
      correctAnswer: 'Elements in strictly sorted ascending order',
      explanation: 'Since left < root < right everywhere in a BST, Inorder traversal yields sorted order.'
    },
    drill: {
      type: 'predict-output',
      prompt: 'In a BST with root 10, left 5, right 15, what is the Inorder traversal output?',
      options: ['5 10 15', '10 5 15', '15 10 5', '5 15 10'],
      correctAnswer: '5 10 15',
      explanation: 'Left (5) -> Root (10) -> Right (15).'
    }
  },
  {
    id: 'dsa-09',
    unitId: 'dsa-u3',
    title: 'Breadth-First Search (BFS) Level-Order',
    tag: 'Graphs & Trees',
    front: {
      question: 'Why does Breadth-First Search (BFS) guarantee finding the SHORTEST path on an unweighted graph?',
      code: `queue.push(start);\nwhile (!queue.empty()) {\n    // Explores all distance d nodes before d+1\n}`,
      hint: 'BFS radiates outward in concentric circles (distance 1, distance 2, etc.).'
    },
    back: {
      concept: 'Uniform Distance Expansion',
      explanation: 'A FIFO queue ensures all nodes at distance k from the source are processed before any node at distance k + 1. The first time the destination node is dequeued, it is guaranteed to be along the shortest path.',
      mnemonic: 'BFS = Outward ripples in a pond.',
      codeSnippet: `q.push(root);\nwhile(!q.empty()) { int sz = q.size(); ... }`
    },
    quiz: {
      question: 'Which fundamental data structure is utilized to implement BFS traversal?',
      options: ['Queue (FIFO)', 'Stack (LIFO)', 'Priority Queue', 'Array List'],
      correctAnswer: 'Queue (FIFO)',
      explanation: 'A FIFO queue ensures nodes are visited in strict level-by-level distance order.'
    },
    drill: {
      type: 'fill-blank',
      prompt: 'Complete the BFS initialization:',
      codeBefore: 'std::',
      codeAfter: '<Node*> q; q.push(start);',
      options: ['queue', 'stack', 'vector', 'set'],
      correctAnswer: 'queue',
      explanation: 'BFS uses a standard queue data structure.'
    }
  },
  {
    id: 'dsa-10',
    unitId: 'dsa-u3',
    title: 'Lowest Common Ancestor (LCA)',
    tag: 'Trees',
    front: {
      question: 'How do you find the LCA of two nodes p and q in a Binary Search Tree in O(H) time?',
      code: `if (p->val < root->val && q->val < root->val)\n    return LCA(root->left, p, q);\nelse if (p->val > root->val && q->val > root->val)\n    return LCA(root->right, p, q);\nelse\n    return root; // Split point!`,
      hint: 'The LCA is the exact node where p and q split into opposite subtrees!'
    },
    back: {
      concept: 'BST Split Point Property',
      explanation: 'If both p and q are smaller than root, LCA must be in the left subtree. If both are larger, it must be in the right. The moment p and q branch in different directions (or one equals root), root is their Lowest Common Ancestor.',
      mnemonic: 'The fork in the road is the LCA!',
      codeSnippet: `// Runs in O(H) time where H is tree height`
    },
    quiz: {
      question: 'In a BST, when does root become the Lowest Common Ancestor (LCA) of nodes p and q?',
      options: [
        'When p and q lie on opposite sides of root (one <= root, other >= root)',
        'When root has no children',
        'When both p and q are in the left subtree',
        'When height is 0'
      ],
      correctAnswer: 'When p and q lie on opposite sides of root (one <= root, other >= root)',
      explanation: 'The node where the search paths for p and q diverge is by definition their Lowest Common Ancestor.'
    },
    drill: {
      type: 'predict-output',
      prompt: 'In a BST with root 20, p = 5, q = 30, what is LCA(p, q)?',
      options: ['20', '5', '30', 'NULL'],
      correctAnswer: '20',
      explanation: '5 is in left subtree (< 20) and 30 is in right (> 20), so 20 is the split point.'
    }
  },

  // UNIT 4
  {
    id: 'dsa-11',
    unitId: 'dsa-u4',
    title: 'Memoization (Top-Down) vs Tabulation (Bottom-Up)',
    tag: 'Dynamic Programming',
    front: {
      question: 'What are the two necessary properties a problem must possess to be solvable by Dynamic Programming?',
      code: `1. Overlapping Subproblems\n2. Optimal Substructure`,
      hint: 'Breaking into smaller identical problems, whose solutions compose the overall best solution.'
    },
    back: {
      concept: 'The 2 Pillars of DP',
      explanation: '1. Overlapping Subproblems: The same sub-computations are evaluated repeatedly (e.g. Fib(3) computed multiple times).\n2. Optimal Substructure: An optimal solution to the problem can be constructed from optimal solutions to its subproblems.',
      mnemonic: 'Overlap + Optimal = Dynamic Programming!',
      codeSnippet: `int memo[MAX_N]; // Store solved subproblems`
    },
    quiz: {
      question: 'Why does naive recursive Fibonacci take O(2^N) time without memoization?',
      options: [
        'It repeatedly recomputes the exact same subproblems exponentially',
        'Stack overflow occurs immediately',
        'Memory allocation fails on the heap',
        'Addition has quadratic complexity'
      ],
      correctAnswer: 'It repeatedly recomputes the exact same subproblems exponentially',
      explanation: 'The call tree branches into 2 calls per node, redundantly re-solving identical values.'
    },
    drill: {
      type: 'predict-output',
      prompt: 'What does memoization reduce Fibonacci time complexity to?',
      options: ['O(N)', 'O(2^N)', 'O(N^2)', 'O(1)'],
      correctAnswer: 'O(N)',
      explanation: 'Each value from 1 to N is computed once and cached.'
    }
  },
  {
    id: 'dsa-12',
    unitId: 'dsa-u4',
    title: 'Big-O Growth Hierarchy',
    tag: 'Complexity Theory',
    front: {
      question: 'What is the correct ordering of time complexities from fastest growing (worst) to slowest (best)?',
      code: `O(1) < O(log N) < O(N) < O(N log N) < O(N^2) < O(2^N) < O(N!)`,
      hint: 'Factorial and exponential explode very quickly!'
    },
    back: {
      concept: 'Asymptotic Dominance',
      explanation: 'As N becomes large, higher-order terms dominate. Algorithms with O(2^N) or O(N!) become intractable even for N = 30-50, whereas O(N log N) easily processes millions of elements per second.',
      mnemonic: '1, log, linear, n-log-n, square, exponential, factorial.',
      codeSnippet: `// N = 1,000,000:\n// O(log N) ~ 20 ops\n// O(N log N) ~ 20,000,000 ops\n// O(N^2) ~ 1,000,000,000,000 ops (Too slow!)`
    },
    quiz: {
      question: 'Which of the following time complexities scales fastest (slowest execution for large N)?',
      options: ['O(N!)', 'O(2^N)', 'O(N^3)', 'O(N log N)'],
      correctAnswer: 'O(N!)',
      explanation: 'Factorial O(N!) grows faster than exponential O(2^N) or polynomial bounds.'
    },
    drill: {
      type: 'predict-output',
      prompt: 'What is the average time complexity of QuickSort?',
      options: ['O(N log N)', 'O(N)', 'O(N^2)', 'O(log N)'],
      correctAnswer: 'O(N log N)',
      explanation: 'QuickSort divides problem in half on average, leading to O(N log N) time.'
    }
  }
];
