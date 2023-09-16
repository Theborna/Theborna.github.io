const coll = document.getElementsByClassName("collapsible");
let i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        const content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}

const typedText = document.querySelector('.typed-text');
const itemsAttribute = typedText.getAttribute('data-typed-items');
const textItems = itemsAttribute.split(', ').map(item => item.trim());
let index = 0;
let currentText = '';
let isErasing = false;

function type() {
    if (!isErasing) {
        currentText = textItems[index].substring(0, currentText.length + 1);
        typedText.textContent = currentText;
    }

    if (currentText === textItems[index] && !isErasing) {
        isErasing = true;
        setTimeout(erase, 1000);
    } else if (currentText === '' && isErasing) {
        isErasing = false;
        index = (index + 1) % textItems.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, 100);
    }
}

function erase() {
    if (isErasing) {
        currentText = textItems[index].substring(0, currentText.length - 1);
        typedText.textContent = currentText;
    }

    if (currentText === '') {
        isErasing = false;
        index = (index + 1) % textItems.length;
        setTimeout(type, 500);
    } else {
        setTimeout(erase, 100);
    }
}

window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.top-nav-group');
    const scrollY = window.scrollY;
    const threshold = navbar.offsetHeight; // Use the height of the navbar as the threshold

    if (scrollY > threshold) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});

const darkModeToggle = document.getElementById('dark-mode-toggle');
const root = document.documentElement;

// Add a click event listener to the button
darkModeToggle.addEventListener('click', function () {
    // Toggle the 'dark-mode' class on the root element
    root.classList.toggle('dark-mode');
});

document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.getElementById('submit-button');
    const form = document.getElementById('contact-form');
    const successMessage = document.querySelector('.success-message');
    const errorMessage = document.querySelector('.error-message');

    submitButton.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent the link from navigating

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Validate the email (you can add more robust validation)
        if (!validateEmail(email)) {
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
            return;
        }

        // Simulate a delay (2 seconds) for demonstration purposes
        submitButton.textContent = 'Please wait...';
        setTimeout(function () {
            // Simulate success for the example
            successMessage.style.display = 'block';
            errorMessage.style.display = 'none';
            form.style.display = 'none';

            // Reset the form
            form.reset();
            submitButton.textContent = submitButton.getAttribute('data-wait');
        }, 2000);
    });

    function validateEmail(email) {
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});


type();