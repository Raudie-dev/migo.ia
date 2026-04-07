/* ============================================
   MIGO.IA – MAIN.JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── CUSTOM CURSOR ───────────────────────────
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Grow on interactive elements
  document.querySelectorAll('a, button, .pain-card, .team-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2)';
      follower.style.width = '56px';
      follower.style.height = '56px';
      follower.style.borderColor = 'rgba(0,255,204,0.6)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      follower.style.width = '36px';
      follower.style.height = '36px';
      follower.style.borderColor = 'rgba(0,255,204,0.35)';
    });
  });

  // ─── NAV SCROLL ──────────────────────────────
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ─── MOBILE MENU ─────────────────────────────
  const burger = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('mobileMenu');
  let menuOpen = false;

  burger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('open', menuOpen);
    // Animate burger
    const spans = burger.querySelectorAll('span');
    if (menuOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close mobile menu on link click
  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false;
      mobileMenu.classList.remove('open');
      burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });

  // ─── REVEAL ON SCROLL ────────────────────────
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  // ─── COUNTER ANIMATION ───────────────────────
  const statNums = document.querySelectorAll('.stat-num');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ─── FORM – OPTION BUTTONS ───────────────────
  const optBtns = document.querySelectorAll('.opt-btn');
  const dolorHidden = document.getElementById('dolorHidden');

  optBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      optBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      dolorHidden.value = btn.dataset.value;
    });
  });

  // ─── FORM SUBMISSION ─────────────────────────
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      const nombre = contactForm.nombre.value.trim();
      const email  = contactForm.email.value.trim();

      // Basic validation
      if (!nombre || !email) {
        shakeForm();
        return;
      }

      // Simulate async send
      const btn = contactForm.querySelector('.btn-form');
      btn.textContent = 'Enviando…';
      btn.disabled = true;

      setTimeout(() => {
        contactForm.style.display = 'none';
        formSuccess.classList.add('show');
      }, 1200);
    });
  }

  function shakeForm() {
    const form = document.getElementById('contactForm');
    form.style.animation = 'shake 0.4s ease';
    setTimeout(() => { form.style.animation = ''; }, 400);
  }

  // Add shake keyframes dynamically
  const shakeStyle = document.createElement('style');
  shakeStyle.textContent = `
    @keyframes shake {
      0%,100% { transform: translateX(0); }
      20% { transform: translateX(-8px); }
      40% { transform: translateX(8px); }
      60% { transform: translateX(-6px); }
      80% { transform: translateX(6px); }
    }
  `;
  document.head.appendChild(shakeStyle);

  // ─── WHATSAPP FAB – SHOW AFTER SCROLL ────────
  const fab = document.getElementById('whatsappFab');
  let fabVisible = false;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300 && !fabVisible) {
      fab.style.opacity = '1';
      fab.style.transform = 'translateY(0)';
      fabVisible = true;
    } else if (window.scrollY <= 300 && fabVisible) {
      fab.style.opacity = '0';
      fab.style.transform = 'translateY(20px)';
      fabVisible = false;
    }
  });

  // Initial state
  fab.style.opacity = '0';
  fab.style.transform = 'translateY(20px)';
  fab.style.transition = 'opacity 0.4s ease, transform 0.4s ease, box-shadow 0.25s, transform 0.25s';

  // ─── SMOOTH ANCHOR SCROLL ────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = nav.offsetHeight;
        const top  = target.getBoundingClientRect().top + window.scrollY - navH - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ─── PARALLAX ORBS ───────────────────────────
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    document.querySelectorAll('.orb-1').forEach(o => {
      o.style.transform = `translateY(${y * 0.12}px)`;
    });
    document.querySelectorAll('.orb-2').forEach(o => {
      o.style.transform = `translateY(${-y * 0.08}px)`;
    });
  });

  // ─── HERO TITLE CHAR REVEAL ──────────────────
  // Stagger in the hero after a short delay
  setTimeout(() => {
    document.querySelectorAll('.hero .reveal').forEach((el, i) => {
      el.style.transitionDelay = (i * 0.1) + 's';
      el.classList.add('in-view');
    });
  }, 200);

});
