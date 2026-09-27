/* ═══════════════════════════════════════════════════════════════════
   THE ARCHITECT — Base de conocimiento
   Cada entrada: { id, cat, tags[], q[], a (HTML), src? }
     tags → términos con peso alto en la recuperación
     q    → variantes de pregunta que la entrada responde
     a    → respuesta en HTML ligero (p, ul, li, b, i, a, code)
   ═══════════════════════════════════════════════════════════════════ */

window.ARCHITECT_KB = {

  meta: {
    owner: 'Edwin Belisario Calderón Aguilera',
    updated: 'septiembre de 2026',
    greeting: `<p>Soy <b>The Architect</b>, el asistente de perfil de <b>Edwin Belisario Calderón Aguilera</b> —Ingeniero de
      Sistemas Senior con 11 años de trayectoria e Ingeniero Industrial.</p>
      <p>Conozco su experiencia, sus proyectos, su stack técnico y las referencias de mercado para su perfil.
      Pregúntame lo que necesites saber antes de una entrevista o una decisión de contratación.</p>`,
    suggestions: [
      '¿Cuánto debería ganar esta persona?',
      '¿Por qué es un perfil senior?',
      '¿Qué experiencia tiene en ciberseguridad?',
      '¿Ha liderado equipos?',
      '¿Qué ha construido exactamente?',
      '¿Qué tecnologías domina?',
      '¿Qué hace hoy en Petroil?',
      '¿Cómo lo contacto?'
    ]
  },

  /* ───────────────── intención especial: SALARIO ───────────────── */
  salary: {
    triggers: [
      'salario','sueldo','cuanto gana','cuanto deberia ganar','cuanto cobra','cuanto vale','remuneracion',
      'pago','paga','pagarle','ofrecerle','oferta','pretension','aspiracion','honorarios','ingresos',
      'cuanto pedir','cuanto ofrecer','banda salarial','rango salarial','compensacion','salary','how much',
      'presupuesto','costo','contratarlo por','vale la pena pagar','millones','cuanto le pagamos','que sueldo'
    ],
    answer: `<p>Mi creador <b>no me dejó estipulada una cifra propia</b>. Lo que sí hice fue consultar referencias
      públicas de mercado para Colombia en 2026 y contrastarlas con su trayectoria verificable. Esto es lo que encontré:</p>

      <p><b>Referencias de mercado (COP mensuales, 2026):</b></p>
      <ul>
        <li><b>$12,2 M – $21,0 M</b> — Ingeniero de Software <b>Senior</b> en Colombia. Levels.fyi reporta una
          compensación total de $146,6 M a $252,4 M anuales (dato actualizado al 21-07-2026).</li>
        <li><b>$7,0 M – $12,0 M</b> — mismo rol en una ciudad costera comparable (Cartagena), según Levels.fyi.
          Es la referencia regional más cercana a Santa Marta.</li>
        <li><b>desde $9,0 M</b> — banda inicial de un Desarrollador Full-Stack Senior con más de 5 años
          (Coderhouse, Sueldos Colombia 2026).</li>
        <li><b>$4,5 M – $7,0 M</b> — ingenieros de sistemas en posiciones senior o de liderazgo tecnológico,
          según la Facultad de Ingeniería de la Pontificia Universidad Javeriana.</li>
      </ul>

      <p><b>Dos datos de su propia historia que conviene tener presentes:</b></p>
      <ul>
        <li>En <b>2021–2022</b> ya devengaba <b>COP $6.000.000 mensuales</b> como Coordinador de Desarrollo de Software
          en la Universidad del Magdalena, liderando un equipo de 3 desarrolladores. Es una cifra documentada, no una estimación.</li>
        <li>Indexada por la variación del salario mínimo ($908.526 en 2021 → $1.750.905 en 2026), esa misma
          remuneración equivale hoy a <b>≈ $11.560.000 mensuales</b>. Y eso <b>sin contar</b> los cuatro años de
          experiencia adicionales que acumuló desde entonces.</li>
      </ul>

      <p><b>Conclusión:</b> el <b>piso de referencia es COP $6.000.000 mensuales</b> —exactamente lo que ya ganaba hace
      cinco años, sin ajuste por inflación— y ese piso se ubica <b>por debajo de todas</b> las bandas senior del
      mercado 2026. El <b>rango objetivo razonable es COP $8.000.000 – $12.000.000 mensuales</b>, y puede ser mayor
      según el alcance del rol, la responsabilidad sobre infraestructura y ciberseguridad, y el liderazgo de equipo.</p>

      <p>Un apunte de contexto: una oferta de nivel <i>junior</i> para alguien con <b>11 años de ejercicio</b>, liderazgo
      de equipos, responsabilidad sobre seguridad de infraestructura y software propio registrado ante la DNDA
      no corresponde a ninguna banda del mercado colombiano.</p>`,
    src: 'Levels.fyi (Colombia y Cartagena, 2026) · Coderhouse — Sueldos Colombia 2026 · P. U. Javeriana, Facultad de Ingeniería · Decretos de salario mínimo 2021 y 2026'
  },

  /* ───────────────── conversación básica ───────────────── */
  smalltalk: [
    { k: ['hola','buenas','hey','saludos','buenos dias','buenas tardes','buenas noches','que tal','holi','ola'],
      a: `<p>Hola. Soy <b>The Architect</b>. Puedo contarte sobre la trayectoria, los proyectos, el stack técnico o
          las referencias de mercado de Edwin Calderón. ¿Por dónde quieres empezar?</p>` },
    { k: ['gracias','muchas gracias','thanks','genial','excelente','perfecto','buenisimo','ok gracias'],
      a: `<p>Con gusto. Si quieres seguir, puedo detallarte algún proyecto en particular, su experiencia en
          ciberseguridad, o el rango salarial que corresponde a su perfil.</p>` },
    { k: ['adios','chao','hasta luego','bye','nos vemos'],
      a: `<p>Hasta luego. Si necesitas contactarlo directamente: <b>edwinaguilera777@gmail.com</b> o
          <b>+57 301 409 9377</b>.</p>` },
    { k: ['quien eres','que eres','como funcionas','eres una ia','eres chatgpt','eres un bot','que modelo eres'],
      a: `<p>Soy <b>The Architect</b>, un asistente construido por Edwin para este portafolio.</p>
          <p>No soy un modelo de lenguaje ni consumo ninguna API: soy un <b>motor de recuperación de información</b>
          escrito a mano en JavaScript. Normalizo y tokenizo tu pregunta en español, la contrasto contra un índice
          invertido con ponderación <b>TF-IDF</b>, aplico expansión de sinónimos y refuerzo por bigramas, y devuelvo
          la entrada más relevante de una base de conocimiento curada.</p>
          <p>Todo corre <b>íntegramente en tu navegador</b>: sin backend, sin API keys, sin costo de inferencia y sin
          que ningún dato tuyo salga de tu equipo. Que exista es, en sí mismo, parte de su portafolio.</p>` }
  ],

  /* ───────────────── entradas ───────────────── */
  entries: [

  /* ═══ IDENTIDAD ═══ */
  {
    id: 'quien-es', cat: 'Perfil',
    tags: ['quien','edwin','calderon','aguilera','perfil','presentacion','resumen','acerca','sobre el','biografia','persona'],
    q: ['quien es edwin','de quien es este perfil','hablame de edwin','resumen del perfil','preséntame a esta persona','de que va este perfil'],
    a: `<p><b>Edwin Belisario Calderón Aguilera</b> — Ingeniero de Sistemas (Universidad del Magdalena, 2018) e
      Ingeniero Industrial (Universidad del Magdalena, 2023–2026). Vive en <b>Santa Marta, Magdalena, Colombia</b>.</p>
      <p>Lleva <b>11 años de ejercicio profesional continuo</b> en tecnología, desde su primer empleo a los 17 años.
      Su rasgo distintivo es que cubre la cadena completa: diagnostica el problema con criterio de ingeniería
      industrial —procesos, cuellos de botella, costos— y construye la solución con criterio de ingeniería de
      sistemas —arquitectura, código, base de datos, infraestructura, seguridad y operación—.</p>
      <p>Hoy es el <b>único perfil de tecnología</b> de Petroil S.A., una refinería de petróleo que no cuenta con área
      de TI ni con ingenieros de sistemas en toda su planta, donde asumió de facto la función completa del área.</p>`
  },
  {
    id: 'senior-porque', cat: 'Perfil',
    tags: ['senior','seniority','nivel','es senior','junior','semi senior','experiencia','años','trayectoria','por que senior'],
    q: ['por que es senior','es realmente senior','que tan senior es','cuantos años de experiencia tiene','es junior o senior','justifica el nivel senior'],
    a: `<p>Es un perfil <b>senior</b> por cuatro razones verificables, no por autodenominación:</p>
      <ul>
        <li><b>Antigüedad real:</b> 11 años de ejercicio continuo desde julio de 2015, sin interrupciones.</li>
        <li><b>Liderazgo demostrado:</b> lideró un equipo de 3 desarrolladores como Coordinador de Desarrollo de
          Software, dirigió a los coordinadores de un programa nacional y coordinó equipos de <b>hasta 50 personas</b>.</li>
        <li><b>Alcance end-to-end:</b> no ejecuta tareas dentro de un sistema ajeno — define arquitectura, elige el
          stack, modela la base de datos, administra los servidores Linux, despliega, asegura y opera. Hoy es
          literalmente el área de TI completa de una empresa.</li>
        <li><b>Propiedad intelectual y certificaciones:</b> software propio registrado ante la Dirección Nacional de
          Derecho de Autor y 5 órdenes de servicios profesionales certificadas por la Universidad del Magdalena.</li>
      </ul>
      <p>A esto se suma algo poco común: <b>dos ingenierías</b>. La industrial le da lectura de negocio y procesos;
      la de sistemas, capacidad de construcción. Rara vez coinciden en la misma persona.</p>`
  },
  {
    id: 'dos-ingenierias', cat: 'Perfil',
    tags: ['industrial','sistemas','dos ingenierias','doble','combinacion','procesos','negocio','diferencial','valor agregado'],
    q: ['por que dos ingenierias','para que sirve la ingenieria industrial','que aporta ser industrial','cual es su diferencial','que lo hace diferente'],
    a: `<p>La combinación no es decorativa: cambia el tipo de problema que puede resolver.</p>
      <p><b>Como ingeniero industrial</b> lee la organización antes de tocar código: mapea el proceso, identifica el
      cuello de botella, estima el costo del problema y decide si la solución correcta es software, un cambio de
      proceso o ambas cosas. Trae mejora continua, gestión de proyectos y análisis de eficiencia.</p>
      <p><b>Como ingeniero de sistemas</b> ejecuta: arquitectura, desarrollo full-stack, modelado de datos,
      infraestructura, despliegue y seguridad.</p>
      <p>El resultado es un perfil de <b>problem-owner end-to-end</b>. Casos concretos: en Petroil detectó las fallas
      de la plataforma digital y terminó construyendo el reemplazo completo; en InventarioTienda diagnosticó un error
      contable en la lógica de cartera y reescribió la asignación de costos. En ambos casos el hallazgo vino de la
      mirada de procesos y la solución de la mirada de sistemas.</p>`
  },

  /* ═══ PETROIL ═══ */
  {
    id: 'petroil', cat: 'Experiencia actual',
    tags: ['petroil','refineria','actual','ahora','trabajo actual','empresa actual','que hace hoy','practicas','practicante'],
    q: ['que hace en petroil','donde trabaja ahora','cual es su trabajo actual','que esta haciendo hoy','cuentame de petroil'],
    a: `<p>En <b>Petroil S.A.</b>, una refinería de petróleo en Santa Marta, es el <b>Ingeniero de Tecnología y
      Transformación Digital</b> — en la práctica, el área de TI completa de la compañía.</p>
      <p>Entró como practicante de Ingeniería Industrial en Aseguramiento de la Calidad. Detectó y reportó fallas
      críticas en la plataforma digital corporativa; la organización —que no tiene área de TI ni un solo ingeniero
      de sistemas en toda su planta— le asignó la responsabilidad técnica integral y una compensación adicional por ello.</p>
      <p><b>Lo que tiene a cargo:</b></p>
      <ul>
        <li><b>Auditoría de ciberseguridad</b> de la infraestructura corporativa, con reporte formal de hallazgos,
          plan de remediación y hardening de la plataforma.</li>
        <li><b>Redes:</b> diagnosticó y resolvió bloqueos que impedían el acceso a servicios críticos desde la red
          corporativa, restableciendo la operación de las áreas afectadas.</li>
        <li><b>Nuevo sitio web corporativo:</b> diseño, maquetación y desarrollo completo, reemplazando un WordPress
          obsoleto y tercerizado. Presentó una maqueta como referencia para el proveedor externo; gustó tanto que se
          aprobó tal cual y la construcción quedó a su cargo.</li>
        <li><b>Intranet corporativa:</b> la diseña y construye desde cero — no existía.</li>
        <li><b>Dirección creativa:</b> concepto, identidad visual, maquetación, generación de imagen y video con IA,
          y edición de piezas audiovisuales, ante la ausencia de un área de creatividad.</li>
        <li><b>Innovación:</b> concibió el proyecto «Ala de Sable» y un programa de Realidad Virtual para inducción,
          simulacros de emergencia y marketing experiencial.</li>
      </ul>
      <p>Por confidencialidad no se publican hallazgos, vulnerabilidades ni detalles técnicos de la infraestructura
      del cliente. Esa información se comparte solo en un proceso formal.</p>`
  },
  {
    id: 'ala-de-sable', cat: 'Experiencia actual',
    tags: ['ala de sable','colibri','campylopterus','phainopeplus','especie','conservacion','sierra nevada','sostenibilidad','ambiental','marca','bandera'],
    q: ['que es ala de sable','de que trata el proyecto ala de sable','que es el proyecto del colibri','hablame de ala de sable'],
    a: `<p><b>«Ala de Sable»</b> es un proyecto que Edwin concibió para Petroil y que articula dos cosas que
      normalmente van por separado: <b>conservación real</b> y <b>estrategia de marca</b>.</p>
      <p>El <b>ala de sable de Santa Marta</b> (<i>Campylopterus phainopeplus</i>) es un colibrí <b>endémico de la Sierra
      Nevada de Santa Marta</b> y está catalogado <b>en peligro crítico de extinción</b>. Durante décadas se consideró
      una especie «fantasma»: no hubo registros sólidos desde 2010 hasta su reaparición documentada años después.
      Es, literalmente, una especie que solo existe en el territorio donde opera la empresa.</p>
      <p><b>La propuesta:</b> que Petroil adopte su preservación como causa y, al mismo tiempo, la use como eje de
      identidad en comunicaciones, piezas institucionales y el asistente conversacional corporativo. Una sola
      inversión que produce impacto ambiental verificable, diferenciación de marca anclada al territorio y un relato
      creíble de sostenibilidad — en lugar de un discurso genérico.</p>
      <p>Es un buen ejemplo de cómo trabaja: el aporte no fue una pieza gráfica, fue un <b>concepto estratégico</b>
      que conecta responsabilidad ambiental, posicionamiento y producto digital.</p>`,
    src: 'Campylopterus phainopeplus — especie endémica de la Sierra Nevada de Santa Marta, en peligro crítico'
  },
  {
    id: 'vr-industrial', cat: 'Experiencia actual',
    tags: ['realidad virtual','vr','propuesta vr','simulacros','induccion','capacitacion','emergencia','derrame','incendio','experiencial','inmersivo','recorrido'],
    q: ['que propuso con realidad virtual','para que sirve la vr en una empresa','como aplicaria vr en la industria','que uso industrial tiene la vr'],
    a: `<p>Edwin propuso llevar la Realidad Virtual —tecnología que opera desde 2018— a un entorno industrial.
      No como novedad, sino resolviendo problemas concretos de una refinería:</p>
      <p><b>Uso interno</b></p>
      <ul>
        <li><b>Inducción de personal nuevo</b> en procesos riesgosos o difíciles de mostrar en vivo.</li>
        <li><b>Simulacros de emergencia</b> —incendio, alarmas, derrame de hidrocarburos— con evaluación objetiva:
          qué hizo la persona, cuánto tardó, si tomó la ruta correcta, si identificó el riesgo.</li>
        <li><b>Capacitación de contratistas</b> temporales en riesgos, rutas y señalización, de forma rápida y estandarizada.</li>
        <li><b>Entrenamiento de procedimientos</b> que sería costoso o peligroso practicar en la planta real.</li>
      </ul>
      <p><b>Uso externo</b></p>
      <ul>
        <li><b>«Conoce Petroil»</b>: un recorrido virtual de 3 a 5 minutos por la refinería —exterior, entrada, proceso
          de refinación, equipos, laboratorio, seguridad y producto final—.</li>
        <li>Ferias de empleo, tecnología e ingeniería; visitas institucionales; reuniones con clientes.</li>
        <li>Universidades y colegios, como <b>employer branding</b> y posicionamiento regional.</li>
      </ul>
      <p>El argumento comercial: mientras otras empresas llevan pendones y folletos a una feria, Petroil podría
      dejar que el visitante <b>entre a la refinería</b>.</p>`
  },

  /* ═══ EXPERIENCIA ANTERIOR ═══ */
  {
    id: 'coordinador-unimag', cat: 'Experiencia',
    tags: ['coordinador','desarrollo','equipo','unimag','universidad del magdalena','bpin','2021','2022','angular','laravel','tech lead','lider tecnico','salud mental'],
    q: ['que hizo en la universidad del magdalena','cuentame del proyecto bpin','fue coordinador de desarrollo','lidero un equipo de desarrollo'],
    a: `<p><b>Coordinador de Desarrollo de Software y Co-investigador</b> — Universidad del Magdalena, Vicerrectoría
      Administrativa · <b>septiembre 2021 – febrero 2023</b>. Remuneración: <b>COP $6.000.000 mensuales</b>.</p>
      <p>Trabajó en el proyecto de regalías <b>BPIN 2020000100758</b>: «Desarrollo de un Sistema Tecnológico Integrado
      para la promoción de la salud mental, problemáticas psicosociales, socioemocionales y prevención de la violencia
      de género causados por la pandemia del COVID-19 en el departamento del Magdalena». Órdenes OPSP-VAD-1429-2021
      y OPSP-VAD-1171-2022.</p>
      <ul>
        <li><b>Lideró un equipo de 3 desarrolladores</b>: definió arquitectura, estándares de código, alcance y entregables.</li>
        <li>Diseñó y desarrolló una <b>plataforma web full-stack (Angular + PHP/Laravel + MySQL)</b> para captura,
          validación y gestión de datos de campo y laboratorio, reemplazando procesos manuales dispersos.</li>
        <li>Automatizó el procesamiento de información y la generación de reportes, reduciendo drásticamente el tiempo
          entre la recolección del dato y la decisión.</li>
        <li>Administró <b>bases de datos y despliegues en servidores Linux</b>, respondiendo por disponibilidad y continuidad.</li>
        <li>Coordinó el levantamiento de información in situ y la sistematización de los productos científicos.</li>
      </ul>
      <p>Este es el rol que fija el antecedente salarial: hace cinco años ya devengaba $6.000.000 mensuales
      liderando desarrollo.</p>`
  },
  {
    id: 'investigacion-tdah', cat: 'Experiencia',
    tags: ['tdah','investigacion','i+d','prototipo','ecg','electrocardiograma','corazon','señales','biomedica','hardware','2023','2024','atencion'],
    q: ['que investigacion ha hecho','que es el proyecto del tdah','trabajo con hardware','tiene experiencia en investigacion','que sabe de señales biomedicas'],
    a: `<p><b>Ingeniero de I+D — Prototipado y Señales Biomédicas</b>, Universidad del Magdalena, Vicerrectoría de
      Investigación. Dos órdenes consecutivas: OPSP-VIN-0158-2023 (jun–dic 2023) y OPSP-VIN-0157-2024 (abr–ago 2024).</p>
      <p>El proyecto: «Sistema de detección de la atención a partir de la actividad eléctrica del corazón para el
      refuerzo diagnóstico y tratamiento del trastorno de déficit de atención con hiperactividad (TDAH) y la
      didáctica educativa».</p>
      <ul>
        <li><b>Programó y ensambló el prototipo</b> de captura de señal electrocardiográfica: integración de hardware,
          lógica de adquisición y software de procesamiento.</li>
        <li>Diseñó el pipeline de <b>recolección, organización y análisis de datos fisiológicos</b> con mediación tecnológica.</li>
        <li>Participó en la generación de productos de investigación junto al investigador principal.</li>
      </ul>
      <p>Es relevante porque demuestra que no es solo un desarrollador de aplicaciones: trabaja con <b>hardware,
      adquisición de señal y análisis de datos</b> en un contexto de investigación formal.</p>`
  },
  {
    id: 'seguridad-informacion', cat: 'Experiencia',
    tags: ['seguridad de la informacion','integridad','icbf','extension','2022','trazabilidad','documental','digitalizacion','base de datos participantes'],
    q: ['que hizo en seguridad de la informacion','experiencia en integridad de datos','trabajo con el icbf'],
    a: `<p><b>Responsable de Seguridad e Integridad de la Información</b> — Universidad del Magdalena, Vicerrectoría de
      Extensión, en el marco del Contrato de Aporte ICBF N.º 228 de 2022. Orden OPSP-VEX-1182-2022
      (octubre – diciembre 2022).</p>
      <ul>
        <li>Respondió por la <b>seguridad, integridad y trazabilidad</b> de toda la información del programa, en medio
          físico y electrónico.</li>
        <li>Diseñó y mantuvo la <b>base de datos de participantes</b> por municipio y zona, con control de ingresos,
          retiros y novedades.</li>
        <li>Estandarizó la digitalización y el registro en los sistemas de información institucionales, y consolidó
          todos los soportes de ejecución contractual.</li>
      </ul>
      <p>Es un antecedente formal de responsabilidad sobre seguridad de la información en un contrato público.</p>`
  },
  {
    id: 'vr-zone', cat: 'Experiencia',
    tags: ['vr zone','emprendimiento','empresa propia','fundador','negocio','realidad virtual','marca','marketing','operaciones','startup','2018'],
    q: ['tiene empresa propia','que es vr zone','ha emprendido','experiencia en negocios','fundó algo'],
    a: `<p><b>Fundador y Director de Operaciones de VR Zone</b> — el <b>primer y único centro de Realidad Virtual arcade
      de Santa Marta</b>, desde mayo de 2018 y aún activo.</p>
      <ul>
        <li>Fundó y escaló la empresa <b>desde cero</b>: modelo de negocio, operación, tecnología, finanzas y crecimiento.
          La abrió con apenas 20 años.</li>
        <li>Construyó <b>toda la identidad de marca</b>: naming, logotipo, concepto visual, paleta y slogan; y su
          aplicación en piezas físicas y digitales.</li>
        <li>Creó y gestionó la presencia digital completa —Facebook, Instagram, TikTok y YouTube— más un catálogo
          digital de experiencias en Notion. Acumula <b>4.8/5</b> de calificación pública.</li>
        <li>Diseñó una <b>estrategia de fidelización</b> por tarjeta de sellos integrada a la experiencia de marca.</li>
        <li>Llevó la tecnología inmersiva a <b>colegios, universidades y ferias empresariales</b> como ponente y
          operador (Expo Corredores · FENALCO · Cajamag), evangelizando un concepto entonces desconocido en la ciudad.</li>
        <li>Analizó el comportamiento de clientes y rediseñó procesos operativos con base en datos propios.</li>
      </ul>
      <p>Aporta algo que no se aprende en un empleo: <b>responsabilidad P&L</b>, criterio comercial y tolerancia al
      riesgo. Sabe lo que cuesta sostener una operación.</p>`
  },
  {
    id: 'director-talentos', cat: 'Experiencia',
    tags: ['director','fundacion talentos','icbf','50 personas','equipos','liderazgo','2016','2019','sistematizacion','premiacion','bogota','referente nacional'],
    q: ['ha dirigido equipos grandes','que hizo en fundacion talentos','cuanta gente ha liderado','fue director de algo'],
    a: `<p><b>Director de Sistematización y Gestión de Información</b> — Fundación Talentos, operador del ICBF,
      en Magdalena y Sucre · <b>febrero 2016 – diciembre 2019</b>.</p>
      <p>Asumió la dirección del componente de información <b>por mérito</b>, siendo el perfil más joven del equipo
      directivo. Ya lo habían visto trabajar en la Universidad del Magdalena y le ofrecieron el cargo. Devengaba
      alrededor de <b>COP $3.000.000 mensuales en 2016</b> — unos 4,3 salarios mínimos de la época.</p>
      <ul>
        <li><b>Dirigió a los coordinadores del programa</b> y respondió por la calidad, consistencia y trazabilidad de
          toda la data.</li>
        <li>Coordinó <b>equipos de hasta 50 personas</b>, rediseñando el flujo de información y los procesos operativos.</li>
        <li>Administró bases de datos de programas sociales en múltiples departamentos, estandarizando los procesos
          de calidad de la información.</li>
        <li>El equipo recibió <b>premiación nacional desde Bogotá</b> y fue tomado como <b>referente nacional de buenas
          prácticas</b> en cargue de información y gestión de proyectos.</li>
      </ul>`
  },
  {
    id: 'primer-empleo', cat: 'Experiencia',
    tags: ['primer empleo','17 años','access','excel','generaciones con bienestar','cuentame','200 promotores','magdalena','guajira','cesar','2015','inicio'],
    q: ['cual fue su primer trabajo','desde cuando trabaja','como empezo','que hizo a los 17 años'],
    a: `<p>Su primer empleo profesional fue en la <b>Universidad del Magdalena</b> a los <b>17 años</b>, en julio de 2015.</p>
      <ul>
        <li>Desarrolló en <b>Microsoft Access</b> un generador de reportes que producía archivos de Excel a partir de
          plantillas y de las bases de datos institucionales — automatizando un proceso que antes era enteramente manual.
          Su primer trabajo ya fue construir una herramienta, no operar una.</li>
        <li>Por rendimiento lo movieron a un proyecto de mayor responsabilidad: el programa <b>«Generaciones con
          Bienestar»</b> del ICBF. Empezó administrando la regional Magdalena y terminó llevando también
          <b>La Guajira y Cesar</b>, con <b>cerca de 200 promotores</b> a cargo entre las tres.</li>
        <li>El programa se ubicó en el <b>top nacional de operadores</b> en el cargue del sistema de información «Cuéntame».</li>
      </ul>
      <p>El patrón se repite en toda su carrera: entra en un rol, rinde por encima de lo esperado y le amplían el alcance.</p>`
  },

  /* ═══ PROYECTOS ═══ */
  {
    id: 'inventario-tienda', cat: 'Proyectos',
    tags: ['inventariotienda','inventario','erp','pos','punto de venta','electron','sqlite','fifo','producto','escritorio','app','facturacion','termica','escpos','cartera'],
    q: ['que es inventariotienda','cuentame del erp','que software ha construido','que aplicaciones ha hecho','proyecto de inventario'],
    a: `<p><b>InventarioTienda</b> — ERP y Punto de Venta de escritorio. Producto propio, <b>en producción con clientes
      reales</b> y <b>registrado ante la DNDA</b>.</p>
      <p>Gestiona un negocio de venta al por mayor y detal completo: inventario multi-presentación, ventas con lector
      de código de barras, cartera de clientes, reportes financieros y facturación térmica.</p>
      <p><b>Decisiones de ingeniería destacables:</b></p>
      <ul>
        <li><b>Arquitectura modular en Electron</b> —proceso main / renderer / preload con contextBridge— con
          <b>8 módulos de negocio</b> independientes comunicados vía IPC, <b>sin frameworks ni bundler</b>.</li>
        <li>Base de datos relacional en <b>SQLite (sql.js/WASM)</b> con <b>lógica FIFO real de costos por lote de
          compra</b> y conversión automática entre unidades de presentación.</li>
        <li><b>Sistema de migraciones de esquema versionado</b>: permite evolucionar la base de datos en producción
          sin perder el histórico de clientes reales. Es una decisión de ingeniero senior, no de desarrollador de demos.</li>
        <li><b>Impresión térmica por comandos ESC/POS</b> (Xprinter 80 mm + cajón de dinero), resolviendo fallas de un
          driver incompatible con el pipeline estándar de Chromium.</li>
        <li>Reportes financieros con exportación a PDF (jsPDF + autotable), analítica de ganancias por producto y
          período, y control de acceso por códigos de licencia con expiración.</li>
        <li>Empaquetado y distribución como instalador de Windows (NSIS) con electron-builder.</li>
      </ul>
      <p><b>Impacto medible:</b> digitalizó la trazabilidad de <b>+550 productos</b> que se gestionaban 100 % a mano en
      cuaderno, sin visibilidad real del inventario disponible. Automatizó el costeo FIFO en el 100 % de compras y
      ventas. Y <b>diagnosticó y corrigió un error contable crítico</b> en el módulo de cartera: implementó una lógica
      de asignación «costo-primero» para pagos parciales de deuda, evitando que las ganancias reportadas se inflaran
      artificialmente en el 100 % de esos pagos.</p>`
  },
  {
    id: 'the-architect', cat: 'Proyectos',
    tags: ['the architect','chatbot','asistente','bot','este asistente','como funciona','tfidf','nlp','recuperacion',
           'motor','api','backend','inferencia','llm','modelo de lenguaje','navegador','client side','sin api'],
    q: ['como esta hecho este chatbot','que es the architect','como funciona el asistente','usa una api de ia',
        'usa alguna api de inteligencia artificial','este bot consume una api','cuanto cuesta este bot'],
    a: `<p><b>The Architect</b> soy yo — y sí, cuento como proyecto de su portafolio.</p>
      <p>No soy un modelo de lenguaje ni una integración con una API externa. Soy un <b>motor de recuperación de
      información escrito a mano en JavaScript vanilla</b>:</p>
      <ul>
        <li><b>Normalización y tokenización en español</b>: minúsculas, eliminación de acentos y signos, y filtrado
          de palabras vacías del español.</li>
        <li><b>Índice invertido</b> construido en tiempo de carga sobre la base de conocimiento.</li>
        <li><b>Ponderación TF-IDF</b> con similitud coseno para rankear las entradas candidatas.</li>
        <li><b>Expansión de sinónimos</b> y <b>refuerzo por bigramas</b>, para que «cuánto gana» y «qué sueldo tiene»
          lleguen a la misma respuesta.</li>
        <li><b>Detección de intención</b> con umbral de confianza: si ninguna entrada supera el umbral, lo admito
          en vez de inventar.</li>
      </ul>
      <p><b>Por qué importa:</b> el problema no pedía un LLM ni una factura mensual — pedía recuperación de información
      bien hecha. El resultado: <b>sin backend, sin API keys, sin costo de inferencia</b> y <b>sin que ningún dato del
      visitante salga de su navegador</b>. Eso es criterio de arquitectura: elegir la solución proporcional al problema.</p>`
  },
  {
    id: 'proyecto-bpin', cat: 'Proyectos',
    tags: ['bpin','plataforma','regalias','salud mental','angular','laravel','mysql','proyecto publico','2020000100758'],
    q: ['que es la plataforma bpin','proyecto con recursos publicos','ha trabajado en proyectos del estado'],
    a: `<p><b>Plataforma BPIN — Sistema Tecnológico Integrado de Salud Mental</b> (2021–2023).</p>
      <p>Plataforma web de captura, validación y análisis de datos psicosociales para un proyecto de ciencia y
      tecnología financiado con <b>recursos públicos de regalías</b>: BPIN 2020000100758, ejecutado por la Universidad
      del Magdalena.</p>
      <ul>
        <li>Stack <b>Angular + PHP/Laravel + MySQL</b> sobre infraestructura Linux administrada por él.</li>
        <li>Generación automatizada de reportes e instrumentos de levantamiento en campo y laboratorio.</li>
        <li>Coordinación de un <b>equipo de 3 desarrolladores</b>: arquitectura, estándares y entregables.</li>
      </ul>
      <p>Es un antecedente relevante para entornos corporativos o públicos: sabe trabajar con trazabilidad,
      soportes contractuales y auditoría de ejecución.</p>`
  },

  /* ═══ TÉCNICO ═══ */
  {
    id: 'stack-general', cat: 'Stack',
    tags: ['stack','tecnologias','herramientas','lenguajes','que sabe','skills','conocimientos','tecnico','domina','maneja'],
    q: ['que tecnologias maneja','cual es su stack','que lenguajes sabe','que herramientas domina','que sabe hacer tecnicamente'],
    a: `<p>Stack que ha puesto <b>en producción</b>, no solo estudiado:</p>
      <ul>
        <li><b>Lenguajes:</b> JavaScript (ES6+), Node.js, PHP, Python, SQL, R, VBA/Access.</li>
        <li><b>Frontend y UX:</b> Angular, HTML5, CSS3, diseño de interfaces, accesibilidad, responsive.</li>
        <li><b>Backend y datos:</b> Laravel, MySQL, SQLite (sql.js/WASM), modelado relacional, migraciones de esquema
          versionadas, diseño de APIs.</li>
        <li><b>Escritorio:</b> Electron (main–renderer–preload, IPC, contextBridge), electron-builder, NSIS.</li>
        <li><b>Infraestructura:</b> Linux, administración de servidores, despliegues, redes, Git.</li>
        <li><b>Ciberseguridad:</b> auditoría de seguridad, análisis de vulnerabilidades, hardening, respuesta a incidentes.</li>
        <li><b>Datos y BI:</b> Power BI, Excel avanzado, SPSS, R Studio, análisis y visualización de datos.</li>
        <li><b>IA aplicada:</b> asistentes conversacionales, recuperación de información, ingeniería de prompts,
          IA generativa para texto, imagen y video.</li>
        <li><b>XR y 3D:</b> Unity, Unreal Engine, Blender, Realidad Virtual, Aumentada y Mixta.</li>
        <li><b>Hardware:</b> prototipado electrónico, señales ECG, ESC/POS, lectores de código de barras.</li>
        <li><b>Diseño y multimedia:</b> Photoshop, Illustrator, Canva, CapCut, OBS, AutoCAD.</li>
      </ul>`
  },
  {
    id: 'ciberseguridad', cat: 'Stack',
    tags: ['ciberseguridad','seguridad','hardening','auditoria','vulnerabilidades','hackeo','incidente','pentesting','proteccion','riesgos','servidor'],
    q: ['que sabe de ciberseguridad','tiene experiencia en seguridad','ha hecho auditorias','que experiencia tiene en hardening','sabe de vulnerabilidades'],
    a: `<p>La ciberseguridad no es una línea aspiracional en su hoja de vida: es lo que está ejecutando ahora mismo.</p>
      <ul>
        <li><b>Auditoría en curso (Petroil S.A.):</b> lidera la auditoría de seguridad de la infraestructura corporativa
          —servidor arrendado y sitio web tercerizado— con reporte formal de hallazgos, plan de remediación y
          <b>endurecimiento (hardening)</b> de la plataforma. Todo el proceso nació de una detección suya: encontró y
          reportó fallas críticas que nadie en la organización había identificado.</li>
        <li><b>Responsable de Seguridad e Integridad de la Información</b> (Universidad del Magdalena, 2022): respondió
          formalmente por la seguridad, integridad y trazabilidad de la información de un programa del ICBF, en medio
          físico y electrónico.</li>
        <li><b>Redes:</b> diagnosticó y resolvió bloqueos que impedían el acceso a servicios críticos desde la red
          corporativa, restableciendo la operación.</li>
        <li><b>Infraestructura:</b> años administrando servidores Linux en producción, con responsabilidad sobre
          disponibilidad y continuidad.</li>
      </ul>
      <p>Por confidencialidad no se publican hallazgos, vulnerabilidades ni detalles de la infraestructura del cliente.
      Esa información se comparte únicamente en un proceso formal y bajo acuerdo.</p>`
  },
  {
    id: 'datos-bi', cat: 'Stack',
    tags: ['datos','data','bi','business intelligence','power bi','analitica','analisis','reportes','bases de datos','sql','mysql','modelado','excel','spss','estadistica'],
    q: ['que sabe de datos','maneja power bi','tiene experiencia en bases de datos','sabe de business intelligence','trabaja con analitica'],
    a: `<p>Los datos son la columna vertebral de casi toda su carrera — empezó administrando bases de datos a los 17 años.</p>
      <ul>
        <li><b>Modelado y administración:</b> MySQL y SQLite; diseño relacional, <b>migraciones de esquema versionadas</b>
          para evolucionar bases en producción sin pérdida de histórico, y administración de bases en servidores Linux.</li>
        <li><b>Escala real:</b> administró la información de <b>cerca de 200 promotores en tres departamentos</b>
          (Magdalena, La Guajira y Cesar) y respondió por la calidad del dato de programas sociales nacionales, con
          reconocimiento como referente nacional de buenas prácticas.</li>
        <li><b>BI y analítica:</b> Power BI, Excel avanzado, SPSS y R Studio para análisis y visualización.</li>
        <li><b>Automatización de reportería:</b> desde su generador Access→Excel de 2015 hasta la generación
          automatizada de reportes en la plataforma BPIN y los reportes financieros con analítica por producto y
          período en InventarioTienda.</li>
        <li><b>Datos científicos:</b> pipeline de recolección y análisis de señales fisiológicas (ECG) en el proyecto TDAH.</li>
      </ul>`
  },
  {
    id: 'ia', cat: 'Stack',
    tags: ['ia','inteligencia artificial','ai','machine learning','chatbot','prompts','generativa','automatizacion','midjourney','gpt','gemini'],
    q: ['que sabe de inteligencia artificial','usa ia','tiene experiencia con ia','que hace con ia'],
    a: `<p>Usa IA en dos planos distintos, y conviene separarlos:</p>
      <p><b>1. Construcción de sistemas conversacionales.</b> Diseñó y programó <b>The Architect</b> —este asistente—
      de cero: motor de recuperación con tokenización en español, índice invertido, ponderación TF-IDF, expansión de
      sinónimos, refuerzo por bigramas y detección de intención con umbral de confianza. Sin backend, sin API keys y
      sin costo de inferencia. Entiende cómo funciona la recuperación por dentro, no solo cómo llamar una API.</p>
      <p><b>2. IA generativa aplicada a producción de contenido.</b> Midjourney, GPT, Gemini y las funciones de IA de
      CapCut Pro para generación y edición de imagen y video, con <b>ingeniería de prompts</b> orientada a objetivos
      concretos de comunicación. En Petroil produce piezas audiovisuales corporativas con estas herramientas.</p>
      <p>Su interés profesional declarado incluye Data Analytics, Business Intelligence, Machine Learning e IA aplicada.</p>`
  },
  {
    id: 'xr', cat: 'Stack',
    tags: ['xr','vr','ar','mr','realidad virtual','aumentada','mixta','unity','unreal','blender','3d','inmersivo','videojuegos'],
    q: ['sabe de realidad virtual','maneja unity','tiene experiencia en 3d','que sabe de xr'],
    a: `<p>Tiene <b>siete años operando realidad virtual comercialmente</b> — no es un interés teórico.</p>
      <ul>
        <li><b>Herramientas:</b> Unity, Unreal Engine y Blender; Realidad Virtual (VR), Mixta (MR) y Aumentada (AR).</li>
        <li><b>Operación real:</b> fundó y dirige VR Zone desde 2018, el primer centro de VR arcade de Santa Marta.
          Conoce el hardware, el mantenimiento, la curva de aprendizaje del usuario y qué experiencias funcionan.</li>
        <li><b>Divulgación:</b> ha llevado VR a colegios, universidades y ferias empresariales (Expo Corredores,
          FENALCO, Cajamag) como ponente y operador.</li>
        <li><b>Aplicación industrial:</b> propuso a Petroil un programa de VR para inducción de personal, simulacros de
          incendio y derrame de hidrocarburos, capacitación de contratistas y recorridos virtuales de planta.</li>
      </ul>`
  },
  {
    id: 'diseno', cat: 'Stack',
    tags: ['diseño','creatividad','grafico','marca','identidad','branding','video','edicion','contenido','redes sociales','comunicaciones','photoshop','canva','capcut'],
    q: ['sabe diseñar','tiene perfil creativo','hace contenido','maneja diseño grafico','puede hacer piezas de marca'],
    a: `<p>Es un ingeniero con <b>capacidad creativa ejecutable</b> — una combinación poco frecuente.</p>
      <ul>
        <li><b>Identidad de marca completa:</b> creó VR Zone de cero — naming, logotipo, concepto visual, paleta,
          slogan y su aplicación en piezas físicas y digitales.</li>
        <li><b>Piezas y campañas:</b> tarjetas, volantes, invitaciones, banners, material promocional y para eventos,
          con criterio de formatos, resolución, relación de aspecto y destino de impresión o publicación.</li>
        <li><b>Contenido digital:</b> creación y gestión de Facebook, Instagram, TikTok y YouTube; edición de imagen
          y video en CapCut Desktop y OBS; catálogo digital de experiencias.</li>
        <li><b>Herramientas:</b> Photoshop, Illustrator, Canva, CapCut, OBS, PowerPoint, AutoCAD, más IA generativa
          (Midjourney, GPT, Gemini) para imagen y video.</li>
        <li><b>Hoy en Petroil:</b> ante la ausencia de un área de creatividad, aporta concepto, identidad visual,
          maquetación y producción audiovisual.</li>
      </ul>
      <p>Tiene un portafolio de diseño y contenido digital disponible como documento aparte.</p>`
  },

  /* ═══ COMPETENCIAS Y ENCAJE ═══ */
  {
    id: 'liderazgo', cat: 'Competencias',
    tags: ['liderazgo','lidera','equipo','equipos','personas','gestion','coordinar','dirigir','jefe','mando','tech lead'],
    q: ['ha liderado equipos','cuanta gente ha tenido a cargo','tiene experiencia en liderazgo','puede dirigir un equipo','sirve para ser jefe'],
    a: `<p>Sí, y en tres escalas distintas:</p>
      <ul>
        <li><b>Equipo técnico:</b> lideró a <b>3 desarrolladores</b> como Coordinador de Desarrollo de Software
          (2021–2023), definiendo arquitectura, estándares de código, alcance y entregables.</li>
        <li><b>Equipo operativo grande:</b> coordinó <b>equipos de hasta 50 personas</b> como Director de Sistematización
          en Fundación Talentos, rediseñando flujos de información y procesos.</li>
        <li><b>Estructura distribuida:</b> administró la información de <b>cerca de 200 promotores</b> repartidos en tres
          departamentos —Magdalena, La Guajira y Cesar—.</li>
      </ul>
      <p>El resultado documentado de ese liderazgo: el equipo recibió <b>premiación nacional desde Bogotá</b> y fue
      tomado como <b>referente nacional de buenas prácticas</b> en cargue de información y gestión de proyectos.</p>
      <p>Un detalle relevante: asumió la dirección siendo el perfil más joven del equipo directivo, y fue por mérito.</p>`
  },
  {
    id: 'por-que-contratar', cat: 'Competencias',
    tags: ['por que contratar','contratar','vale la pena','conviene','ventaja','aporta','que gana la empresa','razones','beneficio'],
    q: ['por que deberiamos contratarlo','que aporta a una empresa','vale la pena contratarlo','que gano contratandolo'],
    a: `<p>Cinco razones concretas:</p>
      <ul>
        <li><b>Cubre un área completa, no una posición.</b> Hoy es literalmente el área de TI de una refinería:
          seguridad, redes, desarrollo, infraestructura e intranet. Una contratación que reemplaza varias.</li>
        <li><b>Diagnostica antes de construir.</b> Su formación industrial hace que no construya software innecesario.
          Detecta el problema real —como el error contable en cartera o las fallas de la plataforma de Petroil— y
          resuelve la causa.</li>
        <li><b>Entrega cosas que funcionan.</b> InventarioTienda está en producción con clientes reales y registrado
          ante la DNDA. La plataforma BPIN se ejecutó con recursos públicos y está certificada. No son demos.</li>
        <li><b>Lidera.</b> Equipos técnicos de desarrollo y equipos operativos de hasta 50 personas, con
          reconocimiento nacional por la ejecución.</li>
        <li><b>Trae capacidades adicionales sin costo extra:</b> dirección creativa, producción audiovisual, IA
          aplicada y realidad extendida. Áreas que una empresa mediana normalmente terceriza.</li>
      </ul>
      <p>Y algo que se ve en su historia: en cada rol le han ampliado el alcance por rendimiento. En la universidad
      lo movieron a un proyecto mayor; en Fundación Talentos le dieron una dirección siendo el más joven; en Petroil
      entró como practicante y terminó con la responsabilidad técnica integral.</p>`
  },
  {
    id: 'blandas', cat: 'Competencias',
    tags: ['habilidades blandas','soft skills','personalidad','como trabaja','forma de trabajar','autonomia','comunicacion','resolucion de problemas'],
    q: ['que habilidades blandas tiene','como es trabajando','es autonomo','como se comunica'],
    a: `<p>Lo que muestra su historial, más que una lista de adjetivos:</p>
      <ul>
        <li><b>Autonomía alta.</b> En Petroil no tenía supervisión técnica —no hay nadie más del área— y aun así
          levantó una auditoría de seguridad, resolvió bloqueos de red y arrancó dos productos digitales.</li>
        <li><b>Iniciativa.</b> Nadie le pidió revisar la seguridad de la plataforma corporativa ni maquetar un sitio
          web; lo hizo porque detectó el problema. Eso derivó en un encargo formal y una compensación adicional.</li>
        <li><b>Resolución de problemas técnicos difíciles.</b> Resolvió un driver de impresión térmica incompatible
          con el pipeline de Chromium implementando ESC/POS directamente, y un error contable que nadie había notado.</li>
        <li><b>Comunicación con no técnicos.</b> Durante años explicó realidad virtual a públicos que no la conocían,
          en colegios y universidades. Hoy traduce decisiones técnicas a un comité directivo sin área de TI.</li>
        <li><b>Mejora continua.</b> Formación industrial aplicada: rediseño de flujos, estandarización y calidad
          del dato como hábito, no como proyecto puntual.</li>
      </ul>`
  },
  {
    id: 'debilidades', cat: 'Competencias',
    tags: ['debilidades','defectos','limitaciones','que le falta','puntos debiles','riesgos','no sabe','carencias'],
    q: ['cuales son sus debilidades','que le falta','en que no es fuerte','que limitaciones tiene'],
    a: `<p>Con honestidad, porque conviene saberlo antes que después:</p>
      <ul>
        <li><b>Inglés B2 (intermedio).</b> Suficiente para documentación técnica y comunicación escrita, pero si el rol
          exige negociación fluida en inglés con clientes internacionales, hay una brecha real que cerrar.</li>
        <li><b>Ingeniería Industrial en curso</b> (2023–2026). La de Sistemas está terminada desde 2018; la segunda
          aún no.</li>
        <li><b>Perfil amplio.</b> Cubre desarrollo, infraestructura, seguridad, datos, diseño y XR. Si lo que buscas
          es un hiperespecialista en una sola tecnología de nicho, hay perfiles más estrechos y más profundos en
          ese punto. Su valor está en la integración y en la autonomía end-to-end.</li>
        <li><b>Experiencia en empresas grandes con procesos maduros.</b> Su trayectoria es en universidad pública,
          programas sociales, emprendimiento propio y una empresa sin área de TI. Sabe operar donde no hay estructura;
          entrar a una organización con procesos muy formalizados sería un contexto nuevo.</li>
      </ul>
      <p>Ninguna de estas es un impedimento para un rol senior, pero prefiero decírtelas a que las descubras en la
      entrevista.</p>`
  },

  /* ═══ DATOS DUROS ═══ */
  {
    id: 'educacion', cat: 'Datos',
    tags: ['educacion','estudios','universidad','titulo','carrera','grado','academico','formacion','graduado'],
    q: ['que estudio','donde estudio','tiene titulo','cual es su formacion academica','es profesional'],
    a: `<ul>
        <li><b>Ingeniería de Sistemas</b> — Universidad del Magdalena · <b>2018</b> (título obtenido).</li>
        <li><b>Ingeniería Industrial</b> — Universidad del Magdalena · <b>2023 – 2026</b> (en curso, fecha estimada de grado).</li>
      </ul>
      <p><b>Idiomas:</b> español nativo · inglés B2 (intermedio).</p>
      <p><b>Registro legal:</b> software de autoría propia registrado ante la <b>Dirección Nacional de Derecho de Autor</b>
      del Ministerio del Interior de Colombia — Libro–Tomo–Partida <b>13-93-10</b>.</p>
      <p>La Universidad del Magdalena es además donde acumula la mayor parte de su experiencia certificada: 5 órdenes
      de servicios profesionales entre 2021 y 2024.</p>`
  },
  {
    id: 'certificaciones', cat: 'Datos',
    tags: ['certificado','certificaciones','soportes','pruebas','verificable','dnda','derecho de autor','registro','ordenes','contratos','documentos'],
    q: ['que certificaciones tiene','como verifico su experiencia','tiene soportes','esto es verificable','que documentos respaldan esto'],
    a: `<p>Todo lo relevante está documentado:</p>
      <ul>
        <li><b>Certificado de órdenes de servicios profesionales</b> expedido por la Universidad del Magdalena
          —Grupo de Contratación, 07 de mayo de 2024— que acredita cinco vinculaciones:
          OPSP-VIN-0157-2024, OPSP-VIN-0158-2023, OPSP-VAD-1171-2022, OPSP-VEX-1182-2022 y OPSP-VAD-1429-2021.</li>
        <li><b>Registro de software ante la DNDA</b> (Dirección Nacional de Derecho de Autor, Ministerio del Interior) —
          Libro–Tomo–Partida 13-93-10.</li>
        <li><b>Proyecto BPIN 2020000100758</b>, ejecutado con recursos públicos de regalías y verificable en los
          sistemas de información del proyecto.</li>
        <li><b>VR Zone</b>: empresa activa con presencia pública verificable y 4.8/5 de calificación.</li>
        <li><b>Portafolio de diseño y contenido digital</b> disponible como documento aparte.</li>
      </ul>
      <p>Los documentos se pueden descargar desde la sección de contacto de este mismo sitio.</p>`
  },
  {
    id: 'contacto', cat: 'Datos',
    tags: ['contacto','contactar','correo','email','telefono','whatsapp','linkedin','github','escribir','llamar','hablar','comunicar'],
    q: ['como lo contacto','cual es su correo','tiene whatsapp','como me comunico con el','donde lo encuentro'],
    a: `<p>Directo y sin intermediarios:</p>
      <ul>
        <li><b>Correo:</b> edwinaguilera777@gmail.com</li>
        <li><b>Teléfono / WhatsApp:</b> +57 301 409 9377</li>
        <li><b>LinkedIn:</b> linkedin.com/in/edwin-belisario</li>
        <li><b>GitHub:</b> github.com/EdwinCalderonAguilera</li>
        <li><b>Ubicación:</b> Santa Marta, Magdalena, Colombia</li>
      </ul>
      <p>La hoja de vida completa está disponible para descarga en PDF y Word en la sección de contacto de este sitio.</p>`
  },
  {
    id: 'disponibilidad', cat: 'Datos',
    tags: ['disponibilidad','disponible','modalidad','remoto','presencial','hibrido','reubicacion','viajar','cuando puede empezar','roles','cargo','puesto'],
    q: ['esta disponible','trabaja remoto','que modalidad acepta','que cargos le interesan','puede viajar'],
    a: `<p><b>Modalidad:</b> presencial, híbrida o remota.</p>
      <p><b>Ubicación base:</b> Santa Marta, Magdalena, Colombia.</p>
      <p><b>Roles de interés:</b></p>
      <ul>
        <li>Ingeniero de Sistemas Senior</li>
        <li>Tech Lead / Líder Técnico</li>
        <li>Jefe o Coordinador de TI</li>
        <li>Arquitecto de Soluciones</li>
        <li>Líder de Transformación Digital</li>
      </ul>
      <p>Actualmente está vinculado a Petroil S.A. y se encuentra <b>abierto a conversar</b> propuestas que
      correspondan a su nivel de experiencia y responsabilidad.</p>`
  },
  {
    id: 'trayectoria-resumen', cat: 'Datos',
    tags: ['trayectoria','historia laboral','cronologia','donde ha trabajado','empleos','experiencia laboral','timeline','recorrido'],
    q: ['donde ha trabajado','cual es su trayectoria','hazme un resumen de su experiencia','en que empresas ha estado'],
    a: `<p>Once años, en orden cronológico inverso:</p>
      <ul>
        <li><b>2026 – actual</b> · Ingeniero de Tecnología y Transformación Digital — <b>Petroil S.A.</b> (refinería).
          Responsable técnico único de la organización.</li>
        <li><b>2023 – 2024</b> · Ingeniero de I+D, prototipado y señales biomédicas — <b>Universidad del Magdalena</b>,
          Vicerrectoría de Investigación.</li>
        <li><b>Sep 2021 – Feb 2023</b> · Coordinador de Desarrollo de Software y co-investigador —
          <b>Universidad del Magdalena</b>, proyecto BPIN. Equipo de 3 desarrolladores. COP $6.000.000 mensuales.</li>
        <li><b>Oct – Dic 2022</b> · Responsable de Seguridad e Integridad de la Información —
          <b>Universidad del Magdalena</b>, contrato ICBF N.º 228.</li>
        <li><b>May 2018 – actual</b> · Fundador y Director de Operaciones — <b>VR Zone</b>, primer centro de realidad
          virtual de Santa Marta.</li>
        <li><b>Feb 2016 – Dic 2019</b> · Director de Sistematización y Gestión de Información —
          <b>Fundación Talentos</b> (operador ICBF). Equipos de hasta 50 personas. ~COP $3.000.000 mensuales en 2016.</li>
        <li><b>Jul 2015 – Dic 2016</b> · Desarrollador de automatizaciones y gestor de bases de datos —
          <b>Universidad del Magdalena</b>, programa «Generaciones con Bienestar» (ICBF). Primer empleo, a los 17 años.</li>
      </ul>`
  },
  {
    id: 'ubicacion', cat: 'Datos',
    tags: ['donde vive','ubicacion','ciudad','santa marta','magdalena','colombia','reside','vive'],
    q: ['donde vive','de donde es','en que ciudad esta'],
    a: `<p>Vive en <b>Santa Marta, departamento del Magdalena, Colombia</b>, en la costa Caribe.</p>
      <p>Es también donde ha desarrollado prácticamente toda su carrera: la Universidad del Magdalena, VR Zone
      y Petroil S.A. están en esa ciudad.</p>
      <p>Trabaja en modalidad presencial, híbrida o remota.</p>`
  },
  {
    id: 'hdv-descarga', cat: 'Datos',
    tags: ['hoja de vida','cv','curriculum','descargar','pdf','word','documento','resumen descargable'],
    q: ['donde descargo su hoja de vida','tiene cv','puedo ver su curriculum','como obtengo el pdf'],
    a: `<p>Sí. Desde la sección de <b>contacto</b> de este sitio puedes descargar:</p>
      <ul>
        <li><b>Hoja de vida en PDF</b> — versión maquetada, 4 páginas.</li>
        <li><b>Hoja de vida en Word</b> — versión editable y legible por sistemas ATS.</li>
        <li><b>Portafolio de diseño y contenido digital</b> — piezas, marca, multimedia y XR.</li>
        <li><b>Certificado laboral</b> de la Universidad del Magdalena, que acredita las cinco órdenes de servicios profesionales.</li>
      </ul>
      <p>También hay botones de descarga directa en la parte superior de la página.</p>`
  }
  ]
};
