// ============================================
// PARTICLE ANIMATION SYSTEM (OPTIMIZED)
// ============================================
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d', { alpha: true });
        this.particles = [];
        // Reduced particle count for better performance
        this.particleCount = 30;
        this.animationFrame = null;
        this.isAnimating = false;
        
        // Optimize canvas rendering
        this.ctx.imageSmoothingEnabled = false;
        
        this.init();
        this.handleResize();
        this.startAnimation();
    }
    
    init() {
        this.resizeCanvas();
        this.createParticles();
    }
    
    resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.ctx.scale(dpr, dpr);
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
    }
    
    createParticles() {
        this.particles = [];
        const rect = this.canvas.getBoundingClientRect();
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * rect.width,
                y: Math.random() * rect.height,
                radius: Math.random() * 1.5 + 0.5,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.4 + 0.2,
                color: Math.random() > 0.5 ? 'rgba(0, 240, 255, ' : 'rgba(176, 38, 255, '
            });
        }
    }
    
    updateParticles() {
        const rect = this.canvas.getBoundingClientRect();
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = rect.width;
            if (particle.x > rect.width) particle.x = 0;
            if (particle.y < 0) particle.y = rect.height;
            if (particle.y > rect.height) particle.y = 0;
        });
    }
    
    drawParticles() {
        const rect = this.canvas.getBoundingClientRect();
        this.ctx.clearRect(0, 0, rect.width, rect.height);
        
        // Batch draw particles
        this.ctx.save();
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color + particle.opacity + ')';
            this.ctx.fill();
        });
        this.ctx.restore();
        
        // Optimized connection drawing - only check nearby particles
        this.drawConnectionsOptimized();
    }
    
    drawConnectionsOptimized() {
        const connectionDistance = 120;
        const connectionDistanceSq = connectionDistance * connectionDistance;
        
        // Use spatial optimization - only check nearby particles
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distanceSq = dx * dx + dy * dy;
                
                // Skip sqrt calculation for better performance
                if (distanceSq < connectionDistanceSq) {
                    const distance = Math.sqrt(distanceSq);
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * (1 - distance / connectionDistance)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        }
    }
    
    animate() {
        if (!this.isAnimating) return;
        
        this.updateParticles();
        this.drawParticles();
        this.animationFrame = requestAnimationFrame(() => this.animate());
    }
    
    startAnimation() {
        if (!this.isAnimating) {
            this.isAnimating = true;
            this.animate();
        }
    }
    
    stopAnimation() {
        this.isAnimating = false;
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }
    
    handleResize() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.resizeCanvas();
                this.createParticles();
            }, 250);
        });
    }
}

