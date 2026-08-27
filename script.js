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

const heroGlow = document.querySelector('.hero__glow');

if (heroGlow && !prefersReducedMotion) {
  // Parallax on hero background glow while scrolling (scroll-driven, not cursor-driven)
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const offset = window.scrollY * 0.15;
      heroGlow.style.transform = `translateY(${offset}px)`;
      ticking = false;
    });
  });
}

// ---------- Conversation demo (Leistungen) — message pops in, gets processed, reply pops in, both fade out, repeat ----------
const convo = document.querySelector('.convo');

if (convo) {
  const convoIn = document.getElementById('convo-in');
  const convoOut = document.getElementById('convo-out');
  const convoInDot = document.getElementById('convo-in-dot');
  const convoOutDot = document.getElementById('convo-out-dot');

  const convoPairs = [
    {
      time: '14:02',
      in: 'Ich habe Interesse an Ihrem Angebot, was sind die nächsten Schritte?',
      out: 'Danke für Ihre Anfrage — ein passender Ansprechpartner meldet sich innerhalb eines Werktags.',
    },
    {
      time: '09:47',
      in: 'Können Sie mir ein unverbindliches Angebot erstellen?',
      out: 'Gerne — dafür brauche ich zwei kurze Angaben, die ich Ihnen direkt per E-Mail zuschicke.',
    },
    {
      time: '16:15',
      in: 'Kann ich direkt einen Termin buchen?',
      out: 'Klar — wählen Sie einfach einen freien Slot im Kalender, ganz ohne Rückfrage.',
    },
  ];

  const fillMessage = (el, time, text) => {
    el.querySelector('.convo__time').textContent = time;
    el.querySelector('p').textContent = text;
  };

  if (prefersReducedMotion) {
    const first = convoPairs[0];
    fillMessage(convoIn, first.time, first.in);
    fillMessage(convoOut, first.time, first.out);
    convoIn.classList.add('is-active');
    convoOut.classList.add('is-active');
    convoInDot.classList.add('is-active');
    convoOutDot.classList.add('is-active');
  } else {
    let index = 0;

    const runCycle = () => {
      const pair = convoPairs[index];
      fillMessage(convoIn, pair.time, pair.in);
      fillMessage(convoOut, pair.time, pair.out);

      convoIn.classList.add('is-active');
      convoInDot.classList.add('is-active');
      setTimeout(() => {
        convoOut.classList.add('is-active');
        convoOutDot.classList.add('is-active');
      }, 700);
      setTimeout(() => {
        convoIn.classList.remove('is-active');
        convoOut.classList.remove('is-active');
        convoInDot.classList.remove('is-active');
        convoOutDot.classList.remove('is-active');
      }, 2600);
      setTimeout(() => {
        index = (index + 1) % convoPairs.length;
        runCycle();
      }, 3100);
    };

    const convoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        runCycle();
        convoObserver.unobserve(entry.target);
      });
    }, { threshold: 0.3 });

    convoObserver.observe(convo);
  }
}
