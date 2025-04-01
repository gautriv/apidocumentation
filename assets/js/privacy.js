document.addEventListener('DOMContentLoaded', function() {
    // Add IDs to section headings for TOC linking
    const privacyBlocks = document.querySelectorAll('.privacy-block');
    
    if (privacyBlocks.length > 0) {
        // Create Table of Contents
        const tocContainer = document.createElement('div');
        tocContainer.className = 'privacy-toc';
        
        const tocTitle = document.createElement('h2');
        tocTitle.className = 'toc-title';
        tocTitle.textContent = 'Table of Contents';
        tocContainer.appendChild(tocTitle);
        
        const tocList = document.createElement('ul');
        tocList.className = 'toc-list';
        
        // Process each privacy block
        privacyBlocks.forEach((block, index) => {
            const heading = block.querySelector('h2');
            
            if (heading) {
                // Create ID from heading text
                const headingId = 'privacy-section-' + heading.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                heading.id = headingId;
                
                // Create TOC item
                const tocItem = document.createElement('li');
                tocItem.className = 'toc-item';
                
                const tocLink = document.createElement('a');
                tocLink.className = 'toc-link';
                tocLink.href = '#' + headingId;
                tocLink.textContent = heading.textContent;
                
                tocItem.appendChild(tocLink);
                tocList.appendChild(tocItem);
                
                // Add scroll animation to TOC links
                tocLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetElement = document.getElementById(headingId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 100,
                            behavior: 'smooth'
                        });
                    }
                });
            }
        });
        
        tocContainer.appendChild(tocList);
        
        // Insert TOC after first privacy block (introduction)
        if (privacyBlocks.length > 0) {
            privacyBlocks[0].after(tocContainer);
        }
    }
    
    // Add scroll reveal animations
    const revealElements = document.querySelectorAll('.privacy-block');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        observer.observe(element);
        // Add initial hidden state
        element.classList.add('reveal-element');
    });
    
    // Add last updated date logic
    const lastUpdatedElement = document.querySelector('.text-muted');
    if (lastUpdatedElement) {
        // Extract date from text
        const dateText = lastUpdatedElement.textContent;
        const dateMatch = dateText.match(/[A-Z][a-z]+ \d+, \d{4}/);
        
        if (dateMatch) {
            const dateStr = dateMatch[0];
            const dateObj = new Date(dateStr);
            
            // Calculate how many days ago
            const today = new Date();
            const diffTime = Math.abs(today - dateObj);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays < 365) {
                lastUpdatedElement.innerHTML += ` <span class="update-badge">Recently Updated</span>`;
            }
        }
    }
});

// Add additional CSS for reveal animations
document.head.insertAdjacentHTML('beforeend', `
<style>
.reveal-element {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.revealed {
    opacity: 1;
    transform: translateY(0);
}

.update-badge {
    display: inline-block;
    background-color: #38a169;
    color: white;
    font-size: 0.7rem;
    padding: 3px 8px;
    border-radius: 20px;
    margin-left: 10px;
    font-weight: 500;
    vertical-align: middle;
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