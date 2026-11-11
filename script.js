// Simple hash router: #home shows the design, every other page is blank for now.
const pages = ['home', 'about', 'projects', 'skills', 'experience', 'contact'];

function route() {
  let page = location.hash.slice(1);
  if (!pages.includes(page)) page = 'home';
  document.querySelectorAll('.page').forEach(p => (p.hidden = p.id !== page));
  document.querySelectorAll('.nav a').forEach(a =>
    a.classList.toggle('active', a.dataset.page === page)
  );
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', route);
route();
if (window.lucide) lucide.createIcons();

// Hero image rotation
const heroImgs = document.querySelectorAll('.hero-art img');
let heroIdx = 0;

setInterval(() => {
  const old = heroImgs[heroIdx];
  const next = heroImgs[(heroIdx + 1) % heroImgs.length];

  old.classList.remove('active');
  old.classList.add('exit');
  next.classList.add('active');

  setTimeout(() => old.classList.remove('exit'), 800);
  heroIdx = (heroIdx + 1) % heroImgs.length;
}, 15000);

// Projects filter
document.querySelectorAll('.pj-chips button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.pj-chips button').forEach(b => b.classList.toggle('on', b === btn));
    const f = btn.dataset.f;
    document.querySelectorAll('.pj').forEach(c => (c.hidden = f !== 'all' && c.dataset.cat !== f));
  });
});

// Contact form: opens the visitor's mail app (no backend needed on GitHub Pages)
const MY_EMAIL = 'YOUR_EMAIL@example.com';   // <-- put your real email here
const form = document.getElementById('cform');
if (form) form.addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target;
  const subject = `${f.subject.value} — ${f.name.value}`;
  const body = `${f.message.value}\n\nFrom: ${f.name.value} (${f.email.value})`;
  location.href = `mailto:${MY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});