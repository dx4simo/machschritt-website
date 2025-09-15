// app.js — MachSchritt site scripts (يدعم WebP + fallback تلقائي)

document.addEventListener('DOMContentLoaded', () => {
  /* ===== إعدادات الصور ===== */
  const IMG_DIR = 'images/';       // مجلد الصور
  const NAME    = 'nurses';        // بادئة أسماء الصور (nurses1, nurses2, ...)
  const COUNT   = 12;              // عدد الصور الفعلي (عدّله حسب الموجود)
  const EXTS    = ['webp','jpg','jpeg','png']; // ترتيب المحاولة

    /* ===== Kontakt: إرسال الإيميل عبر Apps Script ===== */
  const CONTACT_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwAGlpYcYYaFtBE6ejXvLWeMzDHIN0Q0B8TCNFTThoMn_6kHXNxlfyUdRFf3IzyNLUeXA/exec'; // ← الصق URL

  const form  = document.getElementById('contact-form');
  const btn   = document.getElementById('c-submit');
  const stat  = document.getElementById('c-status');

  if (form && btn) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // honeypot
      if (document.getElementById('c-company')?.value) return;

      const name    = document.getElementById('c-name')?.value.trim();
      const phone   = document.getElementById('c-phone')?.value.trim();
      const email   = document.getElementById('c-email')?.value.trim();
      const subject = document.getElementById('c-subject')?.value.trim();
      const message = document.getElementById('c-message')?.value.trim();

      if (!name || !subject || !message) {
        if (stat) stat.textContent = 'Bitte füllen Sie die Pflichtfelder aus.';
        return;
      }

      btn.disabled = true;
      if (stat) stat.textContent = 'Wird gesendet…';

      try {
        // نستخدم text/plain لتفادي preflight/CORS
        const payload = {
          name, phone, email, subject, message,
          ua: navigator.userAgent, source: 'website'
        };
        const res = await fetch(CONTACT_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload)
        });

        // Apps Script بيرجع JSON بسيط
        let ok = res.ok;
        try {
          const j = await res.json();
          ok = ok && j.ok;
        } catch (_) {}

        if (ok) {
          if (stat) stat.textContent = 'Vielen Dank! Ihre Nachricht wurde gesendet.';
          form.reset();
        } else {
          if (stat) stat.textContent = 'Fehler beim Senden. Bitte versuchen Sie es später erneut.';
        }
      } catch (err) {
        if (stat) stat.textContent = 'Netzwerkfehler. Bitte versuchen Sie es erneut.';
      } finally {
        btn.disabled = false;
      }
    });
  }


  /* ===== سنة الفوتر ===== */
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

 /* ===== موبايل منيو ===== */
