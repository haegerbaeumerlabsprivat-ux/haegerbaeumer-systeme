// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll('[data-reveal]');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const siblingDelay = Array.from(el.parentElement.children).indexOf(el) * 80;
      el.style.transitionDelay = `${siblingDelay}ms`;
      el.classList.add('is-visible');
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.2 });

revealEls.forEach((el) => revealObserver.observe(el));

// ---------- Mobile nav toggle ----------
const header = document.getElementById('site-header');
const navToggle = document.getElementById('nav-toggle');
const siteNav = document.getElementById('site-nav');

navToggle.addEventListener('click', () => {
  const isOpen = header.classList.toggle('nav-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

siteNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    header.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---------- Contact form ----------
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const formError = document.getElementById('form-error');
const CONTACT_ENDPOINT = 'https://nicklaurin.app.n8n.cloud/webhook/kontakt-haegerbaeumer-systeme';

if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Wird gesendet …';
    }
    if (formError) formError.hidden = true;

    const payload = {
      name: contactForm.elements.name.value.trim(),
      email: contactForm.elements.email.value.trim(),
      firma: contactForm.elements.firma ? contactForm.elements.firma.value.trim() : '',
      nachricht: contactForm.elements.nachricht ? contactForm.elements.nachricht.value.trim() : '',
    };

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Request failed: ' + res.status);

      contactForm.hidden = true;
      formSuccess.hidden = false;
      contactForm.reset();
    } catch (err) {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Anfrage absenden';
      }
      if (formError) {
        formError.hidden = false;
      } else {
        alert('Das hat leider nicht geklappt. Bitte schreiben Sie mir direkt an kontakt@haegerbaeumer-systeme.de.');
      }
    }
  });
}

// ---------- Reactive elements (skipped for reduced-motion users) ----------
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Automation demo widgets — each instance cycles through its own steps independently
document.querySelectorAll('.automation-demo').forEach((demo) => {
  const steps = demo.querySelectorAll('.automation-demo__step');
  if (!steps.length) return;

  if (prefersReducedMotion) {
    steps.forEach((el) => el.classList.add('is-done'));
    return;
  }

  let current = -1;
  let resetting = false;

  setInterval(() => {
    if (resetting) return;
    current += 1;

    if (current >= steps.length) {
      resetting = true;
      setTimeout(() => {
        steps.forEach((el) => el.classList.remove('is-active', 'is-done'));
        current = -1;
        resetting = false;
      }, 1400);
      return;
    }

    steps.forEach((el, i) => {
      el.classList.toggle('is-done', i < current);
      el.classList.toggle('is-active', i === current);
    });
  }, 1500);
});

// ---------- Build-Demo: Tastatur tippt, Webseite baut sich zusammen ----------
const laptopKeys = document.getElementById('laptop-keys');

if (laptopKeys) {
  const KEY_COUNT = 39;
  const keys = [];
  for (let i = 0; i < KEY_COUNT; i += 1) {
    const key = document.createElement('span');
    key.className = 'key';
    laptopKeys.appendChild(key);
    keys.push(key);
  }

  if (!prefersReducedMotion) {
    setInterval(() => {
      const key = keys[Math.floor(Math.random() * keys.length)];
      key.classList.add('is-active');
      setTimeout(() => key.classList.remove('is-active'), 140);
    }, 90);
  }
}

const buildCanvas = document.getElementById('build-canvas');

if (buildCanvas) {
  const blockNav = document.getElementById('block-nav');
  const blockHero = document.getElementById('block-hero');
  const blockText = document.getElementById('block-text');
  const blockImg = document.getElementById('block-img');
  const typeTarget = document.getElementById('type-text');

  const headlines = ['Ihre neue Webseite.', 'Klar. Modern. Schnell.', 'Gebaut für Kunden.'];

  const typeText = (text, done) => {
    if (prefersReducedMotion) {
      typeTarget.textContent = text;
      done();
      return;
    }
    typeTarget.textContent = '';
    let i = 0;
    const step = () => {
      if (i <= text.length) {
        typeTarget.textContent = text.slice(0, i);
        i += 1;
        setTimeout(step, 55);
      } else {
        done();
      }
    };
    step();
  };

  const eraseText = (done) => {
    if (prefersReducedMotion) { done(); return; }
    const step = () => {
      const current = typeTarget.textContent;
      if (current.length > 0) {
        typeTarget.textContent = current.slice(0, -1);
        setTimeout(step, 30);
      } else {
        done();
      }
    };
    step();
  };

  const runBuildCycle = () => {
    [blockNav, blockHero, blockImg].forEach((el) => el.classList.remove('is-visible'));
    typeTarget.textContent = '';

    setTimeout(() => blockNav.classList.add('is-visible'), 300);
    setTimeout(() => blockHero.classList.add('is-visible'), 900);
    setTimeout(() => {
      typeText(headlines[Math.floor(Math.random() * headlines.length)], () => {
        setTimeout(() => blockImg.classList.add('is-visible'), 400);
        setTimeout(() => {
          eraseText(() => {
            setTimeout(runBuildCycle, 900);
          });
        }, 2200);
      });
    }, 1500);
  };

  if (prefersReducedMotion) {
    [blockNav, blockHero, blockImg].forEach((el) => el.classList.add('is-visible'));
    typeTarget.textContent = headlines[0];
  } else {
    const buildObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        runBuildCycle();
        buildObserver.unobserve(entry.target);
      });
    }, { threshold: 0.3 });
    buildObserver.observe(buildCanvas);
  }
}

