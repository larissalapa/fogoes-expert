// Elementos do DOM
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');
const navLinks = document.getElementById('nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const header = document.querySelector('header');

// Estados
let lastScroll = 0;
let isMenuOpen = false;

// Função para alternar o menu
const toggleMenu = (open) => {
  isMenuOpen = open;
  navLinks.classList.toggle('active', open);
  closeIcon.style.display = open ? 'block' : 'none';
  menuIcon.style.display = open ? 'none' : 'block';
};

// Função para manipular o scroll
const handleScroll = () => {
  const currentScroll = window.pageYOffset;
  
  // Esconde/mostra header ao rolar
  if (currentScroll > lastScroll && currentScroll > 100) {
    header.classList.add('hide');
    header.classList.remove('show');
  } else {
    header.classList.remove('hide');
    header.classList.add('show');
  }
  
  // Fecha menu se estiver aberto e rolar
  if (isMenuOpen && Math.abs(currentScroll - lastScroll) > 10) {
    toggleMenu(false);
  }
  
  lastScroll = currentScroll;
  
  // Efeito de surgimento nas seções
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const sectionBottom = section.getBoundingClientRect().bottom;
    section.classList.toggle('visible', 
      sectionTop < window.innerHeight * 0.8 && sectionBottom > 0
    );
  });
};

// Event Listeners para o menu mobile
menuIcon.addEventListener('click', () => {
  toggleMenu(true);
  header.classList.add('show'); // Garante que o header fique visível ao abrir o menu
});

closeIcon.addEventListener('click', () => {
  toggleMenu(false);
});

// Fechar menu ao clicar fora ou em um link
document.addEventListener('click', (e) => {
  const clickedInsideMenu = e.target.closest('#menu-icon, #nav-links, #close-icon');
  if (!clickedInsideMenu && isMenuOpen) {
    toggleMenu(false);
  }
});

// Scroll suave para os links
navItems.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      toggleMenu(false);
      window.scrollTo({
        top: targetElement.offsetTop - header.offsetHeight,
        behavior: 'smooth'
      });
    }
  });
});

// Inicialização
window.addEventListener('scroll', handleScroll);
window.addEventListener('load', () => {
  handleScroll();
  closeIcon.style.display = 'none';
  
  // Verifica se há um hash na URL e faz scroll suave
  if (window.location.hash) {
    const targetElement = document.querySelector(window.location.hash);
    if (targetElement) {
      setTimeout(() => {
        window.scrollTo({
          top: targetElement.offsetTop - header.offsetHeight,
          behavior: 'smooth'
        });
      }, 100);
    }
  }
});