// ============================================
// SIMULATION DETAILS PAGE FUNCTIONALITY
// ============================================

// Get URL parameters to determine which simulation
function getSimulationInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get('subject');
    const topic = urlParams.get('topic');
    const simulation = urlParams.get('simulation');
    
    return { subject, topic, simulation };
}

// Comprehensive simulation content database with real, accurate information
const simulationContentDatabase = {
    // DSA Topics
    "Array Operations": {
        overview: "Arrays are fundamental data structures that store elements in contiguous memory locations. This simulation helps you understand how arrays work under the hood, from basic indexing to complex operations like insertion, deletion, and dynamic resizing. Through interactive visualization, you'll see how array operations impact performance and memory usage, making abstract concepts tangible and easier to grasp.",
        objectives: [
            "Understand the fundamental structure and memory layout of arrays in computer memory",
            "Master array indexing mechanisms and how elements are accessed efficiently",
            "Analyze time complexity of common array operations including access, search, insertion, and deletion",
            "Explore dynamic array resizing strategies and their impact on performance",
            "Compare static and dynamic arrays to understand trade-offs in different scenarios"
        ],
        topics: [
            "Array declaration and initialization methods",
            "Element access through indexing and pointer arithmetic",
            "Insertion and deletion operations at different positions",
            "Dynamic array resizing and amortized analysis",
            "Time and space complexity analysis of array operations",
            "Memory allocation patterns and cache efficiency"
        ]
    },
    "Linked List Traversal": {
        overview: "Linked lists represent a dynamic approach to data organization, where elements are connected through pointers rather than stored contiguously. This simulation demonstrates how traversal works in linked structures, showing you the step-by-step movement through nodes and helping you understand pointer manipulation. You'll visualize how different traversal strategies work and see the memory patterns that make linked lists flexible yet efficient.",
        objectives: [
            "Comprehend pointer-based data structure implementation and memory management",
            "Master sequential traversal techniques in singly and doubly linked lists",
            "Understand how pointers connect nodes and enable dynamic data organization",
            "Analyze traversal time complexity and compare with array-based structures",
            "Explore circular list traversal and boundary condition handling"
        ],
        topics: [
            "Node structure, data fields, and pointer connections",
            "Sequential traversal algorithms for different list types",
            "Memory allocation and deallocation in linked structures",
            "Traversal optimization techniques and best practices",
            "Circular linked list handling and cycle detection",
            "Comparison with array traversal performance characteristics"
        ]
    },
    "Stack Operations": {
        overview: "Stacks follow the Last In, First Out (LIFO) principle, making them essential for many computing applications. This simulation lets you visualize push and pop operations in real-time, understand stack overflow scenarios, and explore how stacks manage function calls and expression evaluation. Through hands-on interaction, you'll see why stacks are fundamental to recursion, undo operations, and many algorithmic solutions.",
        objectives: [
            "Understand the LIFO principle and its applications in computing",
            "Master push and pop operations with proper error handling",
            "Analyze stack overflow and underflow scenarios and prevention strategies",
            "Explore real-world stack applications in expression evaluation and function calls",
            "Compare stack implementations using arrays versus linked lists"
        ],
        topics: [
            "Stack Abstract Data Type (ADT) and its operations",
            "Push and pop operations with time complexity analysis",
            "Stack overflow handling and capacity management",
            "Application in expression evaluation and parsing",
            "Recursion and call stack visualization",
            "Stack-based algorithm design patterns"
        ]
    },
    "Binary Tree Traversal": {
        overview: "Binary trees organize data hierarchically, enabling efficient searching, sorting, and data management. This simulation demonstrates the three fundamental traversal methods—inorder, preorder, and postorder—through visual animations that reveal the underlying logic. You'll understand when to use each traversal type and how they enable different operations like expression evaluation, tree copying, and data processing.",
        objectives: [
            "Master three fundamental traversal methods: inorder, preorder, and postorder",
            "Understand recursive and iterative traversal implementations",
            "Analyze time and space complexity of different traversal approaches",
            "Apply traversal techniques to solve real-world problems",
            "Compare traversal strategies for different use cases"
        ],
        topics: [
            "Inorder traversal and its applications in binary search trees",
            "Preorder traversal for tree copying and prefix expression evaluation",
            "Postorder traversal for tree deletion and postfix evaluation",
            "Iterative implementations using stacks",
            "Level-order traversal using queues",
            "Traversal applications in expression trees and file systems"
        ]
    },
    "Graph Traversal": {
        overview: "Graphs model complex relationships in networks, social connections, and system architectures. This simulation visualizes depth-first and breadth-first search algorithms, showing how they explore graph structures differently. You'll see pathfinding in action, understand when to use each algorithm, and discover how traversal strategies impact performance in real-world applications like network routing and social network analysis.",
        objectives: [
            "Understand graph representation methods including adjacency lists and matrices",
            "Master Depth-First Search (DFS) and Breadth-First Search (BFS) algorithms",
            "Analyze pathfinding strategies and shortest path algorithms",
            "Compare algorithm efficiency and choose appropriate traversal methods",
            "Apply graph traversal to solve connectivity and reachability problems"
        ],
        topics: [
            "Graph representation: adjacency lists, adjacency matrices, and edge lists",
            "Depth-First Search (DFS) algorithm and recursive implementation",
            "Breadth-First Search (BFS) algorithm and queue-based approach",
            "Pathfinding algorithms and shortest path discovery",
            "Complexity analysis: time and space requirements",
            "Applications in network analysis, social graphs, and system design"
        ]
    },
    
    // Operating Systems Topics
    "FCFS Scheduling": {
        overview: "First-Come-First-Served (FCFS) is the simplest CPU scheduling algorithm, where processes are executed in the order they arrive. This simulation demonstrates how FCFS works, showing process execution timelines and helping you understand its fairness characteristics. You'll visualize waiting times, turnaround times, and see why FCFS, while simple, may not always be the most efficient choice for modern systems.",
        objectives: [
            "Understand the fundamental principles of FCFS scheduling and process queue management",
            "Analyze waiting time, turnaround time, and response time metrics",
            "Visualize Gantt charts and process execution timelines",
            "Compare FCFS performance with other scheduling algorithms",
            "Identify scenarios where FCFS is most appropriate"
        ],
        topics: [
            "Process queue management and arrival time handling",
            "CPU burst time calculation and execution order",
            "Waiting time and turnaround time computation",
            "Gantt chart representation and timeline visualization",
            "Convoy effect and its impact on system performance",
            "Comparison with preemptive scheduling algorithms"
        ]
    },
    "Round Robin": {
        overview: "Round Robin scheduling allocates CPU time in fixed time slices, ensuring fair execution for all processes. This simulation shows how time quantum affects system performance, demonstrating context switching overhead and helping you understand the balance between responsiveness and efficiency. Through interactive experimentation, you'll see how different quantum sizes impact waiting times and overall system throughput.",
        objectives: [
            "Understand time quantum concept and its role in preemptive scheduling",
            "Analyze how quantum size affects waiting time and response time",
            "Visualize context switching and its performance implications",
            "Compare Round Robin with other scheduling algorithms",
            "Optimize quantum size for different workload characteristics"
        ],
        topics: [
            "Time quantum selection and its impact on performance",
            "Preemptive scheduling and context switching mechanisms",
            "Ready queue management and circular execution",
            "Response time optimization for interactive systems",
            "Quantum size tuning for different process types",
            "Comparison with FCFS, SJF, and priority scheduling"
        ]
    },
    "Deadlock Detection": {
        overview: "Deadlocks occur when processes wait indefinitely for resources held by each other, creating a circular dependency. This simulation visualizes resource allocation graphs, helping you identify deadlock conditions and understand detection algorithms. You'll see how systems detect deadlocks before they cause complete system freeze, and learn strategies to prevent and resolve these critical situations.",
        objectives: [
            "Understand deadlock conditions: mutual exclusion, hold and wait, no preemption, and circular wait",
            "Master resource allocation graph construction and analysis",
            "Learn deadlock detection algorithms and their implementation",
            "Analyze system state to identify potential deadlock scenarios",
            "Compare detection strategies with prevention and avoidance techniques"
        ],
        topics: [
            "Deadlock characterization and necessary conditions",
            "Resource allocation graph representation",
            "Wait-for graph construction and cycle detection",
            "Banker's algorithm for deadlock avoidance",
            "Deadlock detection algorithms and system state analysis",
            "Recovery strategies: process termination and resource preemption"
        ]
    },
    "Memory Management": {
        overview: "Memory management ensures efficient allocation and deallocation of system memory. This simulation demonstrates paging, segmentation, and virtual memory concepts, showing how operating systems handle memory requests and optimize space utilization. You'll visualize page tables, understand address translation, and see how modern systems manage memory to support multiple processes simultaneously.",
        objectives: [
            "Understand memory allocation strategies: paging, segmentation, and hybrid approaches",
            "Master virtual memory concepts and address translation mechanisms",
            "Analyze page replacement algorithms and their performance characteristics",
            "Visualize memory fragmentation and understand compaction techniques",
            "Compare different memory management schemes for efficiency"
        ],
        topics: [
            "Paging mechanism and page table structure",
            "Segmentation and segment table management",
            "Virtual memory and demand paging",
            "Page replacement algorithms: FIFO, LRU, Optimal",
            "Memory fragmentation: internal and external",
            "Address translation and memory protection mechanisms"
        ]
    },
    
    // Logic Design Topics
    "K-Map Simplification": {
        overview: "Karnaugh maps provide a visual method for simplifying Boolean expressions, making complex logic design more intuitive. This simulation guides you through K-map construction, grouping techniques, and simplification rules. You'll see how to minimize logic circuits, reduce gate count, and optimize digital designs through interactive manipulation of K-map cells and prime implicant identification.",
        objectives: [
            "Master K-map construction for 2, 3, and 4-variable Boolean functions",
            "Understand grouping rules and prime implicant identification",
            "Learn to minimize Boolean expressions using K-map techniques",
            "Analyze don't-care conditions and their role in optimization",
            "Compare K-map simplification with algebraic methods"
        ],
        topics: [
            "K-map structure and cell arrangement for different variable counts",
            "Grouping rules: pairs, quads, and octets",
            "Prime implicant identification and essential prime implicants",
            "Don't-care conditions and their utilization",
            "Minimization techniques for sum-of-products and product-of-sums forms",
            "Practical applications in digital circuit design"
        ]
    },
    "Logic Gates": {
        overview: "Logic gates are the fundamental building blocks of digital circuits, performing basic Boolean operations. This simulation demonstrates how different gates process inputs to produce outputs, showing truth tables, timing diagrams, and gate combinations. Through interactive experimentation, you'll understand how complex circuits emerge from simple gate operations and see how gates combine to create functional digital systems.",
        objectives: [
            "Understand basic logic gates: AND, OR, NOT, XOR, NAND, NOR",
            "Master truth table construction and Boolean algebra relationships",
            "Analyze gate combinations and cascading logic circuits",
            "Visualize timing diagrams and signal propagation",
            "Apply gate-level design principles to create functional circuits"
        ],
        topics: [
            "Basic gate operations and truth tables",
            "Universal gates: NAND and NOR implementations",
            "Gate combinations and multi-level logic circuits",
            "Boolean algebra laws and simplification",
            "Timing characteristics and propagation delay",
            "Practical applications in combinational circuit design"
        ]
    },
    
    // DBMS Topics
    "Normalization": {
        overview: "Database normalization eliminates redundancy and ensures data integrity by organizing data into well-structured tables. This simulation demonstrates the normalization process from 1NF through BCNF, showing how to identify and resolve anomalies. You'll visualize functional dependencies, see how normalization reduces data duplication, and understand the trade-offs between normalization levels and query performance.",
        objectives: [
            "Understand database anomalies: insertion, deletion, and update anomalies",
            "Master functional dependency identification and analysis",
            "Learn normalization forms: 1NF, 2NF, 3NF, and BCNF",
            "Apply normalization techniques to design efficient database schemas",
            "Balance normalization with denormalization for performance optimization"
        ],
        topics: [
            "First Normal Form (1NF): atomic values and eliminating repeating groups",
            "Second Normal Form (2NF): removing partial dependencies",
            "Third Normal Form (3NF): eliminating transitive dependencies",
            "Boyce-Codd Normal Form (BCNF): stricter normalization rules",
            "Functional dependency analysis and decomposition",
            "Trade-offs between normalization and query performance"
        ]
    },
    "SQL Queries": {
        overview: "SQL enables powerful data manipulation through declarative queries that specify what data you want rather than how to retrieve it. This simulation demonstrates SELECT statements, JOIN operations, and subqueries, showing how complex data retrieval becomes straightforward with SQL. You'll visualize query execution, understand how joins combine data from multiple tables, and see how aggregate functions summarize information.",
        objectives: [
            "Master SELECT statement syntax and filtering with WHERE clauses",
            "Understand JOIN operations: INNER, LEFT, RIGHT, and FULL OUTER joins",
            "Learn subquery techniques for complex data retrieval",
            "Apply aggregate functions: COUNT, SUM, AVG, MAX, MIN with GROUP BY",
            "Optimize queries for performance and readability"
        ],
        topics: [
            "SELECT statement structure and column selection",
            "JOIN operations and relationship handling between tables",
            "Subqueries: correlated and non-correlated",
            "Aggregate functions and GROUP BY clauses",
            "HAVING clause for filtering grouped results",
            "Query optimization and index utilization"
        ]
    },
    
    // Computer Graphics Topics
    "Transformations": {
        overview: "Geometric transformations manipulate object positions, orientations, and sizes in 2D and 3D space. This simulation demonstrates translation, rotation, scaling, and composite transformations through interactive visualization. You'll see how transformation matrices work, understand coordinate system changes, and learn how these operations enable animation, modeling, and rendering in computer graphics applications.",
        objectives: [
            "Understand basic transformations: translation, rotation, and scaling",
            "Master transformation matrix representation and multiplication",
            "Learn composite transformations and order of operations",
            "Apply transformations in 2D and 3D coordinate systems",
            "Visualize transformation effects on geometric objects"
        ],
        topics: [
            "Translation: moving objects along coordinate axes",
            "Rotation: rotating objects around origin or arbitrary points",
            "Scaling: uniform and non-uniform size transformations",
            "Composite transformations and matrix concatenation",
            "Homogeneous coordinates and transformation matrices",
            "Applications in animation, modeling, and rendering pipelines"
        ]
    },
    
    // Default fallback content
    "default": {
        overview: "This interactive simulation provides hands-on experience with fundamental computer science concepts. Through visual demonstrations and practical exercises, you'll gain deeper understanding of how these concepts work in real-world applications. The simulation environment allows you to experiment, observe outcomes, and build intuition about complex systems.",
        objectives: [
            "Understand core concepts through interactive visualization",
            "Analyze performance characteristics and trade-offs",
            "Apply theoretical knowledge to practical scenarios",
            "Develop problem-solving skills through experimentation",
            "Compare different approaches and their effectiveness"
        ],
        topics: [
            "Fundamental concepts and principles",
            "Implementation techniques and best practices",
            "Performance analysis and optimization",
            "Real-world applications and use cases",
            "Common challenges and solutions",
            "Advanced topics and extensions"
        ]
    }
};

