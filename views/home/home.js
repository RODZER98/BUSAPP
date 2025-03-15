// home.js

document.addEventListener('DOMContentLoaded', function() {
    // Create spinner element
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    document.body.appendChild(spinner);

    // Simulate page load
    setTimeout(() => {
        spinner.style.display = 'none';
    }, 3000); // Adjust the timeout as needed

    // Add some movement effect to an element
    const movingElement = document.querySelector('.moving-element');
    if (movingElement) {
        movingElement.classList.add('move');
    }
});