// ============================================
// NAVBAR FUNCTIONALITY
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const dropdownTrigger = document.querySelector('.dropdown-trigger');
    const megaDropdown = document.querySelector('.mega-dropdown');
    
    // Optimized dropdown positioning to prevent overflow
    function positionDropdown() {
        if (!megaDropdown || !dropdownTrigger) return;
        
        // Temporarily make dropdown visible for measurement
        const wasVisible = megaDropdown.style.visibility !== 'hidden';
        megaDropdown.style.visibility = 'hidden';
        megaDropdown.style.opacity = '1';
        megaDropdown.style.display = 'block';
        
        const triggerRect = dropdownTrigger.getBoundingClientRect();
        const dropdownRect = megaDropdown.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Calculate desired center position
        const triggerCenterX = triggerRect.left + (triggerRect.width / 2);
        const dropdownWidth = dropdownRect.width;
        let leftOffset = 0;
        
        // Check if dropdown would overflow left
        if (triggerCenterX - dropdownWidth / 2 < 20) {
            leftOffset = 20 - (triggerCenterX - dropdownWidth / 2);
        }
        
        // Check if dropdown would overflow right
        if (triggerCenterX + dropdownWidth / 2 + leftOffset > viewportWidth - 20) {
            leftOffset = (viewportWidth - 20) - (triggerCenterX + dropdownWidth / 2);
        }
        
        // Check vertical overflow
        const spaceBelow = viewportHeight - triggerRect.bottom;
        const spaceAbove = triggerRect.top;
        
        if (dropdownRect.height > spaceBelow && spaceAbove > spaceBelow) {
            megaDropdown.style.top = 'auto';
            megaDropdown.style.bottom = '100%';
            megaDropdown.style.marginTop = '0';
            megaDropdown.style.marginBottom = '1rem';
        } else {
            megaDropdown.style.top = '100%';
            megaDropdown.style.bottom = 'auto';
            megaDropdown.style.marginTop = '1rem';
            megaDropdown.style.marginBottom = '0';
        }
        
        // Apply horizontal offset
        megaDropdown.style.left = '50%';
        megaDropdown.style.transform = `translateX(calc(-50% + ${leftOffset}px)) translateY(0)`;
        
        // Restore visibility
        if (wasVisible) {
            megaDropdown.style.visibility = 'visible';
        }
    }
    
    // Dropdown hover management
    if (dropdownTrigger && megaDropdown) {
        let dropdownTimeout = null;
        let isDropdownOpen = false;
        
        function openDropdown() {
            if (dropdownTimeout) {
                clearTimeout(dropdownTimeout);
                dropdownTimeout = null;
            }
            
            if (!isDropdownOpen) {
                isDropdownOpen = true;
                megaDropdown.style.opacity = '1';
                megaDropdown.style.visibility = 'visible';
                // Position after a brief delay to ensure CSS transition has started
                requestAnimationFrame(() => {
                    setTimeout(positionDropdown, 50);
                });
            }
        }
        
        function closeDropdown() {
            if (dropdownTimeout) {
                clearTimeout(dropdownTimeout);
            }
            
            dropdownTimeout = setTimeout(() => {
                if (isDropdownOpen) {
                    isDropdownOpen = false;
                    megaDropdown.style.opacity = '0';
                    megaDropdown.style.visibility = 'hidden';
                }
            }, 150); // Small delay to allow moving mouse to dropdown
        }
        
        // Open on trigger hover
        dropdownTrigger.addEventListener('mouseenter', openDropdown);
        
        // Keep open when hovering over dropdown
        megaDropdown.addEventListener('mouseenter', () => {
            if (dropdownTimeout) {
                clearTimeout(dropdownTimeout);
                dropdownTimeout = null;
            }
            isDropdownOpen = true;
        });
        
        // Close when leaving trigger (but check if mouse is moving to dropdown)
        dropdownTrigger.addEventListener('mouseleave', (e) => {
            // Check if mouse is moving towards dropdown
            const relatedTarget = e.relatedTarget;
            if (relatedTarget && (relatedTarget === megaDropdown || megaDropdown.contains(relatedTarget))) {
                return; // Don't close if moving to dropdown
            }
            closeDropdown();
        });
        
        // Close when leaving dropdown
        megaDropdown.addEventListener('mouseleave', (e) => {
            // Check if mouse is moving back to trigger
            const relatedTarget = e.relatedTarget;
            if (relatedTarget && (relatedTarget === dropdownTrigger || dropdownTrigger.contains(relatedTarget))) {
                return; // Don't close if moving back to trigger
            }
            closeDropdown();
        });
        
        // Reposition on window resize when dropdown is visible
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (isDropdownOpen) {
                    positionDropdown();
                }
            }, 100);
        });
    }
    
    // Navbar scroll effect (throttled)
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) return;
        
        scrollTimeout = requestAnimationFrame(() => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.style.background = 'rgba(10, 10, 15, 0.95)';
                navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
            } else {
                navbar.style.background = 'rgba(10, 10, 15, 0.7)';
                navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
            }
            
            scrollTimeout = null;
        });
    });
    
    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Mobile dropdown toggle
    if (window.innerWidth <= 768 && dropdownTrigger) {
        dropdownTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            dropdownTrigger.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#contact') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    // Close mobile menu
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
});

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// Observe about section elements
document.addEventListener('DOMContentLoaded', () => {
    const aboutText = document.querySelector('.about-text');
    const aboutVisual = document.querySelector('.about-visual');
    
    if (aboutText) observer.observe(aboutText);
    if (aboutVisual) observer.observe(aboutVisual);
    
    // Observe feature cards and sim cards
    const cards = document.querySelectorAll('.feature-card, .sim-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        cardObserver.observe(card);
    });
});