// ---------- Wave-Banner: reaktive Welle folgt dem Cursor ----------
const waveBanner = document.getElementById('wave-banner');
const wavePath = document.getElementById('wave-path');
const waveEdge = document.getElementById('wave-edge');

if (waveBanner && wavePath && waveEdge && !prefersReducedMotion) {
  const basePoints = [
    [0, 260], [300, 160], [500, 340], [800, 240], [1000, 180], [1100, 210], [1200, 170],
  ];

  const buildPath = (offsetX, offsetY) => {
    const p = basePoints.map(([x, y], i) => {
      const wobble = Math.sin(i * 1.7) * offsetY;
      return [x + offsetX * (i % 2 === 0 ? 1 : -1) * 0.4, y + wobble];
    });
    return `M${p[0][0]},${p[0][1]} C${p[1][0]},${p[1][1]} ${p[2][0]},${p[2][1]} ${p[3][0]},${p[3][1]} C${p[4][0]},${p[4][1]} ${p[5][0]},${p[5][1]} ${p[6][0]},${p[6][1]}`;
  };

  waveBanner.addEventListener('mousemove', (e) => {
    const rect = waveBanner.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const d = buildPath(x * 60, y * 50);
    waveEdge.setAttribute('d', d);
    wavePath.setAttribute('d', `${d} L1200,420 L0,420 Z`);
  });

  waveBanner.addEventListener('mouseleave', () => {
    const d = buildPath(0, 0);
    waveEdge.setAttribute('d', d);
    wavePath.setAttribute('d', `${d} L1200,420 L0,420 Z`);
  });
}

// Tilt-Effekt (3D) für Karten bei Mausbewegung
if (!prefersReducedMotion) {
  document.querySelectorAll('.tilt').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(700px) rotateX(${y * -8}deg) rotateY(${x * 8}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// Flip-Card "Über mich" — Klick zeigt Text statt Foto
const flipCard = document.getElementById('flip-card');
if (flipCard) {
  flipCard.addEventListener('click', () => {
    const isFlipped = flipCard.classList.toggle('is-flipped');
    flipCard.setAttribute('aria-expanded', String(isFlipped));
  });
}

// Cursor-reaktiver Spotlight im Hero
const heroSection = document.getElementById('hero');
const heroSpot = document.getElementById('hero-spot');

if (heroSection && heroSpot && !prefersReducedMotion) {
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    heroSpot.style.setProperty('--spot-x', `${x}%`);
    heroSpot.style.setProperty('--spot-y', `${y}%`);
    heroSpot.classList.add('is-active');
  });
  heroSection.addEventListener('mouseleave', () => heroSpot.classList.remove('is-active'));
}

// Showcase-Szene im Hero: Orb + Glas-Splitter mit Tiefenversatz (Parallax)
const heroShowcase = document.getElementById('hero-showcase');

if (heroShowcase && !prefersReducedMotion) {
  const depthEls = Array.from(heroShowcase.querySelectorAll('[data-depth]'));

  heroShowcase.addEventListener('mousemove', (e) => {
    const rect = heroShowcase.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    depthEls.forEach((el) => {
      const depth = Number(el.dataset.depth) || 0.5;
      el.style.translate = `${x * 44 * depth}px ${y * 44 * depth}px`;
    });
  });

  heroShowcase.addEventListener('mouseleave', () => {
    depthEls.forEach((el) => { el.style.translate = '0px 0px'; });
  });
}

// Magnetic buttons — leicht zum Cursor hingezogen
if (!prefersReducedMotion) {
  document.querySelectorAll('.magnetic').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
}

// Riesige Footer-Type reagiert auf die Mausposition (leichter Parallax-Shift)
const footerGiant = document.querySelector('.site-footer__giant span');
const siteFooter = document.querySelector('.site-footer');

