# Edwin Belisario Calderón Aguilera — Portafolio profesional

Sitio personal de **Edwin Belisario Calderón Aguilera**, Ingeniero de Sistemas Senior e Ingeniero
Industrial. Incluye trayectoria, proyectos, stack técnico, referencias de mercado y
**«The Architect»**, un asistente conversacional que responde preguntas sobre el perfil.

🔗 **https://edwincalderonaguilera.github.io/Hoja-De-Vida/**

---

## Qué tiene de particular

Está construido **a mano, sin frameworks, sin bundler y sin una sola dependencia de terceros**.
Todo lo que se ve es HTML, CSS y JavaScript vanilla.

### The Architect — asistente sin backend

El chat del sitio no es una integración con una API de IA. Es un **motor de recuperación de
información escrito desde cero**:

| Etapa | Implementación |
|---|---|
| Normalización | Minúsculas, eliminación de acentos y signos |
| Tokenización | Filtrado de *stopwords* del español + *stemming* ligero (plurales, `-ción`, `-mente`) |
| Expansión | Diccionario de sinónimos del dominio (`sueldo` → `salario`, `remuneración`, `paga`…) |
| Indexación | Índice invertido con pesos por campo (tags ×4, preguntas ×2.4, cuerpo ×1) |
| Puntuación | TF-IDF + similitud coseno, con refuerzo por bigramas y por coincidencia exacta de tag |
| Control de calidad | Compuerta de vocabulario + umbral de confianza: si no sabe, lo dice |

Consecuencias de diseño: **sin backend, sin API keys, sin costo de inferencia** y
**ningún dato del visitante sale de su navegador**.

### Detalles de implementación

- **Tema claro/oscuro** completo mediante *custom properties*, con persistencia en `localStorage`.
- **Paleta de comandos** (`Ctrl/⌘ + K`) para navegar, descargar documentos o lanzar una pregunta al asistente.
- **Constelación animada** en `<canvas>` que se pausa automáticamente al salir del viewport.
- **Revelado al hacer scroll** con `IntersectionObserver` y contadores animados.
- **Accesibilidad**: HTML semántico, `aria-*`, enlace de salto, foco atrapado en el diálogo del chat,
  estados `:focus-visible` y soporte completo de `prefers-reduced-motion`.
- **SEO**: metadatos Open Graph, `sitemap.xml`, `robots.txt` y datos estructurados **JSON-LD** (`schema.org/Person`).
- **Responsive** de 360 px a 4K, con imágenes servidas por `<picture>` según el viewport.
- **Hoja de impresión** dedicada.

---

## Estructura

```
.
├── index.html                      Página completa (una sola)
├── assets/
│   ├── css/styles.css              Sistema de diseño y componentes
│   ├── js/main.js                  Navegación, tema, scroll, canvas, paleta de comandos
│   ├── js/architect.js             Motor de recuperación + interfaz del asistente
│   ├── data/knowledge-base.js      Base de conocimiento del asistente
│   ├── img/                        Retratos, avatar, favicons, Open Graph
│   └── docs/                       Hoja de vida (PDF y Word), portafolio y certificado
├── .github/workflows/deploy.yml    Despliegue automático a GitHub Pages
├── robots.txt · sitemap.xml · .nojekyll
└── README.md
```

## Ejecutar en local

No requiere instalación ni compilación. Basta con servir la carpeta:

```bash
python -m http.server 8000
# luego abrir http://localhost:8000
```

## Despliegue

El flujo de `.github/workflows/deploy.yml` publica en GitHub Pages con cada `push` a `main`.
Para activarlo: **Settings → Pages → Source → GitHub Actions**.

---

## Contacto

**Edwin Belisario Calderón Aguilera** — Santa Marta, Magdalena, Colombia
📧 edwinaguilera777@gmail.com · 📱 +57 301 409 9377
💼 [LinkedIn](https://linkedin.com/in/edwin-belisario)

© 2026 Edwin Belisario Calderón Aguilera.
