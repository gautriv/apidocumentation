(function() {
  // Initialize EmailJS with your public key
  emailjs.init("YOUR_PUBLIC_KEY"); // You'll need to replace this with your actual EmailJS public key
  
  const contactForm = document.getElementById('contactForm');
  const submitButton = contactForm.querySelector('.submit-button');
  const buttonText = submitButton.querySelector('.button-text');
  const originalButtonText = buttonText.textContent;
  
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Change button state to loading
    submitButton.disabled = true;
    buttonText.textContent = 'Sending...';
    
    // Prepare the template parameters
    const templateParams = {
      from_name: document.getElementById('name').value,
      from_email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value,
      to_email: 'trivedi.gaurav30@gmail.com'
    };
    
    // Send the email using EmailJS
    emailjs.send('default_service', 'template_contact', templateParams)
      .then(function(response) {
        // Show success message
        showNotification('Message sent successfully!', 'success');
        contactForm.reset();
      })
      .catch(function(error) {
        // Show error message
        showNotification('Failed to send message. Please try again.', 'error');
      })
      .finally(function() {
        // Reset button state
        submitButton.disabled = false;
        buttonText.textContent = originalButtonText;
      });
  });
  
  // Notification helper function
  function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }
})(); 