<script>
document.addEventListener('DOMContentLoaded', ()=>{
  // سنة الفوتر
  const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();

  // موبايل منيو
  const btn = document.querySelector('.menu-btn');
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
