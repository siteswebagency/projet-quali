// Article JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Animation au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    // Observer tous les éléments scroll-reveal
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
    
    // Table des matières interactive
    const tocLinks = document.querySelectorAll('.table-of-contents a');
    const sections = document.querySelectorAll('.content-section');
    
    // Fonction pour mettre à jour le lien actif dans la table des matières
    function updateActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const scrollTop = window.pageYOffset;
            
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    // Smooth scroll pour les liens de la table des matières
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 120;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Écouter le scroll pour la table des matières
    window.addEventListener('scroll', updateActiveLink);
    
    // Partage social
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('data-platform');
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.querySelector('.article-title').textContent);
            const text = encodeURIComponent(document.querySelector('.article-subtitle').textContent);
            
            let shareUrl = '';
            
            switch(platform) {
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'email':
                    shareUrl = `mailto:?subject=${title}&body=${text}%0A%0A${url}`;
                    break;
            }
            
            if (shareUrl && platform !== 'email') {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            } else if (platform === 'email') {
                window.location.href = shareUrl;
            }
            
            // Animation de feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('newsletterEmail').value;
            
            if (email) {
                // Animation de succès
                const button = this.querySelector('.btn-primary');
                const originalText = button.textContent;
                
                button.textContent = 'Inscrit !';
                button.style.background = '#28a745';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                    document.getElementById('newsletterEmail').value = '';
                }, 2000);
            }
        });
    }
    
    // Animation des éléments tech-feature au hover
    const techFeatures = document.querySelectorAll('.tech-feature');
    techFeatures.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Animation des éléments advantage-item au hover
    const advantageItems = document.querySelectorAll('.advantage-item');
    advantageItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const number = this.querySelector('.advantage-number');
            number.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            const number = this.querySelector('.advantage-number');
            number.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Effet de parallaxe subtil pour l'image hero - DÉSACTIVÉ pour éviter les problèmes de positionnement
    // const heroImage = document.querySelector('.hero-image');
    // if (heroImage) {
    //     window.addEventListener('scroll', function() {
    //         const scrolled = window.pageYOffset;
    //         const parallax = scrolled * 0.3;
    //         heroImage.style.transform = `translateY(${parallax}px)`;
    //     });
    // }
    
    // Animation du header au scroll
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scroll vers le bas
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scroll vers le haut
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Effet de typing pour le titre (animation subtile)
    const articleTitle = document.querySelector('.article-title');
    if (articleTitle) {
        const text = articleTitle.textContent;
        articleTitle.textContent = '';
        
        let i = 0;
        const typingEffect = setInterval(() => {
            if (i < text.length) {
                articleTitle.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typingEffect);
            }
        }, 50);
    }
    
    // Lazy loading pour les images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Gestion du temps de lecture
    function calculateReadingTime() {
        const articleText = document.querySelector('.article-main').textContent;
        const wordsPerMinute = 200; // Vitesse de lecture moyenne
        const wordCount = articleText.trim().split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / wordsPerMinute);
        
        const readTimeElement = document.querySelector('.read-time span');
        if (readTimeElement) {
            readTimeElement.textContent = `${readingTime} min de lecture`;
        }
    }
    
    calculateReadingTime();
    
    // Animation de progression de lecture
    function createReadingProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 80px;
            left: 0;
            width: 100%;
            height: 3px;
            background: rgba(62, 107, 219, 0.2);
            z-index: 999;
            transform-origin: left;
            transform: scaleX(0);
            transition: transform 0.1s ease-out;
        `;
        
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = scrollTop / docHeight;
            
            progressBar.style.transform = `scaleX(${scrollPercent})`;
        });
    }
    
    createReadingProgress();
    
    // Gestion des liens externes
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        if (!link.href.includes(window.location.hostname)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            
            // Ajouter une icône pour indiquer les liens externes
            const icon = document.createElement('i');
            icon.className = 'fas fa-external-link-alt';
            icon.style.marginLeft = '5px';
            icon.style.fontSize = '0.8em';
            link.appendChild(icon);
        }
    });
    
    // Amélioration de l'accessibilité
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    
    // Navigation au clavier
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('user-is-tabbing');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('user-is-tabbing');
    });
    
    // Gestion du redimensionnement
    window.addEventListener('resize', function() {
        // Réajuster les éléments si nécessaire
        updateActiveLink();
    });
    
    // Animation d'entrée pour les éléments
    const animatedElements = document.querySelectorAll('.tech-feature, .advantage-item, .related-article');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100 + 200);
    });
    
    // Effet de survol pour les boutons CTA
    const ctaButtons = document.querySelectorAll('.cta-buttons .btn-primary, .cta-buttons .btn-secondary');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});
