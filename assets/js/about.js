document.addEventListener('DOMContentLoaded', function() {
    // Add scroll reveal animations
    const revealElements = document.querySelectorAll('.about-story, .feature-card, .audience-section, .bio-section, .cta-section');
    
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
        // Add initial hidden state in CSS
        element.classList.add('reveal-element');
    });
    
    // Add hover interactions for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        const icon = card.querySelector('.feature-icon');
        
        card.addEventListener('mouseenter', () => {
            icon.style.transform = 'rotate(0deg) scale(1.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            icon.style.transform = 'rotate(-5deg) scale(1)';
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add counter animation for experience numbers
    const experienceCards = document.querySelectorAll('.experience-card');
    let animated = false;
    
    function animateNumbers() {
        if (animated) return;
        
        experienceCards.forEach(card => {
            const numberElement = card.querySelector('.experience-number');
            const targetNumber = parseInt(numberElement.textContent, 10);
            let currentNumber = 0;
            const duration = 2000; // 2 seconds
            const interval = 50; // Update every 50ms
            const steps = duration / interval;
            const increment = targetNumber / steps;
            
            const counter = setInterval(() => {
                currentNumber += increment;
                
                if (currentNumber >= targetNumber) {
                    numberElement.textContent = targetNumber + '+';
                    clearInterval(counter);
                } else {
                    numberElement.textContent = Math.floor(currentNumber) + '+';
                }
            }, interval);
        });
        
        animated = true;
    }
    
    // Observer for counting animation
    const bioSection = document.querySelector('.bio-section');
    if (bioSection) {
        const bioObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateNumbers();
                bioObserver.unobserve(bioSection);
            }
        }, {
            threshold: 0.5
        });
        
        bioObserver.observe(bioSection);
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

@media (prefers-reduced-motion: reduce) {
    .reveal-element {
        opacity: 1;
        transform: none;
        transition: none;
    }
}
</style>
`); 