// Quiz database with questions for each simulation
const quizDatabase = {
    "Array Operations": [
        {
            question: "What is the time complexity of accessing an element in an array by index?",
            options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
            correct: 0
        },
        {
            question: "Which operation has the worst time complexity in a static array?",
            options: ["Access", "Search", "Insertion at end", "Deletion at beginning"],
            correct: 3
        },
        {
            question: "What happens when you try to access an array index that doesn't exist?",
            options: ["Returns null", "Returns undefined", "Causes an error", "Returns 0"],
            correct: 2
        },
        {
            question: "Dynamic arrays typically use which strategy for resizing?",
            options: ["Increment by 1", "Double the size", "Triple the size", "Add fixed amount"],
            correct: 1
        }
    ],
    "Linked List Traversal": [
        {
            question: "What is the time complexity of traversing a linked list?",
            options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
            correct: 1
        },
        {
            question: "Which pointer is essential for linked list traversal?",
            options: ["Head pointer", "Tail pointer", "Current pointer", "All of the above"],
            correct: 2
        },
        {
            question: "What happens if you lose the head pointer in a singly linked list?",
            options: ["List becomes circular", "List is lost", "List reverses", "Nothing happens"],
            correct: 1
        },
        {
            question: "Traversal in a linked list requires:",
            options: ["Random access", "Sequential access", "Index-based access", "Hash-based access"],
            correct: 1
        }
    ],
    "Stack Operations": [
        {
            question: "Which principle does a stack follow?",
            options: ["FIFO", "LIFO", "Priority", "Random"],
            correct: 1
        },
        {
            question: "What happens when you pop from an empty stack?",
            options: ["Returns null", "Returns 0", "Stack underflow", "Nothing"],
            correct: 2
        },
        {
            question: "The push operation in a stack has time complexity of:",
            options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
            correct: 0
        },
        {
            question: "Stacks are commonly used in:",
            options: ["Queue implementation", "Expression evaluation", "Sorting", "Searching"],
            correct: 1
        }
    ],
    "Binary Tree Traversal": [
        {
            question: "In which traversal do you visit the root first?",
            options: ["Inorder", "Preorder", "Postorder", "Level order"],
            correct: 1
        },
        {
            question: "Which traversal gives sorted output for BST?",
            options: ["Inorder", "Preorder", "Postorder", "None"],
            correct: 0
        },
        {
            question: "Time complexity of tree traversal is:",
            options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
            correct: 1
        },
        {
            question: "Postorder traversal is useful for:",
            options: ["Searching", "Deleting nodes", "Copying tree", "All of the above"],
            correct: 3
        }
    ],
    "Graph Traversal": [
        {
            question: "Which traversal uses a queue?",
            options: ["DFS", "BFS", "Both", "Neither"],
            correct: 1
        },
        {
            question: "DFS typically uses:",
            options: ["Queue", "Stack", "Heap", "Array"],
            correct: 1
        },
        {
            question: "Time complexity of graph traversal is:",
            options: ["O(V)", "O(E)", "O(V+E)", "O(V*E)"],
            correct: 2
        },
        {
            question: "BFS is best for finding:",
            options: ["Deepest node", "Shortest path", "Longest path", "All paths"],
            correct: 1
        }
    ],
    "FCFS Scheduling": [
        {
            question: "What does FCFS stand for?",
            options: ["First-Come-First-Served", "Fastest-CPU-First-Served", "First-Check-First-Served", "Fixed-Cycle-First-Served"],
            correct: 0
        },
        {
            question: "FCFS scheduling is:",
            options: ["Preemptive", "Non-preemptive", "Both", "Neither"],
            correct: 1
        },
        {
            question: "The main disadvantage of FCFS is:",
            options: ["High complexity", "Convoy effect", "Low throughput", "Memory overhead"],
            correct: 1
        },
        {
            question: "FCFS is most suitable for:",
            options: ["Interactive systems", "Batch systems", "Real-time systems", "All systems"],
            correct: 1
        }
    ],
    "Round Robin": [
        {
            question: "Round Robin scheduling is:",
            options: ["Non-preemptive", "Preemptive", "Both", "Neither"],
            correct: 1
        },
        {
            question: "What determines process execution in Round Robin?",
            options: ["Priority", "Time quantum", "Burst time", "Arrival time"],
            correct: 1
        },
        {
            question: "A very small time quantum leads to:",
            options: ["Better response time", "More context switches", "Lower throughput", "All of the above"],
            correct: 3
        },
        {
            question: "Round Robin is ideal for:",
            options: ["Batch processing", "Interactive systems", "Real-time systems", "All systems"],
            correct: 1
        }
    ],
    "K-Map Simplification": [
        {
            question: "K-map is used for:",
            options: ["Simplifying Boolean expressions", "Memory management", "Process scheduling", "Data sorting"],
            correct: 0
        },
        {
            question: "A 3-variable K-map has how many cells?",
            options: ["4", "8", "16", "32"],
            correct: 1
        },
        {
            question: "Adjacent cells in K-map differ by:",
            options: ["One bit", "Two bits", "Three bits", "Four bits"],
            correct: 0
        },
        {
            question: "The largest group in a 4-variable K-map can have:",
            options: ["2 cells", "4 cells", "8 cells", "16 cells"],
            correct: 3
        }
    ],
    "Normalization": [
        {
            question: "The main goal of normalization is to:",
            options: ["Increase storage", "Eliminate redundancy", "Speed up queries", "Reduce security"],
            correct: 1
        },
        {
            question: "First Normal Form requires:",
            options: ["No partial dependencies", "Atomic values", "No transitive dependencies", "All of the above"],
            correct: 1
        },
        {
            question: "Third Normal Form eliminates:",
            options: ["Partial dependencies", "Transitive dependencies", "Functional dependencies", "All dependencies"],
            correct: 1
        },
        {
            question: "Over-normalization can lead to:",
            options: ["Better performance", "More joins", "Less storage", "Faster queries"],
            correct: 1
        }
    ]
};

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    const { subject, topic, simulation } = getSimulationInfo();
    
    // Determine simulation name - use simulation parameter, topic, or default
    let simName = simulation || topic || 'Array Operations';
    
    // Set simulation title
    const simTitle = document.getElementById('simulationTitle');
    if (simTitle && simName) {
        simTitle.textContent = simName;
    } else if (simTitle) {
        simTitle.textContent = 'Simulation';
    }
    
    // Load content based on simulation name
    loadSimulationContent(simName);
    
    // Initialize sidebar navigation
    initSidebarNavigation();
    
    // Initialize quiz
    initQuiz(simName);
});

