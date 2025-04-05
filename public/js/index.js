let index = 0;
function showSlides() {
    let slides = document.querySelectorAll(".slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.opacity = "0";
    }
    index++;
    if (index > slides.length) {
        index = 1;
    }
    slides[index - 1].style.opacity = "1";
    setTimeout(showSlides, 3000); // Change slide every 3 seconds
}
showSlides();

class PopupManager {
    constructor() {
        this.popup = document.getElementById('loginPopup');
        this.overlay = document.getElementById('overlay');
        this.form = document.getElementById('loginForm');
        this.errorDiv = document.getElementById('loginError');
        
        this.initialize();
    }

    initialize() {
        // Close on overlay click
        this.overlay.addEventListener('click', () => this.close());
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.close();
        });
        
        // Handle form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    open() {
        this.popup.style.display = 'block';
        this.overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.popup.style.display = 'none';
        this.overlay.style.display = 'none';
        document.body.style.overflow = '';
        this.form.reset();
        this.hideError();
    }

    showError(message) {
        this.errorDiv.textContent = message;
        this.errorDiv.style.display = 'block';
    }

    hideError() {
        this.errorDiv.style.display = 'none';
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success) {
                window.location.href = '/dashboard';
            } else {
                this.showError(data.message || 'Login failed');
            }
        } catch (error) {
            this.showError('An error occurred. Please try again.');
        }
    }
}

// Initialize popup manager
const popupManager = new PopupManager();

// Global functions for HTML onclick attributes
window.openPopup = () => popupManager.open();
window.closePopup = () => popupManager.close();

