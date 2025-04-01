document.addEventListener('DOMContentLoaded', function() {
  // Get references to the buttons and content areas
  const upiButton = document.querySelector('[data-target="#TypeOne"]');
  const coffeeButton = document.querySelector('[data-target="#TypeTwo"]');
  const upiContent = document.getElementById('TypeOne');
  const coffeeContent = document.getElementById('TypeTwo');
  
  // Function to handle button click
  function handleCollapseButton(button, targetContent, otherContent) {
    if (button) {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Toggle the target content
        if (targetContent) {
          // If other content is shown, hide it
          if (otherContent && otherContent.classList.contains('show')) {
            otherContent.classList.remove('show');
          }
          
          // Toggle this content
          targetContent.classList.toggle('show');
        }
      });
    }
  }
  
  // Add click handlers
  handleCollapseButton(upiButton, upiContent, coffeeContent);
  handleCollapseButton(coffeeButton, coffeeContent, upiContent);
  
  // Handle the close modal button
  const closeModalButton = document.querySelector('.close-modal');
  const modal = document.getElementById('appreciateModal');
  
  if (closeModalButton && modal) {
    closeModalButton.addEventListener('click', function() {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    });
  }
  
  // Handle the "Like the content?" button
  const appreciateButton = document.querySelector('[data-target="#appreciateModal"]');
  
  if (appreciateButton && modal) {
    appreciateButton.addEventListener('click', function(e) {
      e.preventDefault();
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    });
  }
}); 