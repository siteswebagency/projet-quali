// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Gestion de la vidéo d'introduction
    const introVideo = document.getElementById('intro-video');
    const introContainer = document.getElementById('intro-container');
    const videoSource = document.getElementById('video-source');
    const mainContent = document.getElementById('main-content');
    
    // Détecter si c'est un appareil mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    if (introVideo && videoSource) {
        // Choisir la vidéo appropriée selon la taille d'écran
        if (isMobile()) {
            videoSource.src = 'assets/video/intro mobile version.mp4';
        } else {
            videoSource.src = 'assets/video/intro.mp4';
        }
        
        // Recharger la vidéo avec la nouvelle source
        introVideo.load();
        
        // Fonction pour passer à l'affichage du contenu principal
        function showMainContent() {
            introContainer.style.display = 'none';
            mainContent.style.display = 'block';
        }
        
        // Réinitialiser la vidéo à chaque chargement de page
        introVideo.currentTime = 0;
        
        // Écouter l'événement de fin de la vidéo
        introVideo.addEventListener('ended', function() {
            showMainContent();
        });
        
        // Permettre de passer l'intro en cliquant dessus
        introContainer.addEventListener('click', function() {
            introVideo.pause();
            showMainContent();
        });
    }
    
    // Hero Video Slider
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots = document.querySelectorAll('.hero-dots .dot');
    let heroCurrentSlide = 0;
    let heroSlideInterval;
    
    // Function to show a specific hero slide
    function showHeroSlide(index) {
        // Remove active class from all slides
        heroSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        heroDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Add active class to the specified slide and dot
        heroSlides[index].classList.add('active');
        heroDots[index].classList.add('active');
        
        // Update current slide index
        heroCurrentSlide = index;
    }
    
    // Start automatic slideshow for hero
    function startHeroSlideshow() {
        heroSlideInterval = setInterval(() => {
            // Move to the next slide
            let nextSlide = (heroCurrentSlide + 1) % heroSlides.length;
            showHeroSlide(nextSlide);
        }, 5000); // Change slide every 5 seconds
    }
    
    // Initialize the hero slideshow
    if (heroSlides.length > 0) {
        // Set up click events on dots
        heroDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // Stop the automatic slideshow
                clearInterval(heroSlideInterval);
                
                // Show the clicked slide
                showHeroSlide(index);
                
                // Restart the slideshow
                startHeroSlideshow();
            });
        });
        
        // Start the slideshow
        startHeroSlideshow();
    }
    
    // Initialize Projects Swiper
    if (typeof initProjectsSwiper === 'function') {
        initProjectsSwiper();
    }
    
    // Navigation menu toggle for mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Transform hamburger to X
            const bars = menuToggle.querySelectorAll('.bar');
            if (menuToggle.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }
    
    // Mobile dropdown toggle
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                
                if (dropdownMenu) {
                    if (dropdown.classList.contains('active')) {
                        dropdownMenu.style.display = 'block';
                    } else {
                        dropdownMenu.style.display = 'none';
                    }
                }
            }
        });
    });
    
    // Dropdown menu items click handling
    const dropdownMenuItems = document.querySelectorAll('.dropdown-menu a');
    dropdownMenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Allow normal navigation for dropdown items
            const parentDropdown = item.closest('.dropdown');
            if (parentDropdown) {
                parentDropdown.classList.remove('active');
                const dropdownMenu = parentDropdown.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    dropdownMenu.style.display = 'none';
                }
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Video background
    const heroVideo = document.getElementById('hero-video');
    if (heroVideo) {
        // Ensure the video plays on mobile
        heroVideo.setAttribute('playsinline', '');
        
        // Add a parallax effect to the video
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            if (scrollPosition < window.innerHeight) {
                const translateY = scrollPosition * 0.3;
                heroVideo.style.transform = `translateX(-50%) translateY(calc(-50% + ${translateY}px))`;
            }
        });
    }
    
    // Scroll reveal animation
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    
    function checkScroll() {
        scrollRevealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.85) {
                element.classList.add('revealed');
            }
        });
    }
    
    // Check on initial load
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Partners slider navigation
    const partnersTrack = document.querySelector('.partners-slider-track');
    const prevPartnerBtn = document.querySelector('.slider-prev');
    const nextPartnerBtn = document.querySelector('.slider-next');
    const partnerLogos = document.querySelectorAll('.partner-logo');
    
    if (partnersTrack && prevPartnerBtn && nextPartnerBtn && partnerLogos.length > 0) {
        const logoWidth = 190; // Logo width + margin (160px + 30px)
        let currentPosition = 0;
        const visibleLogos = Math.floor(document.querySelector('.partners-slider-wrapper').clientWidth / logoWidth);
        const totalLogos = partnerLogos.length;
        let currentIndex = 0;
        
        // Fonction pour créer un défilement infini
        function setupInfiniteScroll() {
            // Cloner tous les logos et les ajouter à la fin pour l'effet infini
            const allLogos = partnersTrack.querySelectorAll('.partner-logo');
            allLogos.forEach(logo => {
                const clone = logo.cloneNode(true);
                partnersTrack.appendChild(clone);
            });
        }
        
        // Appeler la fonction pour configurer le défilement infini
        setupInfiniteScroll();
        
        // Function to update slider position
        function updateSliderPosition() {
            partnersTrack.style.transform = `translateX(-${currentPosition}px)`;
        }
        
        // Handle next button click
        nextPartnerBtn.addEventListener('click', () => {
            currentIndex++;
            currentPosition = currentIndex * logoWidth;
            partnersTrack.style.transition = 'transform 0.5s ease';
            updateSliderPosition();
            
            // Si on atteint la fin des logos originaux, préparer le retour au début sans saut
            if (currentIndex >= totalLogos) {
                setTimeout(() => {
                    // Supprimer la transition pour un retour instantané
                    partnersTrack.style.transition = 'none';
                    currentIndex = 0;
                    currentPosition = 0;
                    updateSliderPosition();
                    
                    // Réactiver la transition après un petit délai
                    setTimeout(() => {
                        partnersTrack.style.transition = 'transform 0.5s ease';
                    }, 50);
                }, 500); // Attendre que la transition soit terminée
            }
        });
        
        // Handle prev button click
        prevPartnerBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                currentPosition = currentIndex * logoWidth;
                partnersTrack.style.transition = 'transform 0.5s ease';
                updateSliderPosition();
            } else {
                // Pour permettre de reculer de la première position vers la fin
                partnersTrack.style.transition = 'none';
                currentIndex = totalLogos - 1;
                currentPosition = currentIndex * logoWidth;
                updateSliderPosition();
                
                setTimeout(() => {
                    partnersTrack.style.transition = 'transform 0.5s ease';
                }, 50);
            }
        });
        
        // Nous avons supprimé le défilement automatique ici
    }
    
    // Testimonial slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    function showSlide(n) {
        // Hide all slides
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the current slide and set the corresponding dot as active
        testimonialSlides[n].classList.add('active');
        dots[n].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide++;
        if (currentSlide >= testimonialSlides.length) {
            currentSlide = 0;
        }
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = testimonialSlides.length - 1;
        }
        showSlide(currentSlide);
    }
    
    // Event listeners for testimonial controls
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        // Add click event listeners to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
        
        // Auto slide every 5 seconds
        setInterval(nextSlide, 5000);
    }
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Skip this for dropdown toggles on mobile
            if (window.innerWidth <= 768 && link.parentElement.classList.contains('dropdown')) {
                return; // Do nothing for dropdown toggles on mobile
            }
            
            // For all other links, handle smooth scrolling
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    
                    const bars = menuToggle.querySelectorAll('.bar');
                    bars[0].style.transform = 'none';
                    bars[1].style.opacity = '1';
                    bars[2].style.transform = 'none';
                }
                
                // Scroll to the target
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - navbarHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Modal pour les projets
    const modal = document.getElementById('projectModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const closeModal = document.querySelector('.close-modal');
    const projectZoomBtns = document.querySelectorAll('.project-zoom-btn');
    
    // Tableau de données des projets (à personnaliser selon vos projets)
    const projectData = [
        {
            title: "Modernisation usine automobile",
            description: "Refonte complète de la chaîne de production pour un constructeur automobile majeur",
            image: "assets/images/produits/Machines de précision.jpg" // Utiliser une image réelle de projet quand disponible
        },
        {
            title: "Équipement agroalimentaire",
            description: "Installation de systèmes automatisés pour une entreprise leader du secteur agroalimentaire",
            image: "assets/images/produits/Systèmes automatisés.jpg" // Utiliser une image réelle de projet quand disponible
        },
        {
            title: "Centrale énergétique",
            description: "Fourniture et installation d'équipements pour une centrale énergétique nouvelle génération",
            image: "assets/images/produits/Équipements de sécurité.jpg" // Utiliser une image réelle de projet quand disponible
        }
    ];
    
    // Ajouter les événements de clic pour chaque bouton de zoom
    projectZoomBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            // Remplir le modal avec les données du projet
            const project = projectData[index];
            modalImage.src = project.image;
            modalTitle.textContent = project.title;
            modalDescription.textContent = project.description;
            
            // Afficher le modal
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Empêcher le défilement du body
        });
    });
    
    // Fermer le modal
    closeModal.addEventListener('click', function() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto'; // Réactiver le défilement du body
    });
    
    // Fermer le modal en cliquant en dehors de l'image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto'; // Réactiver le défilement du body
        }
    });
    
    // Fermer le modal avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto'; // Réactiver le défilement du body
        }
    });
});

// Fin du script