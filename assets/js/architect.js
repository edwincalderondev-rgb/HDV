/* ═══════════════════════════════════════════════════════════════════
   THE ARCHITECT — motor de recuperación + interfaz
   100 % client-side. Sin backend, sin API keys, sin dependencias.

   Pipeline:
     normalizar → tokenizar (stopwords ES + stemming ligero)
     → expandir sinónimos → puntuar TF-IDF sobre índice invertido
     → refuerzo por bigramas y por coincidencia exacta de tag
     → umbral de confianza → respuesta o fallback honesto
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const KB = window.ARCHITECT_KB;
  if (!KB) { console.error('[Architect] base de conocimiento no encontrada'); return; }

  /* ───────────────────────── NLP ───────────────────────── */

  const STOP = new Set(`a al algo algun alguna algunas alguno algunos ante antes aquel aquella aquello aqui asi aun
    aunque bien cada como con contra cual cuales cuando de del desde donde dos el ella ellas ellos en entre era eran
    es esa esas ese eso esos esta estan estas este esto estos fue fueron ha hace hacen hacia han hasta hay la las le
    les lo los mas me mi mis mucho muchos muy nada ni no nos nosotros o os otra otras otro otros para pero poco por
    porque que quien quienes se sea sean segun ser si sido sin sobre son su sus tambien tan tanto te tiene tienen
    todo todos tu tus un una unas uno unos usted ustedes va van vos y ya yo me dime dame cuentame sabes puedes podrias
    quiero necesito favor gracias hola oye acerca respecto tema cosa cosas persona el la`.split(/\s+/));

  /* sinónimos y variantes: la clave se expande a sus valores */
  const SYN = {
    sueldo: ['salario','remuneracion','paga','pago','ingreso','compensacion','honorario'],
    salario: ['sueldo','remuneracion','paga','pago','ingreso','compensacion'],
    ganar: ['cobrar','percibir','devengar','valer','sueldo','salario'],
    gana: ['cobra','percibe','devenga','vale','sueldo','salario'],
    plata: ['dinero','salario','sueldo'],
    dinero: ['plata','salario','sueldo'],
    millon: ['millones','salario','sueldo'],
    trabajo: ['empleo','cargo','puesto','labor','rol','ocupacion'],
    empresa: ['compania','organizacion','negocio','firma'],
    experiencia: ['trayectoria','recorrido','historial','antiguedad','años'],
    tecnologia: ['herramienta','stack','lenguaje','framework','tecnico'],
    programar: ['desarrollar','codificar','construir','implementar'],
    desarrollo: ['programacion','construccion','implementacion','software'],
    seguridad: ['ciberseguridad','proteccion','hardening','auditoria','vulnerabilidad'],
    ciberseguridad: ['seguridad','hardening','auditoria','vulnerabilidad','incidente'],
    hackeo: ['ataque','incidente','vulneracion','brecha','seguridad'],
    lider: ['liderazgo','jefe','coordinador','director','dirigir','mando'],
    liderar: ['dirigir','coordinar','gestionar','jefe','liderazgo'],
    equipo: ['personas','gente','grupo','colaboradores','equipos'],
    estudio: ['educacion','formacion','carrera','titulo','universidad','academico'],
    proyecto: ['trabajo','desarrollo','sistema','producto','proyectos'],
    dato: ['datos','informacion','base','bi','analitica'],
    ia: ['inteligencia','artificial','ai','chatbot','machine','learning'],
    bot: ['chatbot','asistente','architect','ia'],
    contacto: ['correo','email','telefono','whatsapp','contactar','comunicar'],
    senior: ['seniority','nivel','experto','avanzado'],
    contratar: ['contratacion','vincular','emplear','fichar','reclutar'],
    debilidad: ['defecto','limitacion','falencia','carencia','punto debil'],
    fuerte: ['fortaleza','virtud','ventaja','cualidad'],
    vr: ['realidad','virtual','inmersivo','xr','unity','metaverso'],
    diseno: ['diseño','grafico','creatividad','marca','branding','visual'],
    web: ['sitio','pagina','portal','website'],
    actual: ['ahora','hoy','presente','actualmente'],
    colibri: ['ave','pajaro','especie','sable','phainopeplus'],
    certificado: ['certificacion','soporte','documento','prueba','verificar','acreditar'],
    disponible: ['disponibilidad','libre','modalidad','remoto','presencial']
  };

  const normalize = (s) => String(s || '')
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')  // quitar acentos
    .replace(/[^a-z0-9ñ\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  /** Stemming ligero para español: plurales y sufijos frecuentes. */
  function stem(w) {
    if (w.length <= 3) return w;
    if (w.length > 6 && w.endsWith('mente')) return w.slice(0, -5);
    if (w.length > 6 && (w.endsWith('ciones') || w.endsWith('siones'))) return w.slice(0, -5) + 'on';
    if (w.length > 5 && (w.endsWith('cion') || w.endsWith('sion'))) return w.slice(0, -3) + 'on';
    if (w.length > 5 && (w.endsWith('idades') || w.endsWith('edades'))) return w.slice(0, -4);
    if (w.length > 4 && w.endsWith('es') && !/[aeiou]es$/.test(w)) return w.slice(0, -2);
    if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) return w.slice(0, -1);
    return w;
  }

  function tokenize(text, { keepStop = false } = {}) {
    return normalize(text).split(' ')
      .filter(w => w && w.length > 1 && (keepStop || !STOP.has(w)))
      .map(stem);
  }

  function expand(tokens) {
    const out = new Set(tokens);
    tokens.forEach(t => {
      const syn = SYN[t];
      if (syn) syn.forEach(s => tokenize(s).forEach(x => out.add(x)));
    });
    return [...out];
  }

  const bigrams = (tokens) => tokens.slice(0, -1).map((t, i) => t + '_' + tokens[i + 1]);
  const stripHTML = (html) => String(html).replace(/<[^>]+>/g, ' ');

  /* ───────────────────────── ÍNDICE ───────────────────────── */

  const WEIGHT = { tag: 4.0, q: 2.4, body: 1.0, bigram: 2.0 };
  const docs = [];

  KB.entries.forEach(e => {
    const tf = Object.create(null);
    const add = (tok, w) => { tf[tok] = (tf[tok] || 0) + w; };

    (e.tags || []).forEach(t => {
      const toks = tokenize(t);
      toks.forEach(x => add(x, WEIGHT.tag));
      bigrams(toks).forEach(b => add(b, WEIGHT.bigram * 1.5));
    });
    (e.q || []).forEach(t => {
      const toks = tokenize(t);
      toks.forEach(x => add(x, WEIGHT.q));
      bigrams(toks).forEach(b => add(b, WEIGHT.bigram));
    });
    tokenize(stripHTML(e.a)).forEach(x => add(x, WEIGHT.body));

    // normalizar longitud del documento
    let norm = 0;
    for (const k in tf) norm += tf[k] * tf[k];
    docs.push({ entry: e, tf, norm: Math.sqrt(norm) || 1, tagSet: new Set((e.tags || []).flatMap(t => tokenize(t))) });
  });

  // IDF
  const df = Object.create(null);
  docs.forEach(d => { for (const k in d.tf) df[k] = (df[k] || 0) + 1; });
  const N = docs.length;
  const idf = (t) => Math.log(1 + N / (1 + (df[t] || 0))) + 1;

  /* ───────────────────────── BÚSQUEDA ───────────────────────── */

  function search(query) {
    const raw = tokenize(query);
    if (!raw.length) return [];
    const toks = expand(raw);
    const qBi = bigrams(raw);

    const qtf = Object.create(null);
    toks.forEach(t => { qtf[t] = (qtf[t] || 0) + 1; });
    raw.forEach(t => { qtf[t] = (qtf[t] || 0) + 0.8; });   // los originales pesan más que los sinónimos
    qBi.forEach(b => { qtf[b] = (qtf[b] || 0) + 1.6; });

    let qnorm = 0;
    for (const k in qtf) qnorm += Math.pow(qtf[k] * idf(k), 2);
    qnorm = Math.sqrt(qnorm) || 1;

    // Compuerta de vocabulario: si buena parte de la pregunta no existe en el corpus,
    // probablemente es un tema ajeno al perfil. Mejor admitirlo que responder con confianza.
    const known = raw.filter(t => df[t]).length / raw.length;
    const oov = (raw.length >= 2 && known < 0.55) ? 0.30 : 1;

    const hits = docs.map(d => {
      let dot = 0;
      for (const k in qtf) {
        const w = d.tf[k];
        if (w) dot += (qtf[k] * idf(k)) * (w * idf(k));
      }
      let score = dot / (qnorm * d.norm);

      // refuerzo: coincidencia exacta de término con un tag declarado
      const tagHits = raw.filter(t => d.tagSet.has(t)).length;
      if (tagHits) score *= (1 + 0.20 * tagHits);

      // cobertura: qué proporción de la pregunta aparece realmente en este documento
      const covered = raw.filter(t => d.tf[t]).length / raw.length;
      score *= Math.pow(0.30 + 0.70 * covered, 1.4) * oov;

      return { entry: d.entry, score };
    });

    return hits.filter(h => h.score > 0).sort((a, b) => b.score - a.score);
  }

  /* ───────────────────────── INTENCIONES ───────────────────────── */

  const normQ = (q) => ' ' + normalize(q) + ' ';

  function salaryIntent(q) {
    const n = normQ(q);
    return KB.salary.triggers.some(t => n.includes(' ' + normalize(t) + ' ') || n.includes(normalize(t)));
  }

  function smalltalkIntent(q) {
    const n = normalize(q);
    const words = n.split(' ').filter(Boolean);
    for (const s of KB.smalltalk) {
      for (const k of s.k) {
        const nk = normalize(k);
        if (n === nk) return s;
        if (words.length <= 6 && n.includes(nk)) return s;
      }
    }
    return null;
  }

  const THRESHOLD = 0.085;

  /** Punto de entrada: devuelve { html, src, related[] } */
  function ask(question) {
    const q = (question || '').trim();
    if (!q) return { html: '<p>Escribe una pregunta y busco la respuesta en su perfil.</p>', related: [] };

    if (salaryIntent(q)) {
      return { html: KB.salary.answer, src: KB.salary.src, related: ['¿Por qué es un perfil senior?', '¿Ha liderado equipos?'] };
    }

    const st = smalltalkIntent(q);
    if (st) return { html: st.a, related: KB.meta.suggestions.slice(0, 3) };

    const hits = search(q);
    const top = hits[0];

    if (!top || top.score < THRESHOLD) {
      return {
        html: `<p>No tengo esa información en mi base de conocimiento, y prefiero decírtelo a inventar una respuesta.</p>
               <p>Sí puedo contarte sobre su <b>trayectoria</b>, sus <b>proyectos</b>, su <b>stack técnico</b>,
               su experiencia en <b>ciberseguridad</b> y <b>liderazgo</b>, o las <b>referencias de mercado</b> para su perfil.</p>
               <p>Si necesitas algo muy específico, lo mejor es preguntárselo directamente:
               <b>edwinaguilera777@gmail.com</b>.</p>`,
        related: KB.meta.suggestions.slice(0, 4)
      };
    }

    const related = hits.slice(1, 4)
      .filter(h => h.score > THRESHOLD * 0.75)
      .map(h => (h.entry.q && h.entry.q[0]) ? cap(h.entry.q[0]) : null)
      .filter(Boolean);

    return { html: top.entry.a, src: top.entry.src, related, id: top.entry.id, score: top.score };
  }

  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1) + (/[?.!]$/.test(s) ? '' : '?');

  /* ═══════════════════════════════════════════════════════════
     INTERFAZ
     ═══════════════════════════════════════════════════════════ */

  const $ = (s, r = document) => r.querySelector(s);
  const panel = $('#arch'), log = $('#archLog'), form = $('#archForm'),
        input = $('#archInput'), sugg = $('#archSugg'), fab = $('#archFab');
  if (!panel || !log) return;

  let opened = false, busy = false, lastFocus = null;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function scrollDown() { log.scrollTop = log.scrollHeight; }

  function addUser(text) {
    const el = document.createElement('div');
    el.className = 'msg msg-user';
    const b = document.createElement('div');
    b.className = 'bubble';
    b.textContent = text;                 // textContent: nada de HTML del usuario
    el.appendChild(b);
    log.appendChild(el);
    scrollDown();
  }

  function addBot(html, src) {
    const el = document.createElement('div');
    el.className = 'msg msg-bot';
    const b = document.createElement('div');
    b.className = 'bubble';
    b.innerHTML = html;
    if (src) {
      const s = document.createElement('div');
      s.className = 'msg-src';
      s.innerHTML = '<b>Fuentes:</b> ' + src;
      b.appendChild(s);
    }
    el.appendChild(b);
    log.appendChild(el);
    return { el, bubble: b };
  }

  /**
   * Revela el contenido bloque a bloque. La animación vive en CSS con
   * `animation-fill-mode: backwards`, de modo que el estado final siempre es
   * "visible": si la animación no llega a correr, el texto se ve igual.
   */
  function revealProgressive(bubble) {
    scrollDown();
    if (reduceMotion) return Promise.resolve();
    bubble.classList.add('reveal-blocks');
    const total = 90 + bubble.children.length * 110;
    return new Promise(res => {
      const t = setInterval(scrollDown, 110);
      setTimeout(() => { clearInterval(t); scrollDown(); res(); }, total);
    });
  }

  function showTyping() {
    const el = document.createElement('div');
    el.className = 'msg msg-bot';
    el.innerHTML = '<div class="typing"><i></i><i></i><i></i></div>';
    log.appendChild(el);
    scrollDown();
    return el;
  }

  function renderSuggestions(list) {
    sugg.innerHTML = '';
    (list && list.length ? list : KB.meta.suggestions).slice(0, 6).forEach(text => {
      const b = document.createElement('button');
      b.className = 'sugg';
      b.type = 'button';
      b.textContent = text;
      b.addEventListener('click', () => { if (!busy) handle(text); });
      sugg.appendChild(b);
    });
  }

  async function handle(question) {
    if (busy) return;
    busy = true;
    input.value = '';
    addUser(question);
    sugg.innerHTML = '';

    const typing = showTyping();
    const res = ask(question);
    const delay = reduceMotion ? 120 : 420 + Math.min(620, res.html.length * 0.55);
    await new Promise(r => setTimeout(r, delay));
    typing.remove();

    const { bubble } = addBot(res.html, res.src);
    await revealProgressive(bubble);
    renderSuggestions(res.related && res.related.length ? res.related : null);
    busy = false;
    scrollDown();
  }

  function open() {
    if (opened) return;
    opened = true;
    lastFocus = document.activeElement;
    panel.hidden = false;
    fab.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    if (!log.children.length) {
      const { bubble } = addBot(KB.meta.greeting);
      revealProgressive(bubble);
      renderSuggestions(null);
    }
    setTimeout(() => input.focus(), 260);
  }

  function close() {
    if (!opened) return;
    opened = false;
    panel.hidden = true;
    fab.classList.remove('is-open');
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  /* eventos */
  document.querySelectorAll('[data-open-architect]').forEach(b => b.addEventListener('click', open));
  document.querySelectorAll('[data-arch-close]').forEach(b => b.addEventListener('click', close));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = input.value.trim();
    if (v) handle(v);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && opened) { close(); }
  });

  // mantener el foco dentro del panel mientras está abierto
  panel.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || !opened) return;
    const f = panel.querySelectorAll('button, input, a[href]');
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* API pública (la usa el command palette) */
  window.Architect = { open, close, ask, search, handle };

  console.info(`%c The Architect %c ${N} entradas indexadas · ${Object.keys(df).length} términos `,
    'background:#5CC8FF;color:#07080B;font-weight:700;border-radius:3px 0 0 3px;padding:2px 6px',
    'background:#0E1118;color:#9BA4B7;border-radius:0 3px 3px 0;padding:2px 6px');
})();
