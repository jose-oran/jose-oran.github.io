export interface Project {
  repo: string;
  cvName: string;
  live: boolean;
  /** True for exploratory proof-of-concept work, not a replica of an already-solved production problem. */
  poc?: boolean;
  es: string;
  en: string;
}

export const projects: Project[] = [
  {
    repo: "reservation-system",
    cvName: "CV: Plataforma de Concursos en Tiempo Real",
    live: true,
    es: `Prototipo que documenta cómo resolver <em>double-booking</em> bajo concurrencia
      con un lock distribuido sobre Redis (patrón actor), probado con un test de
      integración real (10 requests concurrentes, Testcontainers) — no una demo, sino
      el razonamiento completo: problema, opciones consideradas, decisión, trade-offs.`,
    en: `A prototype documenting how to prevent double-booking under concurrency using a
      Redis-backed distributed lock (actor pattern), proven with a real integration
      test (10 concurrent requests, Testcontainers) — not a demo, the full reasoning:
      problem, options considered, decision, trade-offs.`,
  },
  {
    repo: "provider-gateway",
    cvName: "CV: API Gateway de Integración",
    live: true,
    es: `Prototipo que documenta cómo evitar que un proveedor externo caído tire abajo el
      servicio: REST + gRPC en el mismo host, y resiliencia real con Polly (retry +
      circuit breaker) probada contra un servidor HTTP real (WireMock.Net) — no una
      interfaz mockeada. Incluye una mejora deliberada sobre el patrón de producción
      (que no tiene circuit breaker ni lo testea) y explica el trade-off que acepto.`,
    en: `A prototype documenting how to keep a flaky external provider from taking the
      whole service down: REST + gRPC on the same host, and real Polly resilience
      (retry + circuit breaker) proven against a real HTTP server (WireMock.Net) — not
      a mocked interface. Includes a deliberate improvement over the production pattern
      (which has no circuit breaker and never tests it) and the trade-off I accept.`,
  },
  {
    repo: "event-catalog",
    cvName: "CV: Catálogo de Eventos con Event Sourcing",
    live: true,
    es: `Prototipo que documenta Event Sourcing real: reconstrucción de estado por replay
      puro sobre EventStoreDB, una proyección real (catch-up subscription) manteniendo
      un read model en MongoDB, y un worker de invalidación de caché disparado por
      MongoDB change streams que borra solo la key afectada en Redis. Construido como la
      versión completa que el sistema de producción dejó a medio camino — documentado
      con total honestidad en el README.`,
    en: `A prototype documenting real Event Sourcing: state rebuilt by pure replay over
      EventStoreDB, a real projection (catch-up subscription) keeping a MongoDB read
      model in sync, and a cache invalidation worker triggered by MongoDB change
      streams that deletes only the affected Redis key. Built as the complete version
      the production system left half-implemented — documented with full honesty in
      the README.`,
  },
  {
    repo: "cdc-modernization",
    cvName: "CV: Modernización de Change Data Capture",
    live: true,
    es: `Prototipo que documenta una modernización real de CDC: de N procesos con su propia
      conexión de polling a SQL Server, a una captura log-based compartida (SQL Server +
      Debezium reales) que múltiples equipos consumen sin multiplicar conexiones —
      probado contra \`sys.dm_exec_sessions\` real, no una explicación arquitectónica.
      Incluye una corrección honesta: el beneficio medido es consolidación de conexiones,
      no velocidad (los propios docs del POC real tenían números de latencia
      inconsistentes entre sí).`,
    en: `A prototype documenting a real CDC modernization: from N processes each holding
      their own polling connection to SQL Server, to a shared log-based capture (real
      SQL Server + Debezium) that multiple teams consume without multiplying
      connections — proven against real \`sys.dm_exec_sessions\`, not an architectural
      diagram. Includes an honest correction: the measured benefit is connection
      consolidation, not speed (the real POC's own docs reported inconsistent latency
      numbers).`,
  },
  {
    repo: "contract-driven-testing",
    cvName: "CV: Testing Guiado por Contratos",
    live: true,
    es: `Prototipo que documenta un contrato JSON como única fuente de verdad, generando
      fixtures de backend (.NET), handlers MSW de frontend y fixtures de Playwright — con
      una diferencia clave: cada salida generada se prueba <em>ejecutándola de verdad</em>
      (el C# compila con \`dotnet build\` real, los handlers MSW corren contra un \`fetch\`
      real, el fixture de Playwright se importa dinámicamente), no solo inspeccionando el
      texto generado. Incluye hallazgos reales del sistema que inspiró esto: un servidor
      mock con rutas registradas a mano, handlers MSW generados pero nunca conectados a la
      app, y un bug de \`baseURL\` evidenciado en logs de producción.`,
    en: `A prototype documenting a JSON contract as the single source of truth, generating
      backend (.NET) fixtures, frontend MSW handlers, and Playwright fixtures — with one
      key difference: every generated output is proven by <em>actually running it</em>
      (the C# compiles with a real \`dotnet build\`, the MSW handlers run against a real
      \`fetch\`, the Playwright fixture is dynamically imported), not just inspecting the
      generated text. Includes real findings from the system that inspired it: a mock
      server with hand-registered routes, generated MSW handlers never wired into the
      app, and a \`baseURL\` bug evidenced in production logs.`,
  },
  {
    repo: "gitops-pipeline",
    cvName: "CV: Pipeline CI/CD GitOps",
    live: true,
    es: `Prototipo que documenta gates de CI/CD que <em>realmente</em> bloquean, no reportes
      que nadie hace cumplir. El sistema real que lo inspiró valida el CHANGELOG antes de
      publicar, pero solo genera un reporte de cobertura sin ningún umbral que falle el
      build, y las "sync waves" de ArgoCD que promete el CV no existen en ningún manifiesto
      real. Acá se construyen las piezas que faltan: un umbral de cobertura que corta el
      build de verdad (probado shelleando \`dotnet test\` contra dos fixtures gemelas — la
      bien testeada pasa, la sub-testeada falla, comparando el código de salida real del
      proceso), sync waves genuinas y verificables sobre manifiestos de Kustomize reales, y
      el cierre del lazo entre CI y CD: el propio pipeline de GitHub Actions bumpea el tag
      de imagen y lo commitea de vuelta al repo, sin paso manual.`,
    en: `A prototype documenting CI/CD gates that <em>actually</em> block, not reports nobody
      enforces. The real system that inspired it validates the CHANGELOG before publishing,
      but only generates a coverage report with no threshold that fails the build, and the
      ArgoCD "sync waves" the CV promises don't exist in any real manifest. This builds the
      missing pieces: a coverage threshold that genuinely fails the build (proven by
      shelling out to \`dotnet test\` against two twin fixtures — the well-tested one passes,
      the under-tested one fails, comparing the real process exit code), genuine and
      verifiable sync waves over real Kustomize manifests, and closing the loop between CI
      and CD: the GitHub Actions pipeline itself bumps the image tag and commits it back to
      the repo, with no manual step.`,
  },
  {
    repo: "foundry-hosted-agent-dotnet",
    cvName: "PoC: Agente de IA Hosteado",
    live: true,
    poc: true,
    es: `Prueba de concepto para implementar, desde cero, un agente de IA hosteado — framework
      de agentes y protocolo de conversación con estado en .NET — como nueva iniciativa para
      evaluar cómo mejorar la integración de capacidades de IA a futuro. Documenta la
      fricción real de llevar esto a producción: en la suscripción de prueba solo un modelo
      tenía cuota real disponible, la autenticación se resolvió sin keys mediante identidad
      administrada del proveedor cloud, y el permiso para invocar el agente no lo resolvían
      los roles de IAM a nivel de recurso — hizo falta agregarse como usuario del proyecto
      desde el propio portal de administración del proveedor.`,
    en: `A proof of concept to implement, from scratch, a hosted AI agent — an agent framework
      and a stateful conversation protocol in .NET — as a new initiative to evaluate how to
      improve AI capability integration going forward. It documents the real friction of
      getting this into production: on the test subscription only one model had real quota
      available, authentication was solved keylessly via the cloud provider's managed
      identity, and the permission to invoke the agent wasn't solved by resource-level IAM
      roles alone — it took adding yourself as a project user from the provider's own admin
      portal.`,
  },
];
