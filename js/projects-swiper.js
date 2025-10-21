// Initialize Projects Swiper
function initProjectsSwiper() {
    const projectsSwiper = new Swiper('.projects-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        grabCursor: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
        },
        on: {
            init: function() {
                setTimeout(() => {
                    document.querySelectorAll('.swiper-slide').forEach(slide => {
                        slide.style.opacity = 1;
                    });
                    equalizeProjectCardHeights();
                }, 100);
            },
            resize: function() {
                equalizeProjectCardHeights();
            }
        }
    });
    
    // Function to equalize heights of project cards
    function equalizeProjectCardHeights() {
        // Reset heights first
        document.querySelectorAll('.project-card').forEach(card => {
            card.style.height = 'auto';
        });
        
        document.querySelectorAll('.project-info').forEach(info => {
            info.style.height = 'auto';
        });
        
        document.querySelectorAll('.project-content').forEach(content => {
            content.style.height = 'auto';
        });
        
        document.querySelectorAll('.project-description').forEach(desc => {
            desc.style.height = 'auto';
        });
        
        // Wait for reflow
        setTimeout(() => {
            // Get max heights for each category
            let maxCardHeight = 0;
            let maxInfoHeight = 0;
            let maxContentHeight = 0;
            let maxDescHeight = 0;
            
            document.querySelectorAll('.project-card').forEach(card => {
                maxCardHeight = Math.max(maxCardHeight, card.offsetHeight);
            });
            
            document.querySelectorAll('.project-info').forEach(info => {
                maxInfoHeight = Math.max(maxInfoHeight, info.offsetHeight);
            });
            
            document.querySelectorAll('.project-content').forEach(content => {
                maxContentHeight = Math.max(maxContentHeight, content.offsetHeight);
            });
            
            document.querySelectorAll('.project-description').forEach(desc => {
                maxDescHeight = Math.max(maxDescHeight, desc.offsetHeight);
            });
            
            // Apply max heights
            document.querySelectorAll('.project-card').forEach(card => {
                card.style.height = maxCardHeight + 'px';
            });
            
            document.querySelectorAll('.project-info').forEach(info => {
                info.style.height = maxInfoHeight + 'px';
            });
            
            document.querySelectorAll('.project-content').forEach(content => {
                content.style.height = maxContentHeight + 'px';
            });
            
            document.querySelectorAll('.project-description').forEach(desc => {
                desc.style.height = maxDescHeight + 'px';
            });
        }, 100);
    }

    // Handling project zoom functionality
    const projectZoomBtns = document.querySelectorAll('.project-zoom-btn');
    const projectModal = document.getElementById('projectModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalCategory = document.getElementById('modalCategory');
    const closeModal = document.querySelector('.close-modal');

    // Project descriptions for modal
    const projectDetails = {
        1: {
            title: "Usine automobile Lyon",
            description: "Modernisation complète de la chaîne de production automobile avec l'installation de robots de soudure, systèmes de convoyage avancés et intégration d'un système de contrôle qualité par vision artificielle. Ce projet a permis d'augmenter la productivité de 35% tout en réduisant les défauts de fabrication de 60%.",
            category: "Industrie Automobile"
        },
        2: {
            title: "Agrotech Nantes",
            description: "Installation de systèmes automatisés de traitement pour une usine agroalimentaire comprenant des lignes de tri optique, des emballeuses haute cadence et un système de traçabilité intégré. Cette modernisation a permis de doubler la capacité de production tout en respectant les normes HACCP les plus strictes.",
            category: "Agroalimentaire"
        },
        3: {
            title: "EnergiePro Marseille",
            description: "Équipement d'une centrale de production énergétique avec des systèmes de contrôle avancés, des tableaux électriques intelligents et des solutions de monitoring à distance. Ce projet a permis d'optimiser la consommation d'énergie et de réduire les coûts opérationnels de 25%.",
            category: "Énergie"
        },
        4: {
            title: "PharmaTech Paris",
            description: "Conception et installation d'un laboratoire de production pharmaceutique comprenant des salles blanches, des systèmes de filtration HEPA et des équipements de dosage de haute précision. L'ensemble respecte les normes GMP et permet une traçabilité complète du processus de fabrication.",
            category: "Pharmaceutique"
        },
        5: {
            title: "AéroSystems Toulouse",
            description: "Fourniture d'équipements de test pour l'industrie aéronautique, incluant des bancs d'essai pour composants hydrauliques, des chambres climatiques et des systèmes de simulation de contraintes mécaniques. Ces équipements ont permis de réduire le temps de développement de nouveaux composants de 40%.",
            category: "Aéronautique"
        },
        6: {
            title: "LogiCenter Lille",
            description: "Conception et mise en œuvre d'un centre logistique entièrement automatisé avec des systèmes de stockage vertical, des convoyeurs intelligents et des robots de préparation de commandes. Cette solution a permis d'optimiser l'espace de stockage de 60% et de réduire les erreurs de préparation à moins de 0,1%.",
            category: "Logistique"
        }
    };

    // Open modal with project details
    projectZoomBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projectDetails[projectId];
            
            if (project) {
                modalTitle.textContent = project.title;
                modalDescription.textContent = project.description;
                modalCategory.textContent = project.category;
                
                // Utiliser les mêmes images que dans les cartes du projet
                modalImage.src = `assets/images/Projets/prj${projectId}.webp`;
                modalImage.alt = project.title;
                
                projectModal.style.display = 'flex';
                setTimeout(() => {
                    projectModal.classList.add('show');
                }, 10);
            }
        });
    });

    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            projectModal.classList.remove('show');
            setTimeout(() => {
                projectModal.style.display = 'none';
            }, 300);
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === projectModal) {
            projectModal.classList.remove('show');
            setTimeout(() => {
                projectModal.style.display = 'none';
            }, 300);
        }
    });
    
    // Empêcher la fermeture du modal lors du clic sur son contenu
    document.querySelector('.modal-content').addEventListener('click', function(e) {
        e.stopPropagation();
    });
}
