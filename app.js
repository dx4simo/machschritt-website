// app.js — MachSchritt site scripts

document.addEventListener('DOMContentLoaded', () => {
  /* ===== سنة الفوتر ===== */
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ===== موبايل منيو ===== */
  const btn = document.querySelector('.menu-btn');
  const nav = document.querySelector('header nav');
  if (btn && nav) {
    btn.addEventListener('click', () => nav.classList.toggle('open'));
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !btn.contains(e.target)) nav.classList.remove('open');
    });
  }

  /* ===== تمييز الرابط الحالي ===== */
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('header nav a').forEach((a) => {
    const href = a.getAttribute('href') || '';
    if ((path === 'index.html' && href === 'index.html') || (href && path === href)) {
      a.classList.add('active');
    }
  });

  /* =========================================================================
     HERO SLIDER (nurses1..nurses6 في مجلد images/)
     ميزات: تشغيل تلقائي، فيد ناعم، نقاط، أسهُم، إيقاف عند الهوفر، سحب تاتش،
            أسهم الكيبورد، إيقاف عند إخفاء التبويب.
     ========================================================================= */
  const figure = document.querySelector('.hero-figure');
  const heroImg = figure?.querySelector('img');

  if (figure && heroImg) {
    // لو ما فيش wrapper جاهز، أنشئه
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

    // الصور من مجلد images/
    const basePrefix = 'images/';
    const heroImages = [
      'nurses1.jpg','nurses2.jpg','nurses3.jpg',
      'nurses4.jpg','nurses5.jpg','nurses6.jpg'
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

  /* =========================================================================
     Auto-assign nurses*.jpg على بطاقات .card تلقائيًا
     - يوزّع الصور بالتتابع من مجلد images/
     - لو البطاقة فيها عنصر .card-img مسبقًا ومحطوط عليه data-fixed="true" → بيتساب
     - ممكن تمنع صورة لبطاقة معينة بـ data-noimg على .card
     - ممكن تحدد صورة معيّنة لبطاقة بـ data-img="nurses12.jpg"
     - لو حصل 404 على الصورة، هنخفي العنصر بدل علامة الكسر
     ========================================================================= */
  (function autoCardImages() {
    const IMG_BASE = 'images/';
    const PREFIX = 'nurses';
    const MAX_INDEX = 20; // عدّلها حسب عدد صورك الفعلي (لو أكتر من 12)
    const cards = Array.from(document.querySelectorAll('.card'));

    let counter = 1;

    cards.forEach(card => {
      // تجاهل البطاقات اللي مش عايز تحط لها صورة
      if (card.hasAttribute('data-noimg')) return;

      // لو محدد صورة معيّنة
      const manual = card.getAttribute('data-img');
      let imgEl = card.querySelector('.card-img');

      // لو مفيش img جاهز، استخدم placeholder .img إن وُجد أو أنشئ عنصر جديد
      if (!imgEl) {
        const ph = card.querySelector('.img');
        imgEl = document.createElement('img');
        imgEl.className = 'card-img';
        imgEl.loading = 'lazy';
        if (ph) {
          ph.replaceWith(imgEl);
        } else {
          // حط الصورة في أول البطاقة
          const first = card.firstElementChild;
          if (first) card.insertBefore(imgEl, first);
          else card.appendChild(imgEl);
        }
      }

      // لو محميّة من التعديل
      if (imgEl.dataset.fixed === 'true') return;

      // alt تلقائي من عنوان البطاقة
      const title = card.querySelector('h3,h2')?.textContent?.trim() || 'Bild';
      if (!imgEl.alt) imgEl.alt = title;

      // حدّد المصدر
      let src;
      if (manual) {
        src = manual.startsWith('http') ? manual : (manual.startsWith(IMG_BASE) ? manual : IMG_BASE + manual);
      } else {
        const index = ((counter - 1) % MAX_INDEX) + 1;
        src = `${IMG_BASE}${PREFIX}${index}.jpg`;
        counter++;
      }

      // حط الصورة + اخفيها لو 404
      imgEl.addEventListener('error', () => { imgEl.style.display = 'none'; });
      imgEl.src = src;
    });
  })();
});