// ============================================
// PARALLAX EFFECT FOR HERO (OPTIMIZED)
// ============================================
let parallaxTimeout;
window.addEventListener('scroll', () => {
    if (parallaxTimeout) return;
    
    parallaxTimeout = requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const ctaButton = document.querySelector('.cta-button');
        
        if (hero && heroContent && scrolled < window.innerHeight) {
            // Subtle parallax movement for the entire content
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            
            // Fade only the title and subtitle, not the button
            const fadeAmount = Math.min(scrolled / (window.innerHeight * 0.7), 0.3);
            
            if (heroTitle) {
                heroTitle.style.opacity = 1 - fadeAmount;
            }
            
            if (heroSubtitle) {
                heroSubtitle.style.opacity = 1 - fadeAmount;
            }
            
            // Keep button fully visible and stable - always at full opacity
            if (ctaButton) {
                ctaButton.style.opacity = '1';
                ctaButton.style.transform = 'translateY(0)';
                ctaButton.style.visibility = 'visible';
            }
        }
        
        parallaxTimeout = null;
    });
});

// ============================================
// INITIALIZE PARTICLE SYSTEM
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const particleSystem = new ParticleSystem(canvas);
        // Store reference for visibility change handler
        canvas.particleSystem = particleSystem;
    }
});

// ============================================
// ENHANCED HOVER EFFECTS (OPTIMIZED)
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Add tilt effect to simulation cards (throttled)
    const simCards = document.querySelectorAll('.sim-card');
    
    let tiltTimeout;
    simCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (tiltTimeout) return;
            
            tiltTimeout = requestAnimationFrame(() => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
                tiltTimeout = null;
            });
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
});

// Add pulse animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            opacity: 0.3;
        }
        50% {
            opacity: 0.6;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
    const canvas = document.getElementById('particleCanvas');
    if (canvas && canvas.particleSystem) {
        if (document.hidden) {
            canvas.particleSystem.stopAnimation();
        } else {
            canvas.particleSystem.startAnimation();
        }
    }
});

// Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01s');
}

