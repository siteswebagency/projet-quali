// Fonction pour gérer l'affichage du bouton CTA des projets
document.addEventListener('DOMContentLoaded', function() {
    const projectsSection = document.getElementById('projets');
    const projectsCta = document.querySelector('.projects-cta');
    
    if (projectsSection && projectsCta) {
        // Vérifier si nous sommes sur mobile
        const isMobile = window.innerWidth < 768;
        
        if (!isMobile) {
            // Cacher le CTA par défaut sur desktop
            projectsCta.style.opacity = '0';
            projectsCta.style.transform = 'translateY(20px)';
            
            // Afficher au survol
            projectsSection.addEventListener('mouseenter', function() {
                projectsCta.style.opacity = '1';
                projectsCta.style.transform = 'translateY(0)';
            });
            
            // Cacher quand on quitte la section
            projectsSection.addEventListener('mouseleave', function() {
                projectsCta.style.opacity = '0';
                projectsCta.style.transform = 'translateY(20px)';
            });
        } else {
            // Sur mobile, toujours visible
            projectsCta.style.opacity = '1';
            projectsCta.style.transform = 'translateY(0)';
        }
        
        // Réinitialiser lors du redimensionnement
        window.addEventListener('resize', function() {
            const isNowMobile = window.innerWidth < 768;
            
            if (isNowMobile) {
                projectsCta.style.opacity = '1';
                projectsCta.style.transform = 'translateY(0)';
            } else if (!projectsSection.matches(':hover')) {
                projectsCta.style.opacity = '0';
                projectsCta.style.transform = 'translateY(20px)';
            }
        });
    }
});
