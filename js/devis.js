// Devis Page JavaScript

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
    
    // Service Selection and Total Calculation
    const serviceCheckboxes = document.querySelectorAll('input[name="services[]"]');
    const totalAmountElement = document.getElementById('totalAmount');
    
    // Calculate total when a service is selected or deselected
    function calculateTotal() {
        let total = 0;
        
        serviceCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const price = parseInt(checkbox.dataset.price);
                total += price;
            }
        });
        
        // Update the total display
        totalAmountElement.textContent = total.toLocaleString();
    }
    
    // Add event listeners to all service checkboxes
    serviceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateTotal);
    });
    
    // Form Submission
    const quoteForm = document.getElementById('quoteForm');
    const successMessage = document.getElementById('successMessage');
    const closeSuccessBtn = document.querySelector('.close-success');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate at least one service is selected
            let serviceSelected = false;
            serviceCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    serviceSelected = true;
                }
            });
            
            if (!serviceSelected) {
                alert('Veuillez sélectionner au moins un service');
                return;
            }
            
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                successMessage.classList.add('show');
                
                // Reset form
                quoteForm.reset();
                
                // Reset total
                calculateTotal();
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
