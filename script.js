const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: 0.12 });
  reveals.forEach((element) => observer.observe(element));
} else { reveals.forEach((element) => element.classList.add('visible')); }

const header = document.querySelector('.site-header');
const heroShape = document.querySelector('.hero-shape');

const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

if (heroShape && window.matchMedia('(pointer: fine)').matches) {
  heroShape.addEventListener('pointermove', (event) => {
    const bounds = heroShape.getBoundingClientRect();
    heroShape.style.setProperty('--mx', `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
    heroShape.style.setProperty('--my', `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
  });
  heroShape.addEventListener('pointerleave', () => {
    heroShape.style.setProperty('--mx', '50%');
    heroShape.style.setProperty('--my', '50%');
  });
}