if (footerGiant && siteFooter && !prefersReducedMotion) {
  siteFooter.addEventListener('mousemove', (e) => {
    const rect = siteFooter.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 28;
    footerGiant.style.transform = `translateX(${x}px)`;
  });
  siteFooter.addEventListener('mouseleave', () => {
    footerGiant.style.transform = 'translateX(0)';
  });
}

// ---------- Scroll-Fortschrittsbalken + Scroll-Parallax (Ambient-Blobs, Hero-Szene) ----------
const scrollProgress = document.getElementById('scroll-progress');
const ambientBlobs = document.querySelectorAll('.ambient-blob');
const showcaseForScroll = document.getElementById('hero-showcase');

{
  let ticking = false;

  const onScroll = () => {
    const doc = document.documentElement;
    const scrollY = window.scrollY;
    const max = doc.scrollHeight - doc.clientHeight;
    const pct = max > 0 ? (scrollY / max) * 100 : 0;

    if (scrollProgress) scrollProgress.style.width = `${pct}%`;

    if (!prefersReducedMotion) {
      ambientBlobs.forEach((blob, i) => {
        const speed = 0.08 + i * 0.05;
        blob.style.translate = `0 ${scrollY * speed}px`;
      });
      if (showcaseForScroll) {
        const heroRect = document.getElementById('hero').getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, -heroRect.top / (heroRect.height || 1)));
        showcaseForScroll.style.transform = `translateY(${progress * -60}px) scale(${1 - progress * 0.08})`;
        showcaseForScroll.style.opacity = String(1 - progress * 0.6);
      }
    }
  };

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      onScroll();
      ticking = false;
    });
  });
  onScroll();
}

// ---------- Bewertungen (n8n) ----------
const REVIEW_POST_ENDPOINT = 'https://nicklaurin.app.n8n.cloud/webhook/bewertung-abgeben';
const REVIEW_GET_ENDPOINT = 'https://nicklaurin.app.n8n.cloud/webhook/bewertungen-anzeigen';

function renderStars(n) {
  const full = Math.max(0, Math.min(5, Math.round(Number(n) || 0)));
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

// --- Bewertung abschicken (bewertung.html) ---
const reviewForm = document.getElementById('review-form');
const reviewSuccess = document.getElementById('review-success');
const reviewError = document.getElementById('review-error');

if (reviewForm) {
  reviewForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!reviewForm.checkValidity()) {
      reviewForm.reportValidity();
      return;
    }

    const submitBtn = reviewForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Wird gesendet …';
    }
    if (reviewError) reviewError.hidden = true;

    const checkedStar = reviewForm.querySelector('input[name="sterne"]:checked');
    const payload = {
      name: reviewForm.elements.name.value.trim(),
      firma: reviewForm.elements.firma ? reviewForm.elements.firma.value.trim() : '',
      sterne: checkedStar ? Number(checkedStar.value) : 0,
      text: reviewForm.elements.text.value.trim(),
    };

    try {
      const res = await fetch(REVIEW_POST_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Request failed: ' + res.status);
      reviewForm.hidden = true;
      reviewSuccess.hidden = false;
      reviewForm.reset();
    } catch (err) {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Bewertung absenden';
      }
      if (reviewError) reviewError.hidden = false;
    }
  });
}

// --- Freigegebene Bewertungen anzeigen (index.html) ---
const reviewsSection = document.getElementById('erfahrungen');
const reviewsGrid = document.getElementById('reviews-grid');

if (reviewsSection && reviewsGrid) {
  fetch(REVIEW_GET_ENDPOINT)
    .then((res) => (res.ok ? res.json() : []))
    .then((reviews) => {
      if (!Array.isArray(reviews) || reviews.length === 0) return;

      reviews.slice(0, 12).forEach((r) => {
        const card = document.createElement('figure');
        card.className = 'review-card';

        const stars = document.createElement('div');
        stars.className = 'review-card__stars';
        stars.setAttribute('aria-label', (Number(r.sterne) || 0) + ' von 5 Sternen');
        stars.textContent = renderStars(r.sterne);

        const quote = document.createElement('blockquote');
        quote.className = 'review-card__text';
        quote.textContent = r.text || '';

        const who = document.createElement('figcaption');
        who.className = 'review-card__who';
        const firma = (r.firma || '').trim();
        who.textContent = (r.name || 'Anonym') + (firma ? ' · ' + firma : '');

        card.appendChild(stars);
        card.appendChild(quote);
        card.appendChild(who);
        reviewsGrid.appendChild(card);
      });

      reviewsSection.hidden = false;
    })
    .catch(() => {});
}
