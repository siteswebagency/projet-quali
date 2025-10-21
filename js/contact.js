// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // FAQ Toggles
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Form Submission
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const closeSuccessBtn = document.querySelector('.close-success');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                successMessage.classList.add('show');
                
                // Reset form
                contactForm.reset();
            }, 1000);
        });
    }
    
    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener('click', function() {
            successMessage.classList.remove('show');
        });
    }
    
    // Scroll Reveal Animation
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealElement = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const options = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(revealElement, options);
    
    scrollRevealElements.forEach(element => {
        observer.observe(element);
        // Add CSS class for the initial state
        element.classList.add('scroll-reveal-item');
    });
});

// Add the following CSS to your contact.css file:
/*
.scroll-reveal-item {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
}

.scroll-reveal-item.revealed {
    opacity: 1;
    transform: translateY(0);
}
*/
