// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navActions = document.querySelector('.nav-actions');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navActions.classList.toggle('active');
    
    // Change icon
    const icon = menuToggle.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .service-card, .gallery-item').forEach(el => {
    observer.observe(el);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navActions.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});

// Initialize animations for elements already in view
document.addEventListener('DOMContentLoaded', () => {
    // Animate elements that are already visible
    document.querySelectorAll('.feature-card, .service-card, .gallery-item').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('animate-fade-in-up');
        }
    });
    
    // Add CSS for mobile menu
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-links.active, .nav-actions.active {
                display: flex !important;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: white;
                box-shadow: var(--shadow);
                padding: 20px;
                gap: 15px;
                z-index: 1000;
            }
            
            .nav-links.active {
                margin-top: 10px;
            }
            
            .nav-actions.active {
                margin-top: 10px;
                flex-direction: column;
            }
        }
    `;
    document.head.appendChild(style);
});

// Animação da galeria
const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
        }
    });
}, { threshold: 0.1 });

// Observar itens da galeria
document.querySelectorAll('.gallery-item').forEach(item => {
    galleryObserver.observe(item);
});

// Navegação da galeria
const galleryContainer = document.getElementById('galleryContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const galleryItems = document.querySelectorAll('.gallery-item');
const itemWidth = 350 + 25; // Largura do item + gap

// Função para rolar a galeria
function scrollGallery(direction) {
    const scrollAmount = itemWidth * 3; // Rolar 3 itens por vez
    const currentScroll = galleryContainer.scrollLeft;
    
    if (direction === 'next') {
        galleryContainer.scrollTo({
            left: currentScroll + scrollAmount,
            behavior: 'smooth'
        });
    } else {
        galleryContainer.scrollTo({
            left: currentScroll - scrollAmount,
            behavior: 'smooth'
        });
    }
    
    updateButtonStates();
}

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        navActions.classList.toggle('active');
        
        // Altera o ícone
        const icon = this.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Fecha menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            navActions.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
        });
    });
});