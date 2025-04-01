document.addEventListener('DOMContentLoaded', function() {
    // Initialize animation for resource cards
    const revealElements = document.querySelectorAll('.resource-card, .newsletter-section, .cta-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        observer.observe(element);
        // Add initial hidden state
        element.classList.add('reveal-element');
    });
    
    // Category filtering functionality
    const categoryFilters = document.querySelectorAll('.category-filter');
    const resourceCards = document.querySelectorAll('.resource-card');
    
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Remove active class from all filters
            categoryFilters.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked filter
            filter.classList.add('active');
            
            const category = filter.getAttribute('data-category');
            
            // Show all or filter by category
            resourceCards.forEach(card => {
                if (category === 'all') {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    const cardCategory = card.querySelector('.resource-category').classList[1];
                    
                    if (cardCategory === category) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('resource-search');
    
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            resourceCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    }
    
    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (isValidEmail(email)) {
                // Success message
                const formParent = newsletterForm.parentElement;
                const thankYouMessage = document.createElement('div');
                thankYouMessage.className = 'newsletter-success';
                thankYouMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <h3>Thank you for subscribing!</h3>
                    <p>You'll be receiving API documentation resources and tips in your inbox soon.</p>
                `;
                
                // Animate out the form
                newsletterForm.style.opacity = '0';
                newsletterForm.style.transform = 'translateY(20px)';
                
                // Replace with thank you message
                setTimeout(() => {
                    newsletterForm.style.display = 'none';
                    formParent.appendChild(thankYouMessage);
                    
                    // Animate in the thank you message
                    setTimeout(() => {
                        thankYouMessage.style.opacity = '1';
                        thankYouMessage.style.transform = 'translateY(0)';
                    }, 50);
                }, 300);
                
                // Here you would typically send the email to your server
                console.log("Email submitted:", email);
            } else {
                // Show error state
                emailInput.classList.add('error');
                emailInput.focus();
                
                // Remove error state after a delay
                setTimeout(() => {
                    emailInput.classList.remove('error');
                }, 2000);
            }
        });
    }
    
    // Email validation
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});

// Add additional CSS for reveal animations
document.head.insertAdjacentHTML('beforeend', `
<style>
.reveal-element {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
}

.revealed {
    opacity: 1;
    transform: translateY(0);
}

.newsletter-success {
    text-align: center;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
}

.newsletter-success i {
    font-size: 3rem;
    color: #059669;
    margin-bottom: 20px;
}

.newsletter-success h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #1F2937;
}

.newsletter-success p {
    color: #4B5563;
    font-size: 1.05rem;
}

input.error {
    border-color: #EF4444 !important;
    background-color: #FEF2F2 !important;
    animation: shake 0.5s ease-in-out;
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-5px); }
    40%, 80% { transform: translateX(5px); }
}

@media (prefers-reduced-motion: reduce) {
    .reveal-element {
        opacity: 1;
        transform: none;
        transition: none;
    }
    
    input.error {
        animation: none;
    }
}
</style>
`); 