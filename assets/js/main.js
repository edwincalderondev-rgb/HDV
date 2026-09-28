/* ═══════════════════════════════════════════════════════════════════
   Portafolio — interacciones
   Vanilla JS. Sin dependencias. Respeta prefers-reduced-motion.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ───────────────────────── TEMA ───────────────────────── */
  const root = document.documentElement;
  const STORE = 'ebc-theme';

  function setTheme(t, persist) {
    root.setAttribute('data-theme', t);
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', t === 'dark' ? '#07080B' : '#FAFBFD');
    if (persist) { try { localStorage.setItem(STORE, t); } catch (_) {} }
  }

  (function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem(STORE); } catch (_) {}
    if (saved) setTheme(saved, false);
    else setTheme(window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark', false);
  })();

  $('#themeBtn').addEventListener('click', () => {
    setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
  });

  /* ───────────────────────── AÑO ───────────────────────── */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ───────────────────────── NAV ───────────────────────── */
  const nav = $('#nav'), burger = $('#burger'), links = $('.nav-links');

  const onScrollNav = () => nav.classList.toggle('is-stuck', window.scrollY > 24);
  onScrollNav();

  burger.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
  });
  $$('.nav-links a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  }));
  document.addEventListener('click', (e) => {
    if (!links.contains(e.target) && !burger.contains(e.target)) {
      links.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  /* scroll-spy */
  const sections = $$('main section[id]');
  const navMap = new Map($$('.nav-links a').map(a => [a.getAttribute('href').slice(1), a]));

  /* ───────────────────────── PROGRESO ───────────────────────── */
  const bar = $('.scroll-progress i');

  function onScroll() {
    onScrollNav();
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';

    // scroll-spy
    const y = window.scrollY + window.innerHeight * 0.32;
    let current = null;
    for (const s of sections) {
      if (s.offsetTop <= y) current = s.id;
    }
    navMap.forEach((a, id) => a.classList.toggle('is-active', id === current));

    // relleno de la línea de tiempo
    if (tlRail && tlWrap) {
      const r = tlWrap.getBoundingClientRect();
      const p = (window.innerHeight * 0.6 - r.top) / r.height;
      tlRail.style.height = Math.max(0, Math.min(1, p)) * 100 + '%';
    }
  }

  const tlWrap = $('.tl'), tlRail = $('#tlFill');

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { onScroll(); ticking = false; });
  }, { passive: true });
  onScroll();

  /* ───────────────────────── REVEAL ───────────────────────── */
  if ('IntersectionObserver' in window && !RM) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-in');
        if (en.target.hasAttribute('data-count') || en.target.querySelector('[data-count]')) countUp(en.target);
        io.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    $$('.reveal, .tl-item').forEach(el => io.observe(el));
  } else {
    $$('.reveal, .tl-item').forEach(el => el.classList.add('is-in'));
    $$('[data-count]').forEach(el => el.textContent = el.dataset.count + (el.dataset.suffix || ''));
  }

  /* contadores */
  function countUp(scope) {
    const targets = scope.hasAttribute('data-count') ? [scope] : $$('[data-count]', scope);
    targets.forEach(el => {
      if (el.dataset.done) return;
      el.dataset.done = '1';
      const end = parseFloat(el.dataset.count) || 0;
      const suffix = el.dataset.suffix || '';
      if (RM) { el.textContent = end + suffix; return; }
      const dur = 1250, t0 = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(end * eased) + (p === 1 ? suffix : '');
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  /* ───────────────────────── FILTROS DE STACK ───────────────────────── */
  const filters = $$('.filter'), cards = $$('#stackGrid .sk');
  filters.forEach(f => f.addEventListener('click', () => {
    filters.forEach(x => { x.classList.remove('is-on'); x.setAttribute('aria-selected', 'false'); });
    f.classList.add('is-on'); f.setAttribute('aria-selected', 'true');
    const cat = f.dataset.filter;
    cards.forEach(c => c.classList.toggle('is-off', cat !== 'all' && c.dataset.cat !== cat));
  }));

  /* ───────────────── FOCO QUE SIGUE AL PUNTERO (tarjetas) ───────────── */
  if (!RM && window.matchMedia('(hover:hover)').matches) {
    $$('.proj').forEach(card => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });

    /* brillo del cursor */
    const glow = $('.cursor-glow');
    let gx = innerWidth / 2, gy = innerHeight / 2, cx = gx, cy = gy;
    addEventListener('pointermove', (e) => { gx = e.clientX; gy = e.clientY; }, { passive: true });
    (function loop() {
      cx += (gx - cx) * 0.085; cy += (gy - cy) * 0.085;
      glow.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();
  }

  /* ───────────────────────── HERO: CONSTELACIÓN ───────────────────────── */
  (function heroCanvas() {
    const cv = $('#heroCanvas');
    if (!cv || RM) return;
    const ctx = cv.getContext('2d', { alpha: true });
    let w = 0, h = 0, dpr = 1, nodes = [], raf = null, alive = true;

    function resize() {
      const r = cv.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = Math.min(72, Math.max(24, Math.round((w * h) / 21000)));
      nodes = Array.from({ length: density }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.5 + 0.7
      }));
    }

    const LINK = 132;
    function draw() {
      if (!alive) return;
      ctx.clearRect(0, 0, w, h);
      const light = root.getAttribute('data-theme') === 'light';
      const stroke = light ? '11,119,199' : '92,200,255';
      const dot = light ? '109,69,224' : '167,139,250';

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h) a.vy *= -1;

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const o = (1 - Math.sqrt(d2) / LINK) * 0.34;
            ctx.strokeStyle = `rgba(${stroke},${o})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        ctx.fillStyle = `rgba(${dot},.5)`;
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();
    addEventListener('resize', () => { clearTimeout(resize._t); resize._t = setTimeout(resize, 180); });

    // pausar cuando el hero sale de pantalla (ahorra batería)
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => {
        if (e.isIntersecting && !alive) { alive = true; draw(); }
        else if (!e.isIntersecting && alive) { alive = false; cancelAnimationFrame(raf); }
      }, { threshold: 0 }).observe(cv);
    }
  })();

  /* ───────────────────────── MARQUESINA (duplicar) ───────────────────────── */
  (function () {
    const track = $('.marquee-track');
    if (track) track.innerHTML += track.innerHTML;
  })();

  /* ───────────────────────── COMMAND PALETTE ───────────────────────── */
  (function palette() {
    const box = $('#cmd'), inp = $('#cmdInput'), list = $('#cmdList');
    if (!box) return;

    const ITEMS = [
      { ic: '◆', t: 'Perfil',                s: 'Dos ingenierías, una sola cadena de valor', go: '#perfil' },
      { ic: '◆', t: 'Caso Petroil',          s: 'Un área de TI de una sola persona',        go: '#caso' },
      { ic: '◆', t: 'Trayectoria',           s: 'Once años, sin pausas',                    go: '#trayectoria' },
      { ic: '◆', t: 'Proyectos',             s: 'Software que está en producción',          go: '#proyectos' },
      { ic: '◆', t: 'Stack técnico',         s: 'Tecnologías puestas en producción',        go: '#stack' },
      { ic: '◆', t: 'Cargos',                s: 'A qué cargos corresponde el perfil',       go: '#valor' },
      { ic: '◆', t: 'Contacto',              s: 'Correo, WhatsApp, LinkedIn y GitHub',      go: '#contacto' },
      { ic: '↓', t: 'Descargar hoja de vida (PDF)', s: 'Versión maquetada, 4 páginas',      href: 'assets/docs/HDV_Edwin_Calderon_Senior.pdf' },
      { ic: '↓', t: 'Descargar hoja de vida (Word)', s: 'Versión editable',                 href: 'assets/docs/HDV_Edwin_Calderon_Senior.docx' },
      { ic: '↓', t: 'Portafolio de diseño',  s: 'Marca, contenido digital y XR',            href: 'assets/docs/Portafolio_Diseno_y_Contenido.pdf' },
      { ic: '↓', t: 'Certificado laboral',   s: 'Universidad del Magdalena',                href: 'assets/docs/Certificado_Universidad_del_Magdalena.pdf' },
      { ic: '✉', t: 'Escribir un correo',    s: 'edwinaguilera777@gmail.com',               href: 'mailto:edwinaguilera777@gmail.com' },
      { ic: '✆', t: 'Abrir WhatsApp',        s: '+57 301 409 9377',                         href: 'https://wa.me/573014099377' },
      { ic: '✦', t: 'Preguntar a The Architect', s: 'Asistente de perfil',                  act: () => window.Architect && window.Architect.open() },
      { ic: '◐', t: 'Cambiar tema',          s: 'Claro / oscuro',                           act: () => $('#themeBtn').click() }
    ];

    let sel = 0, shown = ITEMS;

    const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

    function render(q) {
      const nq = norm(q).trim();
      shown = !nq ? ITEMS : ITEMS.filter(i => norm(i.t + ' ' + i.s).includes(nq));

      // si el usuario escribe algo que no es navegación, ofrecer preguntárselo al asistente
      if (nq && !shown.length) {
        shown = [{ ic: '✦', t: `Preguntar: «${q.trim()}»`, s: 'The Architect buscará la respuesta',
                   act: () => { window.Architect && window.Architect.open();
                                setTimeout(() => window.Architect.handle(q.trim()), 380); } }];
      }
      sel = 0;
      list.innerHTML = '';
      if (!shown.length) { list.innerHTML = '<li class="cmd-empty">Sin resultados</li>'; return; }
      shown.forEach((i, n) => {
        const li = document.createElement('li');
        li.className = 'cmd-item' + (n === 0 ? ' is-sel' : '');
        li.setAttribute('role', 'option');
        li.innerHTML = `<span class="cmd-ic">${i.ic}</span>
                        <span class="cmd-tx"><b></b><span></span></span>`;
        li.querySelector('b').textContent = i.t;
        li.querySelector('.cmd-tx span').textContent = i.s;
        li.addEventListener('click', () => run(i));
        li.addEventListener('mouseenter', () => { sel = n; mark(); });
        list.appendChild(li);
      });
    }

    const mark = () => $$('.cmd-item', list).forEach((el, n) => el.classList.toggle('is-sel', n === sel));

    function run(i) {
      close();
      if (i.act) { i.act(); return; }
      if (i.href) {
        const a = document.createElement('a');
        a.href = i.href;
        if (/^https?:|^mailto:/.test(i.href)) { a.target = '_blank'; a.rel = 'noopener'; }
        else a.download = '';
        document.body.appendChild(a); a.click(); a.remove();
        return;
      }
      if (i.go) {
        const t = $(i.go);
        if (t) t.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'start' });
      }
    }

    function open() { box.hidden = false; inp.value = ''; render(''); setTimeout(() => inp.focus(), 40); }
    function close() { box.hidden = true; }

    $('#cmdOpen').addEventListener('click', open);
    $$('[data-cmd-close]').forEach(b => b.addEventListener('click', close));
    inp.addEventListener('input', () => render(inp.value));

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); box.hidden ? open() : close(); return; }
      if (box.hidden) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); sel = (sel + 1) % shown.length; mark(); ensure(); }
      else if (e.key === 'ArrowUp')   { e.preventDefault(); sel = (sel - 1 + shown.length) % shown.length; mark(); ensure(); }
      else if (e.key === 'Enter')     { e.preventDefault(); if (shown[sel]) run(shown[sel]); }
    });

    function ensure() {
      const el = $$('.cmd-item', list)[sel];
      if (el) el.scrollIntoView({ block: 'nearest' });
    }
  })();

  /* ───────────── abrir el asistente con ?ask= o #architect ───────────── */
  (function deepLink() {
    const p = new URLSearchParams(location.search).get('ask');
    if (location.hash === '#architect' || p) {
      setTimeout(() => {
        if (!window.Architect) return;
        window.Architect.open();
        if (p) setTimeout(() => window.Architect.handle(p), 500);
      }, 700);
    }
  })();

})();