const menuBtn = document.querySelector('.menu-btn');
const navEl   = document.querySelector('header nav');
if (menuBtn && navEl) {
  menuBtn.addEventListener('click', () => navEl.classList.toggle('open'));
  document.addEventListener('click', (e) => {
    if (!navEl.contains(e.target) && !menuBtn.contains(e.target)) {
      navEl.classList.remove('open');
    }
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

  /* ===== دالة تعيين صورة بامتدادات بديلة تلقائيًا ===== */
  function setWithFallback(imgEl, baseNameNoExt) {
    let k = 0;
    function attempt() {
      if (k >= EXTS.length) { imgEl.style.display = 'none'; return; }
      const src = IMG_DIR + baseNameNoExt + '.' + EXTS[k];
      imgEl.onerror = () => { k++; attempt(); };
      imgEl.onload  = () => { imgEl.onerror = null; };
      imgEl.src = src;
    }
    attempt();
  }

  /* =========================================================================
     HERO SLIDER (يدعم WebP + fallback)
     ========================================================================= */
  const figure = document.querySelector('.hero-figure');
  const heroImg = figure?.querySelector('img');

  if (figure && heroImg) {
    // غلاف السلايدر + الأسهم + النقاط (إن لم تكن موجودة)
    let root = document.querySelector('.hero-slider');
    if (!root) {
      root = document.createElement('div');
      root.className = 'hero-slider';
      figure.parentNode.insertBefore(root, figure);
      root.appendChild(figure);
    }

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

    let dotsWrap = root.querySelector('.hero-dots');
    if (!dotsWrap) {
      dotsWrap = document.createElement('div');
      dotsWrap.className = 'hero-dots';
      dotsWrap.setAttribute('role', 'tablist');
      dotsWrap.setAttribute('aria-label', 'Hero Bilder');
      root.appendChild(dotsWrap);
    }

    // نقاط حسب COUNT
    let i = 0;
    const dots = Array.from({length: Math.max(1, COUNT)}, (_, idx) => {
      const d = document.createElement('button');
      d.className = 'hero-dot';
      d.type = 'button';
      d.setAttribute('role', 'tab');
      d.setAttribute('aria-label', `Bild ${idx + 1}`);
      d.addEventListener('click', () => show(idx, { autoplayReset: true }));
      dotsWrap.appendChild(d);
      return d;
    });
    function markActive(idx){ dots.forEach((d,j)=>d.classList.toggle('active', j===idx)); }

    function show(nextIndex, {autoplayReset=false} = {}) {
      if (nextIndex === i) return;
      i = (nextIndex + COUNT) % COUNT; // 0..COUNT-1
      heroImg.classList.add('fade');

      // جرّب الامتدادات بالترتيب للصورة المطلوبة
      const baseName = NAME + (i + 1); // nurses1, nurses2, ...
      const probe = new Image();
      let k = 0;
      function tryNext() {
        if (k >= EXTS.length) { heroImg.classList.remove('fade'); return; }
        const src = IMG_DIR + baseName + '.' + EXTS[k];
        probe.onload  = () => {
          heroImg.src = src;
          requestAnimationFrame(()=> heroImg.classList.remove('fade'));
          markActive(i);
        };
        probe.onerror = () => { k++; tryNext(); };
        probe.src = src;
      }
      tryNext();

      if (autoplayReset) restart();
    }
    function nextSlide(){ show(i + 1); }
    function prevSlide(){ show(i - 1); }

    let timer = null;
    const DURATION = 3500;
    function start(){ if (!timer) timer = setInterval(nextSlide, DURATION); }
    function stop(){ if (timer) { clearInterval(timer); timer = null; } }
    function restart(){ stop(); start(); }

    // تفعيل أول نقطة + أول صورة
    markActive(i);
    setWithFallback(heroImg, NAME + (i + 1));

    nextBtn.addEventListener('click', () => { nextSlide(); restart(); });
    prevBtn.addEventListener('click', () => { prevSlide(); restart(); });
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { nextSlide(); restart(); }
      if (e.key === 'ArrowLeft')  { prevSlide(); restart(); }
    });

    // سحب بالإصبع
    let touchX = null; const SWIPE = 40;
    root.addEventListener('touchstart', (e)=>{ touchX = e.touches[0].clientX; stop(); }, {passive:true});
    root.addEventListener('touchend',   (e)=>{
      if (touchX == null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > SWIPE) { (dx < 0 ? nextSlide : prevSlide)(); }
      touchX = null; start();
    }, {passive:true});

    document.addEventListener('visibilitychange', ()=> document.hidden ? stop() : start());
    start();
  }

  /* =========================================================================
     توزيع تلقائي لصور البطاقات (.card) — يدعم WebP + fallback
     - لكل بطاقة: لو فيها .img placeholder → هنستبدّله بـ <img.card-img>
     - لو البطاقة عليها data-noimg → نتجاهلها
     - لو عليها data-img="اسم_ملف" → نستخدمه كما هو (مع مجلد images/ لو ناقص)
     - alt يُستخرج تلقائيًا من <h3>/<h2>
     ========================================================================= */
  (function autoCardImages() {
    const cards = Array.from(document.querySelectorAll('.card'));
    let counter = 1;
    cards.forEach(card => {
      if (card.hasAttribute('data-noimg')) return;

      const manual = card.getAttribute('data-img'); // اسم ملف مخصص
      let imgEl = card.querySelector('.card-img');
      if (!imgEl) {
        const ph = card.querySelector('.img');
        imgEl = document.createElement('img');
        imgEl.className = 'card-img';
        imgEl.loading = 'lazy';
        if (ph) ph.replaceWith(imgEl); else card.insertBefore(imgEl, card.firstElementChild);
      }
      if (imgEl.dataset.fixed === 'true') return;

      const title = card.querySelector('h3,h2')?.textContent?.trim() || 'Bild';
      if (!imgEl.alt) imgEl.alt = title;

      if (manual) {
        // لو حدّدت ملف معيّن
        const hasDir = manual.startsWith('http') || manual.startsWith(IMG_DIR);
        const base   = hasDir ? manual : (IMG_DIR + manual);
        // لو فيه امتداد بالفعل هنستخدمه كما هو، لو لأ نجرب EXTS
        if (/\.(webp|jpe?g|png|gif|avif)$/i.test(base)) {
          imgEl.onerror = () => { imgEl.style.display = 'none'; };
          imgEl.src = base;
        } else {
          // manual بدون امتداد → جرّب الامتدادات
          let k = 0;
          function tryManual() {
            if (k >= EXTS.length) { imgEl.style.display = 'none'; return; }
            const src = base + '.' + EXTS[k];
            imgEl.onerror = () => { k++; tryManual(); };
            imgEl.src = src;
          }
          tryManual();
        }
      } else {
        // تلقائي: nurses1..nursesCOUNT
        const index = ((counter - 1) % COUNT) + 1;
        counter++;
        setWithFallback(imgEl, NAME + index);
      }
    });
  })();
});