// ============================================
// SUBJECTS DATA STRUCTURE
// ============================================
const subjectsData = {
    "DSA": {
        topics: {
            "Arrays & Linked Lists": ["Array Operations", "Linked List Traversal", "Dynamic Array Implementation", "Doubly Linked List"],
            "Stacks & Queues": ["Stack Operations", "Queue Implementation", "Priority Queue", "Circular Queue"],
            "Trees": ["Binary Tree Traversal", "BST Operations", "AVL Tree Rotation", "Heap Operations"],
            "Graphs": ["Graph Traversal", "Shortest Path", "Minimum Spanning Tree", "Topological Sort"],
            "Sorting & Searching": ["Quick Sort Visualization", "Merge Sort Animation", "Binary Search", "Hash Table Operations"]
        }
    },
    "Logic Design & Computer Organization": {
        topics: {
            "Logic Gates": ["AND/OR/NOT Gates", "XOR/NAND/NOR Gates", "Gate Combinations", "Truth Table Generator"],
            "K-Map Simplification": ["2-Variable K-Map", "3-Variable K-Map", "4-Variable K-Map", "Prime Implicants"],
            "Number Systems": ["Binary Conversion", "Hexadecimal Operations", "Two's Complement", "Floating Point"],
            "Memory Organization": ["Cache Memory", "RAM Structure", "Memory Hierarchy", "Virtual Memory"],
            "CPU Architecture": ["Instruction Cycle", "Pipeline Processing", "Register Operations", "ALU Functions"]
        }
    },
    "Discrete Mathematics": {
        topics: {
            "Sets": ["Set Operations", "Venn Diagrams", "Power Sets", "Cartesian Product"],
            "Relations & Functions": ["Relation Properties", "Function Composition", "Inverse Functions", "Equivalence Relations"],
            "Graph Theory": ["Graph Properties", "Path Finding", "Eulerian Circuits", "Hamiltonian Paths"],
            "Boolean Algebra": ["Boolean Operations", "De Morgan's Laws", "Karnaugh Maps", "Logic Simplification"],
            "Combinatorics": ["Permutations", "Combinations", "Pascal's Triangle", "Binomial Theorem"]
        }
    },
    "Operating Systems": {
        topics: {
            "CPU Scheduling": ["FCFS Scheduling", "Round Robin", "Priority Scheduling", "SJF Scheduling"],
            "Deadlocks": ["Deadlock Detection", "Banker's Algorithm", "Deadlock Prevention", "Resource Allocation"],
            "Memory Management": ["Paging", "Segmentation", "Page Replacement", "Memory Allocation"],
            "File Systems": ["File Operations", "Directory Structure", "Disk Scheduling", "File Allocation"],
            "Synchronization": ["Semaphores", "Mutex Locks", "Producer-Consumer", "Readers-Writers"]
        }
    },
    "DBMS": {
        topics: {
            "ER Diagrams": ["Entity Relationships", "Cardinality", "ER to Relational", "Weak Entities"],
            "Normalization": ["1NF Normalization", "2NF Normalization", "3NF Normalization", "BCNF Normalization"],
            "SQL Queries": ["SELECT Queries", "JOIN Operations", "Subqueries", "Aggregate Functions"],
            "Transactions": ["ACID Properties", "Transaction States", "Concurrency Control", "Isolation Levels"],
            "Indexing": ["B-Tree Index", "Hash Index", "Index Selection", "Query Optimization"]
        }
    },
    "Computer Graphics": {
        topics: {
            "Transformations": ["Translation", "Rotation", "Scaling", "Composite Transformations"],
            "Clipping": ["Line Clipping", "Polygon Clipping", "Cohen-Sutherland", "Liang-Barsky"],
            "Projections": ["Orthographic Projection", "Perspective Projection", "View Transformations", "3D to 2D"],
            "Curves & Surfaces": ["Bezier Curves", "B-Spline Curves", "Surface Rendering", "Parametric Curves"],
            "Shading Techniques": ["Flat Shading", "Gouraud Shading", "Phong Shading", "Texture Mapping"]
        }
    }
};

// ============================================
// ROUTING FUNCTIONS
// ============================================

// Get URL parameter
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Load subjects page
function loadSubjects() {
    const subjectsGrid = document.getElementById('subjectsGrid');
    if (!subjectsGrid) return;

    const subjects = Object.keys(subjectsData);
    
    subjects.forEach((subject, index) => {
        const subjectCard = document.createElement('div');
        subjectCard.className = 'subject-card';
        subjectCard.style.opacity = '0';
        subjectCard.style.transform = 'translateY(30px)';
        subjectCard.style.transition = `all 0.6s ease ${index * 0.1}s`;
        
        subjectCard.innerHTML = `
            <div class="subject-icon">📚</div>
            <h3 class="subject-title">${subject}</h3>
            <p class="subject-description">Explore interactive simulations for ${subject}</p>
            <div class="subject-glow"></div>
        `;
        
        subjectCard.addEventListener('click', () => {
            window.location.href = `topics.html?subject=${encodeURIComponent(subject)}`;
        });
        
        subjectsGrid.appendChild(subjectCard);
        
        // Animate in
        setTimeout(() => {
            subjectCard.style.opacity = '1';
            subjectCard.style.transform = 'translateY(0)';
        }, 100);
    });
}

