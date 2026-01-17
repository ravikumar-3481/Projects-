/**
 * About Section Component
 * Usage: Create a div with id "about-section-container" and include this script.
 */

const AboutComponent = {
    render: function(targetId) {
        const target = document.getElementById(targetId);
        if (!target) return;

        // Inject HTML Structure
        target.innerHTML = `
            <section id="about-section" class="max-w-7xl mx-auto opacity-0 translate-y-8 transition-all duration-1000 py-20 px-4 sm:px-10">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <!-- Left Side: Image -->
                    <div class="lg:col-span-5 flex justify-center lg:justify-start">
                        <div class="relative about-image-container w-full max-w-sm">
                            <img id="profile-img" src="" alt="Profile Image" class="rounded-2xl w-full aspect-square object-cover shadow-2xl">
                            <div class="absolute -bottom-6 -right-6 bg-blue-600 p-4 rounded-2xl hidden md:block">
                                <i data-lucide="code-2" class="text-white w-8 h-8"></i>
                            </div>
                        </div>
                    </div>

                    <!-- Right Side: Content -->
                    <div class="lg:col-span-7">
                        <h2 class="text-blue-500 font-bold tracking-widest uppercase text-sm mb-2">Discover My Story</h2>
                        <h1 class="text-4xl md:text-5xl font-extrabold mb-6">About <span id="user-name" class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Me</span></h1>
                        
                        <p id="user-desc" class="text-slate-400 text-lg leading-relaxed mb-8"></p>

                        <!-- Skills -->
                        <div class="mb-10">
                            <h3 class="text-white font-semibold mb-4 flex items-center gap-2">
                                <i data-lucide="zap" class="w-5 h-5 text-yellow-500"></i> Major Skills
                            </h3>
                            <div id="skills-container" class="flex flex-wrap gap-3"></div>
                        </div>

                        <!-- Stats Grid -->
                        <div id="stats-area" class="grid grid-cols-3 gap-4 mb-10">
                            <div class="stat-card p-4 rounded-2xl text-center">
                                <span class="block text-3xl font-bold text-white counter" data-target="0" id="stat-projects">0</span>
                                <span class="text-xs text-slate-500 uppercase tracking-tighter">Projects Done</span>
                            </div>
                            <div class="stat-card p-4 rounded-2xl text-center">
                                <span class="block text-3xl font-bold text-white counter" data-target="0" id="stat-leetcode">0</span>
                                <span class="text-xs text-slate-500 uppercase tracking-tighter">LeetCode Solved</span>
                            </div>
                            <div class="stat-card p-4 rounded-2xl text-center">
                                <span class="block text-3xl font-bold text-white counter" data-target="0" id="stat-exp">0</span>
                                <span class="text-xs text-slate-500 uppercase tracking-tighter">Years Exp.</span>
                            </div>
                        </div>

                        <!-- Buttons -->
                        <div class="flex flex-wrap gap-4">
                            <a id="hire-btn" href="#" class="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all flex items-center gap-2">
                                Hire Me <i data-lucide="send" class="w-4 h-4"></i>
                            </a>
                            <a id="resume-btn" href="#" class="px-8 py-3 bg-transparent border border-slate-700 hover:bg-slate-800 text-white rounded-xl font-bold transition-all flex items-center gap-2">
                                Show Resume <i data-lucide="file-text" class="w-4 h-4"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        `;

        this.init();
    },

    init: async function() {
        try {
            const response = await fetch('about.json');
            const data = await response.json();

            // Populate UI elements
            document.getElementById('profile-img').src = data.photo;
            document.getElementById('user-name').innerText = data.name;
            document.getElementById('user-desc').innerText = data.description;
            document.getElementById('hire-btn').href = data.hireMeLink;
            document.getElementById('resume-btn').href = data.resumeLink;

            // Set data targets for counters
            document.getElementById('stat-projects').setAttribute('data-target', data.stats.projects);
            document.getElementById('stat-leetcode').setAttribute('data-target', data.stats.leetcodeSolved);
            document.getElementById('stat-exp').setAttribute('data-target', data.stats.yearsExperience);

            // Populate Skills
            const skillsContainer = document.getElementById('skills-container');
            data.majorSkills.forEach(skill => {
                const span = document.createElement('span');
                span.className = "px-4 py-2 bg-slate-800/50 border border-slate-700 text-slate-300 rounded-lg text-sm font-medium hover:border-blue-500/50 transition-colors";
                span.innerText = skill;
                skillsContainer.appendChild(span);
            });

            // Trigger Animation & Observation
            setTimeout(() => {
                document.getElementById('about-section').classList.add('reveal');
            }, 100);

            this.setupObserver();
            lucide.createIcons();

        } catch (error) {
            console.error("Error loading About Component data:", error);
        }
    },

    setupObserver: function() {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                this.animateCounters();
                observer.unobserve(entries[0].target);
            }
        }, { threshold: 0.5 });

        observer.observe(document.getElementById('stats-area'));
    },

    animateCounters: function() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const speed = 100;
            
            const updateCount = () => {
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target + (counter.id === 'stat-exp' ? '+' : '');
                }
            };
            updateCount();
        });
    }
};

// Initialize the component when script loads
document.addEventListener('DOMContentLoaded', () => {
    AboutComponent.render('about-section-container');
});

