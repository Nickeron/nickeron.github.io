// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Dark/Light Mode Toggle
const toggleModeButton = document.createElement('button');
toggleModeButton.textContent = '🌙 Toggle Dark Mode';
toggleModeButton.style.position = 'fixed';
toggleModeButton.style.top = '1rem';
toggleModeButton.style.right = '1rem';
toggleModeButton.style.padding = '0.5rem';
toggleModeButton.style.border = 'none';
toggleModeButton.style.background = '#f39c12';
toggleModeButton.style.color = 'white';
toggleModeButton.style.borderRadius = '5px';
toggleModeButton.style.zIndex = '1000';
document.body.appendChild(toggleModeButton);

// Check for saved theme
let darkMode = localStorage.getItem('darkMode') === 'enabled';

const applyDarkMode = (enable) => {
    document.body.classList.toggle('dark', enable);
    toggleModeButton.textContent = enable ? '☀️ Toggle Light Mode' : '🌙 Toggle Dark Mode';
    localStorage.setItem('darkMode', enable ? 'enabled' : 'disabled');
};

applyDarkMode(darkMode);

toggleModeButton.addEventListener('click', () => {
    darkMode = !darkMode;
    applyDarkMode(darkMode);
});

// Scroll Animations
const scrollElements = document.querySelectorAll('.card, h2, p, img');

const elementInView = (el, offset = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset;
};

const displayScrollElement = (el) => {
    el.classList.add('scrolled');
};

const hideScrollElement = (el) => {
    el.classList.remove('scrolled');
};

const handleScrollAnimation = () => {
    scrollElements.forEach(el => {
        if (elementInView(el)) {
            displayScrollElement(el);
        } else {
            hideScrollElement(el);
        }
    });
};

window.addEventListener('scroll', handleScrollAnimation);

// Portfolio Modals
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h3>${card.querySelector('h3').textContent}</h3>
                <p>${card.querySelector('p').textContent}</p>
                <img src="${card.querySelector('img').src}" alt="${card.querySelector('h3').textContent}">
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('.close').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    });
});

// Form Validation
const form = document.getElementById('contact-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    let isValid = true;

    if (!name) {
        alert('Please enter your name.');
        isValid = false;
    }

    if (!email.includes('@') || !email.includes('.')) {
        alert('Please enter a valid email address.');
        isValid = false;
    }

    if (!message) {
        alert('Please enter your message.');
        isValid = false;
    }

    if (isValid) {
        alert('Thank you for your message! I will get back to you soon.');
        form.reset();
    }
});
