// Menu mobile simples e funcional
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    console.log('Menu elements loaded:', { menuToggle, navLinks });
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Menu button clicked');
            
            const isActive = navLinks.classList.contains('active');
            
            if (!isActive) {
                // Abrir menu
                console.log('Opening menu');
                navLinks.classList.add('active');
                body.classList.add('menu-open');
                menuToggle.innerHTML = '<i class="fas fa-times"></i>';
                menuToggle.style.background = 'var(--primary-dark)';
            } else {
                // Fechar menu
                console.log('Closing menu');
                closeMenu();
            }
        });
        
        // Fechar menu ao clicar nos links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function(e) {
                console.log('Link clicked, closing menu');
                closeMenu();
            });
        });
        
        // Fechar menu ao clicar fora (em qualquer lugar da página)
        document.addEventListener('click', function(e) {
            if (navLinks.classList.contains('active') && 
                !e.target.closest('.nav-links') && 
                !e.target.closest('.menu-toggle')) {
                console.log('Clicked outside, closing menu');
                closeMenu();
            }
        });
        
        // Fechar menu com tecla ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });
        
        function closeMenu() {
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            menuToggle.style.background = 'var(--primary)';
        }
    }
    
    // Header scroll effect
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.feature-card, .service-card, .gallery-item').forEach(el => {
        observer.observe(el);
    });
});