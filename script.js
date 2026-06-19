// === Back-to-top ===
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 300);
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// === Menu mobile ===
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('menu-open');
    mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('menu-open');
        mobileMenu.classList.remove('open');
    });
});

// === Carrousel ===
const carouselTrack = document.getElementById('carousel-track');
const carouselPrev  = document.getElementById('carousel-prev');
const carouselNext  = document.getElementById('carousel-next');

carouselPrev.addEventListener('click', () => {
    carouselTrack.scrollBy({ left: -440, behavior: 'smooth' });
});

carouselNext.addEventListener('click', () => {
    carouselTrack.scrollBy({ left: 440, behavior: 'smooth' });
});

// === Modales ===
const modalOverlay = document.getElementById('modal-overlay');

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.add('is-visible');
    document.body.style.overflow = 'hidden';

    // Double rAF — garantit que display:block est rendu avant la transition CSS
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            modalOverlay.classList.add('is-open');
            modal.classList.add('is-active');
        });
    });
}

function closeModal() {
    modalOverlay.classList.remove('is-open');
    document.querySelectorAll('.modal-window').forEach(m => m.classList.remove('is-active'));

    // Retire display:block après la fin de la transition de sortie
    setTimeout(() => {
        document.querySelectorAll('.modal-window').forEach(m => m.classList.remove('is-visible'));
        document.body.style.overflow = '';
    }, 300);
}

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.modal));
});

document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', closeModal);
});

// Fermer au clic sur le fond
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});

// Fermer avec Échap
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});