// Load simulation content dynamically
function loadSimulationContent(simName) {
    // Get content from database or use default
    const content = simulationContentDatabase[simName] || simulationContentDatabase['default'];
    
    // Overview
    const overviewText = document.getElementById('overviewText');
    if (overviewText) {
        overviewText.innerHTML = `<p class="intro-paragraph">${content.overview}</p>`;
    }
    
    // Objectives
    const objectiveText = document.getElementById('objectiveText');
    if (objectiveText) {
        const objectives = content.objectives || [];
        objectiveText.innerHTML = '<ul class="objective-items">' + 
            objectives.map(obj => `<li class="objective-item">${obj}</li>`).join('') + 
            '</ul>';
    }
    
    // Topics
    const topicsText = document.getElementById('topicsText');
    if (topicsText) {
        const topics = content.topics || [];
        topicsText.innerHTML = '<ul class="topics-items">' + 
            topics.map(topic => `<li class="topic-item">${topic}</li>`).join('') + 
            '</ul>';
    }
}

// Initialize sidebar navigation
function initSidebarNavigation() {
    const navItems = document.querySelectorAll('.sidebar-nav-item');
    const sections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetSection = item.getAttribute('data-section');
            
            // Remove active class from all items and sections
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked item and corresponding section
            item.classList.add('active');
            const targetElement = document.getElementById(`${targetSection}-section`);
            if (targetElement) {
                targetElement.classList.add('active');
            }
        });
    });
}