// Load topics page
function loadTopics() {
    const subject = getURLParameter('subject');
    if (!subject || !subjectsData[subject]) {
        window.location.href = 'subjects.html';
        return;
    }

    const topicsGrid = document.getElementById('topicsGrid');
    const pageTitle = document.getElementById('pageTitle');
    const breadcrumbSubject = document.getElementById('breadcrumbSubject');
    
    if (pageTitle) {
        pageTitle.textContent = `${subject} → Select a Topic`;
    }
    
    if (breadcrumbSubject) {
        breadcrumbSubject.textContent = subject;
    }

    if (!topicsGrid) return;

    const topics = Object.keys(subjectsData[subject].topics);
    
    topics.forEach((topic, index) => {
        const topicCard = document.createElement('div');
        topicCard.className = 'topic-card';
        topicCard.style.opacity = '0';
        topicCard.style.transform = 'translateY(30px)';
        topicCard.style.transition = `all 0.6s ease ${index * 0.1}s`;
        
        topicCard.innerHTML = `
            <div class="topic-icon">🔬</div>
            <h3 class="topic-title">${topic}</h3>
            <p class="topic-description">${subjectsData[subject].topics[topic].length} simulations available</p>
            <div class="topic-glow"></div>
        `;
        
        topicCard.addEventListener('click', () => {
            window.location.href = `simulations.html?subject=${encodeURIComponent(subject)}&topic=${encodeURIComponent(topic)}`;
        });
        
        topicsGrid.appendChild(topicCard);
        
        // Animate in
        setTimeout(() => {
            topicCard.style.opacity = '1';
            topicCard.style.transform = 'translateY(0)';
        }, 100);
    });
}

// Load simulations page
function loadSimulations() {
    const subject = getURLParameter('subject');
    const topic = getURLParameter('topic');
    
    if (!subject || !topic || !subjectsData[subject] || !subjectsData[subject].topics[topic]) {
        window.location.href = 'subjects.html';
        return;
    }

    const simulationsGrid = document.getElementById('simulationsGrid');
    const pageTitle = document.getElementById('pageTitle');
    const breadcrumbSubject = document.getElementById('breadcrumbSubject');
    const breadcrumbTopic = document.getElementById('breadcrumbTopic');
    
    if (pageTitle) {
        pageTitle.textContent = `${subject} → ${topic} → Choose a Simulation`;
    }
    
    if (breadcrumbSubject) {
        breadcrumbSubject.textContent = subject;
    }
    
    if (breadcrumbTopic) {
        breadcrumbTopic.textContent = topic;
    }

    if (!simulationsGrid) return;

    const simulations = subjectsData[subject].topics[topic];
    
    simulations.forEach((simulation, index) => {
        const simCard = document.createElement('div');
        simCard.className = 'simulation-item-card';
        simCard.style.opacity = '0';
        simCard.style.transform = 'translateY(30px)';
        simCard.style.transition = `all 0.6s ease ${index * 0.1}s`;
        
        simCard.innerHTML = `
            <div class="simulation-item-icon">⚡</div>
            <div class="simulation-item-content">
                <h3 class="simulation-item-title">${simulation}</h3>
                <p class="simulation-item-description">Interactive simulation for ${simulation}</p>
            </div>
            <div class="simulation-item-arrow">→</div>
            <div class="simulation-item-glow"></div>
        `;
        
        simCard.addEventListener('click', () => {
            window.location.href = `simulation_details.html?subject=${encodeURIComponent(subject)}&topic=${encodeURIComponent(topic)}&simulation=${encodeURIComponent(simulation)}`;
        });
        
        simulationsGrid.appendChild(simCard);
        
        // Animate in
        setTimeout(() => {
            simCard.style.opacity = '1';
            simCard.style.transform = 'translateY(0)';
        }, 100);
    });
}

// ============================================
// SCROLL TO TOP BUTTON (LANDING PAGE ONLY)
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Only add scroll-to-top button on landing page (index.html)
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
        const scrollToTopBtn = document.getElementById('scrollToTop');
        
        if (scrollToTopBtn) {
            // Show/hide button based on scroll position
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    scrollToTopBtn.classList.add('visible');
                } else {
                    scrollToTopBtn.classList.remove('visible');
                }
            });
            
            // Smooth scroll to top on click
            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
});

