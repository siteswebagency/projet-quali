// JavaScript pour la page À propos - Animations et interactions

document.addEventListener('DOMContentLoaded', function() {
    
    // Animation des particules flottantes
    function createParticles() {
        const heroSection = document.querySelector('.hero-about');
        if (!heroSection) return;

        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        heroSection.appendChild(particlesContainer);

        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            particle.style.animationDelay = Math.random() * 2 + 's';
            
            particlesContainer.appendChild(particle);

            // Supprimer la particule après l'animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 6000);
        }

        // Créer des particules de manière continue
        setInterval(createParticle, 300);
    }

    // Animation de machine à écrire pour le titre
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Animation des compteurs avec observation
    function animateCounters() {
        const counters = document.querySelectorAll('[data-count]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                const suffix = target >= 1000 ? '+' : (target >= 20 ? '+' : '');
                counter.textContent = Math.floor(current) + suffix;
            }, 16);
        });
    }

    // Animation des barres de progression
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width') || '90';
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 300);
        });
    }

    // Effet de parallaxe sur le hero - DÉSACTIVÉ pour éviter les problèmes de z-index
    function parallaxEffect() {
        // Fonction désactivée pour éviter les problèmes de superposition
        return;
        /*
        const hero = document.querySelector('.hero-about');
        if (!hero) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            hero.style.transform = `translateY(${parallax}px)`;
        });
        */
    }

    // Animation au scroll
    function animateOnScroll() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    
                    // Animations spécifiques selon l'élément
                    if (entry.target.classList.contains('stats-container')) {
                        setTimeout(animateCounters, 300);
                    }
                    
                    if (entry.target.classList.contains('skill-bars')) {
                        setTimeout(animateSkillBars, 500);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observer tous les éléments avec animation
        const animatedElements = document.querySelectorAll(
            '.scroll-reveal, .stats-container, .service-category, .value-card'
        );
        
        animatedElements.forEach(el => observer.observe(el));
    }

    // Effet de hover sur les cartes de service
    function setupServiceCardEffects() {
        const serviceCards = document.querySelectorAll('.service-category');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.02)';
                
                // Effet sur l'icône
                const icon = this.querySelector('.category-icon');
                if (icon) {
                    icon.style.transform = 'rotate(360deg) scale(1.1)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                
                const icon = this.querySelector('.category-icon');
                if (icon) {
                    icon.style.transform = 'rotate(0deg) scale(1)';
                }
            });
        });
    }

    // Effet de rotation sur les icônes de valeurs
    function setupValueIconEffects() {
        const valueCards = document.querySelectorAll('.value-card');
        
        valueCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.value-icon');
                if (icon) {
                    icon.style.transform = 'rotateY(360deg) scale(1.1)';
                    icon.style.background = 'linear-gradient(135deg, var(--accent-color), var(--primary-color))';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.value-icon');
                if (icon) {
                    icon.style.transform = 'rotateY(0deg) scale(1)';
                    icon.style.background = 'linear-gradient(135deg, var(--primary-color), var(--accent-color))';
                }
            });
        });
    }

    // Animation de bounce pour les boutons CTA
    function setupCTAEffects() {
        const ctaButtons = document.querySelectorAll('.btn-cta');
        
        ctaButtons.forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.animation = 'bounce 0.6s ease-in-out';
            });
            
            btn.addEventListener('animationend', function() {
                this.style.animation = '';
            });
        });
    }

    // Keyframe pour l'animation bounce
    const bounceKeyframes = `
        @keyframes bounce {
            0%, 20%, 60%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            80% { transform: translateY(-5px); }
        }
    `;
    
    // Ajouter les keyframes au document
    const style = document.createElement('style');
    style.textContent = bounceKeyframes;
    document.head.appendChild(style);

    // Effet de typing sur le titre principal
    function initTypingEffect() {
        const titleElement = document.querySelector('.hero-about h1');
        if (titleElement) {
            const originalText = titleElement.textContent;
            setTimeout(() => {
                typeWriter(titleElement, originalText, 100);
            }, 1000);
        }
    }

    // Smooth scrolling amélioré
    function setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Initialisation de toutes les animations
    function init() {
        createParticles();
        animateOnScroll();
        setupServiceCardEffects();
        setupValueIconEffects();
        setupCTAEffects();
        initTypingEffect();
        setupSmoothScrolling();
        parallaxEffect();
    }

    // Lancer l'initialisation
    init();

    // Animation d'entrée de la page
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);

});
