<script>
document.addEventListener('DOMContentLoaded', ()=>{
  // سنة الفوتر
  const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();

  // موبايل منيو
  const btn = document.querySelector('.menu-btn');
  // === Hero slider (nurses1..nurses6) ===
document.addEventListener('DOMContentLoaded', ()=>{
  const img = document.querySelector('.hero-figure img');
  if(!img) return;

  // عدّل المسار لو في مجلد images/
  const heroImages = ['nurses1.jpg','nurses2.jpg','nurses3.jpg','nurses4.jpg','nurses5.jpg','nurses6.jpg'];

  // بداية من الصورة الحالية
  let i = 0;

  // Preload بسيط
  heroImages.forEach(src => { const im = new Image(); im.src = src; });

  setInterval(()=>{
    i = (i + 1) % heroImages.length;
    const nextSrc = heroImages[i];

    img.classList.add('fade');           // ابدأ الفيد آوت
    const temp = new Image();
    temp.src = nextSrc;
    temp.onload = ()=>{                  // لما الصورة الجاية تجهز
      img.src = nextSrc;                 // بدّل المصدر
      requestAnimationFrame(()=>{        // رجّع الفيد إن
        img.classList.remove('fade');
      });
    };
  }, 3500); // مدة كل سلايد
});

  const nav = document.querySelector('header nav');
  if(btn && nav){
    btn.addEventListener('click', ()=> nav.classList.toggle('open'));
    document.addEventListener('click', (e)=>{
      if(!nav.contains(e.target) && !btn.contains(e.target)) nav.classList.remove('open');
    });
  }

  // تمييز الرابط الحالي
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('header nav a').forEach(a=>{
    const href = a.getAttribute('href') || '';
    if((path === 'index.html' && href === 'index.html') || (href && path === href)) a.classList.add('active');
  });
});
</script>
