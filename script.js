// Inicializar AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    offset: 100,
    delay: 0
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animação de contagem para números
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Observar elementos com contadores
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const target = parseInt(entry.target.getAttribute('data-count'));
            animateCounter(entry.target, target);
        }
    });
}, observerOptions);

// Aplicar contador a todos os elementos com data-count
document.querySelectorAll('[data-count]').forEach(element => {
    counterObserver.observe(element);
});

// Filtro de atletas
const filterButtons = document.querySelectorAll('.btn-filter');
const athleteItems = document.querySelectorAll('.athlete-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remover classe active de todos os botões
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Adicionar classe active ao botão clicado
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        athleteItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                // Re-trigger AOS animation
                item.setAttribute('data-aos', 'fade-up');
                AOS.refresh();
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Parallax effect para background
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Form submissions
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Animação de sucesso
        const button = this.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        
        button.textContent = 'Enviando...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = '✓ Enviado!';
            button.style.background = '#28a745';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = '';
                form.reset();
            }, 2000);
        }, 1000);
    });
});

// Efeito de hover nos cards
document.querySelectorAll('.info-card, .member-card, .athlete-card, .result-card, .news-card, .partner-card, .transparency-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
});

// Animação de texto no hero
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.opacity = '0';
        span.style.animation = `fadeInChar 0.5s ease forwards ${index * 0.05}s`;
        heroTitle.appendChild(span);
    });
}

// Adicionar estilo de animação para caracteres
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInChar {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Lazy loading para imagens (se houver)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Efeito de typing no scroll indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}

// Adicionar classe de animação quando elementos entram na viewport
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.step-item, .info-card, .member-card').forEach(el => {
    animateOnScroll.observe(el);
});

// Console message
console.log('%c Acquática Prudente/Semepp ', 'background: #c61511; color: #fff; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Site desenvolvido com Bootstrap 5 e animações modernas ', 'background: #000; color: #fff; font-size: 12px; padding: 5px;');
