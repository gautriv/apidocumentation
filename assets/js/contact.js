document.addEventListener('DOMContentLoaded', function() {
    // Form handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Add form status elements
        const formStatusContainer = document.createElement('div');
        formStatusContainer.className = 'form-status-container';
        
        const formSuccess = document.createElement('div');
        formSuccess.className = 'form-success';
        formSuccess.innerHTML = '<i class="fas fa-check-circle"></i> Your message has been sent successfully. I\'ll get back to you soon!';
        
        const formError = document.createElement('div');
        formError.className = 'form-error';
        formError.innerHTML = '<i class="fas fa-exclamation-circle"></i> There was a problem sending your message. Please try again.';
        
        formStatusContainer.appendChild(formSuccess);
        formStatusContainer.appendChild(formError);
        
        contactForm.insertBefore(formStatusContainer, contactForm.firstChild);
        
        // Form validation and submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset form state
            formSuccess.style.display = 'none';
            formError.style.display = 'none';
            clearValidationErrors();
            
            // Get form fields
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            // Validate form
            let isValid = true;
            
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Name is required');
                isValid = false;
            }
            
            if (!emailInput.value.trim()) {
                showError(emailInput, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }
            
            if (!subjectInput.value.trim()) {
                showError(subjectInput, 'Subject is required');
                isValid = false;
            }
            
            if (!messageInput.value.trim()) {
                showError(messageInput, 'Message is required');
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission with loading state
                const submitButton = contactForm.querySelector('.submit-button');
                const buttonText = submitButton.querySelector('.button-text');
                const originalText = buttonText.textContent;
                
                submitButton.disabled = true;
                buttonText.textContent = 'Sending...';
                
                // Simulate API call
                setTimeout(() => {
                    // Success response
                    formSuccess.style.display = 'block';
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button
                    submitButton.disabled = false;
                    buttonText.textContent = originalText;
                    
                    // Scroll to success message
                    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 1500);
            }
        });
    }
    
    // Add scroll reveal animations
    const revealElements = document.querySelectorAll('.contact-info, .contact-form-wrapper');
    
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
    
    // Input focus effects
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        // Add focus animation
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('input-focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('input-focused');
            
            // Validate on blur
            if (this.required && !this.value.trim()) {
                this.classList.add('input-error');
            } else if (this.type === 'email' && !isValidEmail(this.value) && this.value.trim()) {
                this.classList.add('input-error');
            } else {
                this.classList.remove('input-error');
            }
        });
        
        // Remove error on input
        input.addEventListener('input', function() {
            this.classList.remove('input-error');
            const errorLabel = this.parentElement.querySelector('.error-message');
            if (errorLabel) {
                errorLabel.remove();
            }
        });
    });
    
    // Helper functions
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    function showError(input, message) {
        input.classList.add('input-error');
        
        // Remove existing error message if any
        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        input.parentElement.appendChild(errorElement);
        
        // Shake animation
        input.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            input.style.animation = '';
        }, 500);
    }
    
    function clearValidationErrors() {
        document.querySelectorAll('.input-error').forEach(input => {
            input.classList.remove('input-error');
        });
        
        document.querySelectorAll('.error-message').forEach(error => {
            error.remove();
        });
    }
});

// Add additional CSS for animations and form validation
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

.input-focused label {
    color: #3182ce;
}

.error-message {
    color: #e53e3e;
    font-size: 0.8rem;
    margin-top: 4px;
}

@media (prefers-reduced-motion: reduce) {
    .reveal-element {
        opacity: 1;
        transform: none;
        transition: none;
    }
    
    input.input-error {
        animation: none !important;
    }
}
</style>
`); 