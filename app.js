<script>
// app.js — MachSchritt site scripts

document.addEventListener('DOMContentLoaded', () => {
  /* ===== Footer year ===== */
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ===== Mobile menu ===== */
  const btn = document.querySelector('.menu-btn');
  const nav = document.querySelector('header nav');
  if (btn && nav) {
    btn.addEventListener('click', () => nav.classList.toggle('open'));
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !btn.contains(e.target)) nav.classList.remove('open');
    });
  }

  /* ===== Active link highlight ===== */
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('header nav a').forEach((a) => {
    const href = a.getAttribute('href') || '';
    if ((path === 'index.html' && href === 'index.html') || (href && path === href)) {
      a.classList.add('active');
    }
  });

  /* =========================================================================
     HERO SLIDER (nurses1..nurses6)
     ميزات: تشغيل تلقائي، فيد ناعم، نقاط، أسهُم، إيقاف عند الهوفر، سحب تاتش،
            أسهم الكيبورد، إيقاف عند إخفاء التبويب.
     ========================================================================= */
  const figure = document.querySelector('.hero-figure');
  const heroImg = figure?.querySelector('img');

  if (figure && heroImg) {
    // لو ما فيش wrapper جاهز، أنشئه وبرمجياً أضف الأسهم والنقاط:
    let root = document.querySelector('.hero-slider');
    if (!root) {
      root = document.createElement('div');
      root.className = 'hero-slider';
      figure.parentNode.insertBefore(root, figure);
      root.appendChild(figure);
    }

    // أسهُم
    let prevBtn = root.querySelector('.hero-nav.prev');
    let nextBtn = root.querySelector('.hero-nav.next');
    if (!prevBtn) {
      prevBtn = document.createElement('button');
      prevBtn.className = 'hero-nav prev';
      prevBtn.type = 'button';
      prevBtn.setAttribute('aria-label', 'Zurück');
      prevBtn.textContent = '‹';
      root.appendChild(prevBtn);
    }
    if (!nextBtn) {
      nextBtn = document.createElement('button');
      nextBtn.className = 'hero-nav next';
      nextBtn.type = 'button';
      nextBtn.setAttribute('aria-label', 'Weiter');
      nextBtn.textContent = '›';
      root.appendChild(nextBtn);
    }

    // نقاط
    let dotsWrap = root.querySelector('.hero-dots');
    if (!dotsWrap) {
      dotsWrap = document.createElement('div');
      dotsWrap.className = 'hero-dots';
      dotsWrap.setAttribute('role', 'tablist');
      dotsWrap.setAttribute('aria-label', 'Hero Bilder');
      root.appendChild(dotsWrap);
    }

    // لو الصور داخل مجلد، عدّل البادئة هنا:
    const basePrefix = ''; // مثال: 'images/'

    const heroImages = [
      'nurses1.jpg', 'nurses2.jpg', 'nurses3.jpg',
      'nurses4.jpg', 'nurses5.jpg', 'nurses6.jpg'
    ].map(s => basePrefix + s);

    // Preload
    heroImages.forEach(src => { const im = new Image(); im.src = src; });

    let i = 0;
    let timer = null;
    const DURATION = 3500;

    // أنشئ النقاط
    const dots = heroImages.map((_, idx) => {
      const d = document.createElement('button');
      d.className = 'hero-dot';
      d.type = 'button';
      d.setAttribute('role', 'tab');
      d.setAttribute('aria-label', `Bild ${idx + 1}`);
      d.addEventListener('click', () => show(idx, { autoplayReset: true }));
      dotsWrap.appendChild(d);
      return d;
    });

    function markActive(idx) {
      dots.forEach((d, j) => d.classList.toggle('active', j === idx));
    }

    function show(nextIndex, { autoplayReset = false } = {}) {
      if (nextIndex === i) return;
      i = (nextIndex + heroImages.length) % heroImages.length;

      heroImg.classList.add('fade');
      const tmp = new Image();
      tmp.src = heroImages[i];
      tmp.onload = () => {
        heroImg.src = heroImages[i];
        requestAnimationFrame(() => heroImg.classList.remove('fade'));
        markActive(i);
      };

      if (autoplayReset) restart();
    }

    function nextSlide() { show(i + 1); }
    function prevSlide() { show(i - 1); }

    function start() {
      if (timer) return;
      timer = setInterval(nextSlide, DURATION);
    }
    function stop() {
      if (!timer) return;
      clearInterval(timer);
      timer = null;
    }
    function restart() { stop(); start(); }

    // تفعيل أول نقطة
    markActive(i);

    // أحداث الأسهم
    nextBtn.addEventListener('click', () => { nextSlide(); restart(); });
    prevBtn.addEventListener('click', () => { prevSlide(); restart(); });

    // إيقاف عند الهوفر واستئناف
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);

    // لوحة المفاتيح
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { nextSlide(); restart(); }
      if (e.key === 'ArrowLeft')  { prevSlide(); restart(); }
    });

    // سحب بالإصبع
    let touchX = null;
    const SWIPE = 40; // px
    root.addEventListener('touchstart', (e) => {
      touchX = e.touches[0].clientX; stop();
    }, { passive: true });
    root.addEventListener('touchend', (e) => {
      if (touchX == null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > SWIPE) { (dx < 0 ? nextSlide : prevSlide)(); }
      touchX = null; start();
    }, { passive: true });

    // إيقاف عند إخفاء التبويب
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop(); else start();
    });

    // انطلاقة
    start();
  }
});

</script>
