/* ═══════════════════════════════════════════════════════════════════
   Cambio de idioma ES ⇄ EN — solo para el contenido del index.
   El chatbot y los documentos descargables siguen en español.

   El español no se duplica en ningún archivo: vive en el HTML y se
   toma una instantánea al cargar. i18n-en.js solo aporta el inglés.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var STORE = 'ebc-lang';
  var root = document.documentElement;
  var EN = window.I18N_EN || {};
  var ES = Object.create(null);
  var lang = 'es';

  /* ── instantánea del español tal como vino en el HTML ── */
  function snapshot() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      ES[el.getAttribute('data-i18n')] = el.innerHTML;
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(',').forEach(function (pair) {
        var i = pair.indexOf(':');
        var attr = pair.slice(0, i), key = pair.slice(i + 1);
        ES[key] = el.getAttribute(attr);
      });
    });
    ES['head.title'] = document.title;
    ES['head.description'] = meta('name', 'description');
    ES['head.ogTitle'] = meta('property', 'og:title');
    ES['head.ogDescription'] = meta('property', 'og:description');
  }

  function meta(kind, name, value) {
    var el = document.head.querySelector('meta[' + kind + '="' + name + '"]');
    if (!el) return null;
    if (value != null) el.setAttribute('content', value);
    return el.getAttribute('content');
  }

  /* ── aplicar un idioma ── */
  function apply(next) {
    var dict = next === 'en' ? EN : ES;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var v = dict[el.getAttribute('data-i18n')];
      if (v != null) el.innerHTML = v;
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(',').forEach(function (pair) {
        var i = pair.indexOf(':');
        var attr = pair.slice(0, i), key = pair.slice(i + 1);
        var v = dict[key];
        if (v != null) el.setAttribute(attr, v);
      });
    });

    if (dict['head.title']) document.title = dict['head.title'];
    if (dict['head.description']) meta('name', 'description', dict['head.description']);
    if (dict['head.ogTitle']) meta('property', 'og:title', dict['head.ogTitle']);
    if (dict['head.ogDescription']) meta('property', 'og:description', dict['head.ogDescription']);

    root.setAttribute('lang', next);
    lang = next;

    // el pie se reescribe entero: hay que reponer el año
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();

    // los botones del selector
    document.querySelectorAll('[data-lang]').forEach(function (b) {
      var on = b.getAttribute('data-lang') === next;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', String(on));
    });

    // el ancho de los enlaces cambió: que el indicador del menú se recoloque
    window.dispatchEvent(new Event('resize'));
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: next } }));
  }

  function set(next, persist) {
    if (next !== 'en' && next !== 'es') return;
    if (next === lang) return;
    apply(next);
    if (persist !== false) {
      try { localStorage.setItem(STORE, next); } catch (e) {}
      try {                       // en file:// o contextos restringidos esto puede fallar
        var u = new URL(location.href);
        if (next === 'en') u.searchParams.set('lang', 'en');
        else u.searchParams.delete('lang');
        history.replaceState(null, '', u);
      } catch (e) {}
    }
  }

  /* ── idioma inicial: URL › preferencia guardada › navegador ── */
  function initial() {
    var fromUrl = new URLSearchParams(location.search).get('lang');
    if (fromUrl === 'en' || fromUrl === 'es') return fromUrl;
    try {
      var saved = localStorage.getItem(STORE);
      if (saved === 'en' || saved === 'es') return saved;
    } catch (e) {}
    var nav = (navigator.language || 'es').toLowerCase();
    return nav.indexOf('es') === 0 ? 'es' : 'en';
  }

  function boot() {
    snapshot();
    document.querySelectorAll('[data-lang]').forEach(function (b) {
      b.addEventListener('click', function () { set(b.getAttribute('data-lang')); });
    });
    var start = initial();
    if (start !== 'es') apply(start);
    else apply('es');           // deja los botones y el atributo lang en orden
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  window.I18N = {
    get lang() { return lang; },
    set: set,
    t: function (key, fallback) {
      var dict = lang === 'en' ? EN : ES;
      return dict[key] != null ? dict[key] : (fallback != null ? fallback : key);
    }
  };
})();
