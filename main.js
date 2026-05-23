gsap.registerPlugin(ScrollTrigger);

/* ===========================
   HERO — entrance animations
   =========================== */
const heroTL = gsap.timeline({ defaults: { ease: 'power4.out' } });

heroTL
    .to('.hero-eyebrow', { opacity: 1, duration: 0.8, delay: 0.3 })
    .to('.title-line', {
        clipPath: 'inset(0 0 0% 0)',
        duration: 1.1,
        stagger: 0.18,
    }, '-=0.3')
    .to('.hero-sub', { opacity: 1, y: 0, duration: 0.9 }, '-=0.5')
    .to('.hero-stats', { opacity: 1, y: 0, duration: 0.9 }, '-=0.5')
    .to('.scroll-cue', { opacity: 1, duration: 0.8 }, '-=0.3');

/* ===========================
   SECTION LABEL
   =========================== */
ScrollTrigger.create({
    trigger: '.section-label',
    start: 'top 88%',
    onEnter() {
        gsap.to('.label-text', { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' });
        gsap.to('.label-line', { scaleX: 1, duration: 1, ease: 'power3.out', delay: 0.2 });
    }
});

/* ===========================
   PROJECT CARDS — scroll reveal
   =========================== */
gsap.utils.toArray('.project').forEach((card, i) => {
    const content = card.querySelector('.proj-content');
    const visual  = card.querySelector('.proj-visual');
    const isEven  = i % 2 === 1;

    gsap.set(content, { opacity: 0, x: isEven ? 40 : -40 });
    gsap.set(visual,  { opacity: 0, x: isEven ? -40 : 40 });

    ScrollTrigger.create({
        trigger: card,
        start: 'top 82%',
        onEnter() {
            gsap.to(card,    { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' });
            gsap.to(content, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 });
            gsap.to(visual,  { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.2 });
        }
    });
});

/* ===========================
   PARALLAX on visuals
   =========================== */
gsap.utils.toArray('.proj-visual img').forEach(img => {
    gsap.to(img, {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: {
            trigger: img.closest('.project'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
        }
    });
});

/* ===========================
   CUSTOM CURSOR
   =========================== */
if (window.matchMedia('(pointer: fine)').matches) {
    const dot      = document.querySelector('.cursor');
    const ring     = document.querySelector('.cursor-follower');
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
        gsap.set(dot, { x: mx, y: my });
    });

    gsap.ticker.add(() => {
        rx += (mx - rx) * 0.1;
        ry += (my - ry) * 0.1;
        gsap.set(ring, { x: rx, y: ry });
    });

    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
    });
}

/* ===========================
   NAV — blur on scroll
   =========================== */
const nav = document.querySelector('.nav');
ScrollTrigger.create({
    start: 'top -60',
    onUpdate(self) {
        nav.style.background = self.progress > 0
            ? 'rgba(12,12,15,.8)'
            : 'transparent';
        nav.style.backdropFilter = self.progress > 0 ? 'blur(20px)' : 'none';
        nav.style.transition = 'background .4s, backdrop-filter .4s';
    }
});
