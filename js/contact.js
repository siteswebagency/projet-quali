// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // ====== GESTION DU FORMULAIRE DE CONTACT ======
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const closeSuccessBtn = document.querySelector('.close-success');

    // Soumission du formulaire
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Récupération des données du formulaire
            const formData = new FormData(this);

            // Désactiver le bouton de soumission
            const submitBtn = this.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Envoi en cours...</span> <i class="fas fa-spinner fa-spin"></i>';

            // Envoi des données via AJAX
            fetch('contact.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.text())
                .then(data => {
                    // Vérifier si l'insertion a réussi
                    if (data.includes('Registration successfully')) {
                        // Afficher le message de succès avec animation
                        successMessage.classList.add('show');

                        // Réinitialiser le formulaire
                        contactForm.reset();

                        // Faire défiler vers le haut
                        window.scrollTo({ top: 0, behavior: 'smooth' });

                        // Masquer automatiquement après 4 secondes
                        setTimeout(() => {
                            successMessage.classList.remove('show');
                        }, 4000);
                    } else {
                        // Afficher un message d'erreur
                        alert('Erreur lors de l\'envoi du message. Veuillez réessayer.');
                    }
                })
                .catch(error => {
                    console.error('Erreur:', error);
                    alert('Une erreur s\'est produite. Veuillez réessayer.');
                })
                .finally(() => {
                    // Réactiver le bouton
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                });
        });
    }

    // Fermeture du message de succès avec le bouton X
    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener('click', function () {
            successMessage.classList.remove('show');
        });
    }

    // Fermer le message en cliquant à l'extérieur
    if (successMessage) {
        successMessage.addEventListener('click', function (e) {
            if (e.target === successMessage) {
                successMessage.classList.remove('show');
            }
        });
    }

    // ====== GESTION DES FAQ (ACCORDÉON) ======
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function () {
            // Fermer tous les autres items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle l'item actuel
            item.classList.toggle('active');
        });
    });

    // ====== VALIDATION EN TEMPS RÉEL ======
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function () {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = '';
            }
        });
    }

    // Validation du téléphone
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function () {
            // Permettre uniquement les chiffres, espaces, +, -, (, )
            this.value = this.value.replace(/[^0-9+\-() ]/g, '');
        });
    }

});

// ====== FONCTION DE VALIDATION D'EMAIL ======
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}