// Initialize quiz
function initQuiz(simName) {
    const quizContainer = document.getElementById('quizContainer');
    const quizData = quizDatabase[simName] || quizDatabase['Array Operations'];
    
    if (!quizContainer) return;
    
    let quizHTML = '<form id="quizForm" class="quiz-form">';
    
    quizData.forEach((q, index) => {
        quizHTML += `
            <div class="quiz-question">
                <h3 class="question-number">Question ${index + 1}</h3>
                <p class="question-text">${q.question}</p>
                <div class="question-options">
                    ${q.options.map((option, optIndex) => `
                        <label class="option-label">
                            <input type="radio" name="q${index}" value="${optIndex}" required>
                            <span class="option-text">${option}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
    });
    
    quizHTML += `
        <button type="submit" class="quiz-submit-btn">
            <span>Submit Quiz</span>
            <div class="button-glow"></div>
        </button>
    </form>`;
    
    quizContainer.innerHTML = quizHTML;
    
    // Handle quiz submission
    const quizForm = document.getElementById('quizForm');
    if (quizForm) {
        quizForm.addEventListener('submit', (e) => {
            e.preventDefault();
            calculateQuizScore(quizData);
        });
    }
}

// Calculate quiz score
function calculateQuizScore(quizData) {
    const form = document.getElementById('quizForm');
    const formData = new FormData(form);
    let score = 0;
    const total = quizData.length;
    
    quizData.forEach((q, index) => {
        const selected = parseInt(formData.get(`q${index}`));
        if (selected === q.correct) {
            score++;
        }
    });
    
    const percentage = Math.round((score / total) * 100);
    let feedback = '';
    
    if (percentage >= 90) {
        feedback = 'Excellent work! You have a strong grasp of the concepts.';
    } else if (percentage >= 70) {
        feedback = 'Good job! Review the topics you missed to strengthen your understanding.';
    } else if (percentage >= 50) {
        feedback = 'Not bad! Consider revisiting the simulation and study materials.';
    } else {
        feedback = 'Keep practicing! Review the concepts and try the simulation again.';
    }
    
    const resultsDiv = document.getElementById('quizResults');
    if (resultsDiv) {
        resultsDiv.style.display = 'block';
        resultsDiv.innerHTML = `
            <div class="quiz-score-card">
                <div class="score-icon">${percentage >= 70 ? '🎉' : '📚'}</div>
                <h3 class="score-title">Your Score</h3>
                <div class="score-value">${score}/${total}</div>
                <div class="score-percentage">${percentage}%</div>
                <p class="score-feedback">${feedback}</p>
                <button class="quiz-retry-btn" onclick="location.reload()">Try Again</button>
            </div>
        `;
        
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}
