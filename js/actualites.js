// Actualités JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Éléments du DOM
    const filterButtons = document.querySelectorAll('.filter-btn');
    const articleCards = document.querySelectorAll('.article-card');
    const searchInput = document.getElementById('searchInput');
    const paginationContainer = document.querySelector('.pagination'); 
    
    // Variables pour la pagination
    let currentPage = 1;
    const articlesPerPage = 3;
    let filteredArticles = Array.from(articleCards);
    
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
    
    // Filtrage par catégorie
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Mettre à jour le bouton actif
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            currentPage = 1;
            
            // Filtrer les articles
            filteredArticles = Array.from(articleCards).filter(card => {
                if (filter === 'all') return true;
                return card.getAttribute('data-category') === filter;
            });
            
            // Appliquer le filtre avec animation
            applyFilters();
            updatePagination();
        });
    });
    
    // Recherche
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        currentPage = 1;
        
        if (searchTerm === '') {
            // Si la recherche est vide, utiliser le filtre de catégorie actuel
            const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
            filteredArticles = Array.from(articleCards).filter(card => {
                if (activeFilter === 'all') return true;
                return card.getAttribute('data-category') === activeFilter;
            });
        } else {
            // Filtrer par terme de recherche
            filteredArticles = Array.from(articleCards).filter(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const content = card.querySelector('p').textContent.toLowerCase();
                const category = card.querySelector('.article-category').textContent.toLowerCase();
                
                return title.includes(searchTerm) || 
                       content.includes(searchTerm) || 
                       category.includes(searchTerm);
            });
        }
        
        applyFilters();
        updatePagination();
    });
    
    // L'ancienne logique pour les boutons de pagination est maintenant intégrée dans updatePagination
    // et ne doit plus être ici pour éviter les doublons ou les erreurs de référence.

    // Fonction pour appliquer les filtres
    function applyFilters() {
        // Cacher tous les articles d'abord
        articleCards.forEach(card => {
            card.classList.add('hidden');
            card.classList.remove('filtered');
        });
        
        // Calculer les articles à afficher pour la page courante
        const startIndex = (currentPage - 1) * articlesPerPage;
        const endIndex = startIndex + articlesPerPage;
        const articlesToShow = filteredArticles.slice(startIndex, endIndex);
        
        // Afficher les articles avec animation
        setTimeout(() => {
            articlesToShow.forEach((card, index) => {
                card.classList.remove('hidden');
                card.classList.add('filtered');
                // Réinitialiser le style d'animation-delay pour la réapparition
                card.style.animationDelay = `${index * 0.1}s`; 
            });
        }, 100);
    }
    
    // Fonction pour mettre à jour la pagination (CORRIGÉE)
    function updatePagination() {
        const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
        
        // 1. Vider la pagination existante (Ceci supprime les anciens boutons)
        paginationContainer.innerHTML = '';
        
        // Gérer la visibilité
        if (totalPages <= 1) {
            paginationContainer.style.display = 'none';
            return;
        } else {
            paginationContainer.style.display = 'flex'; // S'assurer qu'il est visible
        }

        // 2. AJOUTER LE BOUTON PRECEDENT (prev)
        if (currentPage > 1) {
            const prevButton = document.createElement('button');
            prevButton.className = 'pagination-btn prev';
            prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>'; // Icône Font Awesome
            
            prevButton.addEventListener('click', function() {
                currentPage--; // Retour à la page précédente
                applyFilters();
                updatePagination();
                
                document.querySelector('.actualites-grid').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
            
            paginationContainer.appendChild(prevButton);
        }
        
        // 3. Créer les boutons numérotés
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.className = `pagination-btn ${i === currentPage ? 'active' : ''}`;
            button.setAttribute('data-page', i);
            button.textContent = i;
            
            button.addEventListener('click', function() {
                currentPage = parseInt(this.getAttribute('data-page'));
                applyFilters();
                updatePagination();
                
                document.querySelector('.actualites-grid').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
            
            paginationContainer.appendChild(button);
        }
        
        // 4. Ajouter le bouton SUIVANT (next)
        if (currentPage < totalPages) {
            const nextButton = document.createElement('button');
            nextButton.className = 'pagination-btn next';
            nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
            
            nextButton.addEventListener('click', function() {
                currentPage++;
                applyFilters();
                updatePagination();
                
                document.querySelector('.actualites-grid').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
            
            paginationContainer.appendChild(nextButton);
        }
    }
    
    // Newsletter (inchangé)
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
    
    // Initialisation
    updatePagination();
    applyFilters(); // Assure que seuls les articles de la page 1 sont visibles au chargement
    
    // Animation des cartes au chargement
    setTimeout(() => {
        articleCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }, 100);
    
    // Smooth scrolling pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
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
    
    // Animation des éléments au hover
    articleCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Gestion du redimensionnement de la fenêtre
    window.addEventListener('resize', function() {
        // Réinitialiser les animations si nécessaire
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Optimisations pour mobile
            articleCards.forEach(card => {
                card.style.transition = 'all 0.2s ease-in-out';
            });
        } else {
            // Restaurer les animations complètes pour desktop
            articleCards.forEach(card => {
                card.style.transition = 'all 0.3s ease-in-out';
            });
        }
    });
});