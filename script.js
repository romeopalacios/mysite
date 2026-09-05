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

const work = document.querySelector('.work');
if (work) {
  const slides = [...work.querySelectorAll('.work-slide')];
  const dots = [...work.querySelectorAll('.work-dots button')];
  const counter = work.querySelector('.work-current');
  let activeProject = 0;

  const showProject = (index) => {
    activeProject = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeProject;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
    });
    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeProject;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-pressed', String(isActive));
    });
    counter.textContent = String(activeProject + 1).padStart(2, '0');
  };

  work.querySelector('.work-prev').addEventListener('click', () => showProject(activeProject - 1));
  work.querySelector('.work-next').addEventListener('click', () => showProject(activeProject + 1));
  dots.forEach((dot, index) => dot.addEventListener('click', () => showProject(index)));
  work.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') showProject(activeProject - 1);
    if (event.key === 'ArrowRight') showProject(activeProject + 1);
  });

  let touchStart = 0;
  work.addEventListener('touchstart', (event) => { touchStart = event.changedTouches[0].clientX; }, { passive: true });
  work.addEventListener('touchend', (event) => {
    const distance = event.changedTouches[0].clientX - touchStart;
    if (Math.abs(distance) > 55) showProject(activeProject + (distance < 0 ? 1 : -1));
  }, { passive: true });
}
