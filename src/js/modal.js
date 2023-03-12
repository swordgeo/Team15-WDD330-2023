// Get the modal element
const modal = document.querySelector('.modal');

// Get the button element
const quickViewButtons = document.querySelectorAll('.quick-view-button');

// Loop through each button and add a click event listener
quickViewButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Get the product ID from the data-product-id attribute
    const productId = button.dataset.productId;

    // Fetch the product details from the server
    fetch(`/api/product-details/${productId}`)
      .then(response => response.json())
      .then(product => {
        // Update the modal with the product details
        modal.querySelector('h2').textContent = product.name;
        modal.querySelector('img').src = product.image;
        modal.querySelector('p:nth-of-type(1)').textContent = `Price: $${product.price}`;
        modal.querySelector('p:nth-of-type(2)').textContent = `Description: ${product.description}`;

        // Display the modal
        modal.style.display = 'block';
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  });
});

// Add a click event listener to the close button
const closeButton = modal.querySelector('.close-button');
closeButton.addEventListener('click', () => {
  // Hide the modal
  modal.style.display = 'none';
});