export type RadarRing = "adopt" | "trial" | "assess" | "hold"

export type RadarQuadrant = "languages-data" | "frameworks-libraries" | "delivery-tooling" | "architecture-platforms"

export interface RadarEntry {
  name: string
  quadrant: RadarQuadrant
  ring: RadarRing
  icon: string
  /** The opinion itself — why it sits in this ring, not just what it is. */
  blurb: string
}

export const RADAR_RINGS: { key: RadarRing; label: string }[] = [
  { key: "adopt", label: "Adopt" },
  { key: "trial", label: "Trial" },
  { key: "assess", label: "Assess" },
  { key: "hold", label: "Hold" },
]

export const RADAR_QUADRANTS: { key: RadarQuadrant; label: string }[] = [
  { key: "languages-data", label: "Languages & data" },
  { key: "frameworks-libraries", label: "Frameworks & libraries" },
  { key: "delivery-tooling", label: "Delivery & tooling" },
  { key: "architecture-platforms", label: "Architecture & platforms" },
]

export const techRadar: RadarEntry[] = [
  // Languages & data
  {
    name: "Java",
    quadrant: "languages-data",
    ring: "adopt",
    icon: "devicon-java-plain",
    blurb: "Primary language for 8 years. JVM tooling and ecosystem maturity make it the safe default for backend services.",
  },
  {
    name: "PL/SQL",
    quadrant: "languages-data",
    ring: "adopt",
    icon: "fa-solid fa-code",
    blurb: "Fastest path to correct, performant queries on data-heavy logic — I reach for it before hiding a hot query behind an ORM.",
  },
  {
    name: "PostgreSQL",
    quadrant: "languages-data",
    ring: "trial",
    icon: "devicon-postgresql-plain",
    blurb: "Open tooling, no licensing friction, and a feature set that covers everything I've needed from a relational database so far.",
  },
  {
    name: "JavaScript",
    quadrant: "languages-data",
    ring: "trial",
    icon: "devicon-javascript-plain",
    blurb: "Comfortable, but I still default to it for frontend and tooling glue rather than as a primary service language.",
  },
  {
    name: "MS SQL Server",
    quadrant: "languages-data",
    ring: "hold",
    icon: "devicon-microsoftsqlserver-plain",
    blurb: "Reliable, but licensing cost and vendor lock-in make it a fallback, not a first choice for a new system.",
  },
  {
    name: "Informix",
    quadrant: "languages-data",
    ring: "hold",
    icon: "fa-solid fa-database",
    blurb: "Actively being phased out. Legacy-only at this point — no reason to invest further.",
  },

  // Frameworks & libraries
  {
    name: "Spring",
    quadrant: "frameworks-libraries",
    ring: "adopt",
    icon: "devicon-spring-plain",
    blurb: "Still the best-in-class DI/AOP story for Java. My default backend framework, no real contender yet.",
  },
  {
    name: "Hibernate / JPA",
    quadrant: "frameworks-libraries",
    ring: "trial",
    icon: "devicon-hibernate-plain",
    blurb: "Powerful, but I've been burned by hidden N+1 queries enough to review generated SQL on every non-trivial mapping.",
  },
  {
    name: "React",
    quadrant: "frameworks-libraries",
    ring: "trial",
    icon: "devicon-react-original",
    blurb: "Comfortable for CRUD-heavy interfaces — forms and tables where the backend carries the real complexity. Haven't tested it on anything with genuinely complex client-side state.",
  },
  {
    name: "GraphQL",
    quadrant: "frameworks-libraries",
    ring: "assess",
    icon: "devicon-graphql-plain",
    blurb: "Watching where it earns its complexity next to plain REST before recommending it on a new service.",
  },
  {
    name: "Jasper Reports",
    quadrant: "frameworks-libraries",
    ring: "trial",
    icon: "fa-regular fa-file-pdf",
    blurb: "Haven't touched reporting in a while, but of what I've tried — BIRT was painful, PDFBox is solid but heavier than I'd like — Jasper is still where I'd start.",
  },
  {
    name: "Thymeleaf / Bootstrap / jQuery",
    quadrant: "frameworks-libraries",
    ring: "hold",
    icon: "devicon-bootstrap-plain",
    blurb: "Server-rendered templates and jQuery DOM-poking did the job for years, but I moved off that stack on purpose — a proper component model scales better once the UI gets any real interactivity.",
  },

  // Delivery & tooling
  {
    name: "Git",
    quadrant: "delivery-tooling",
    ring: "adopt",
    icon: "devicon-git-plain",
    blurb: "Non-negotiable baseline. Everything else in this radar is downstream of a clean history and branching model.",
  },
  {
    name: "JUnit / Mockito",
    quadrant: "delivery-tooling",
    ring: "adopt",
    icon: "fa-solid fa-vial",
    blurb: "Test coverage on business logic isn't optional. These stay the default toolkit regardless of the project.",
  },
  {
    name: "SonarQube",
    quadrant: "delivery-tooling",
    ring: "adopt",
    icon: "fa-solid fa-magnifying-glass-chart",
    blurb: "Cheap, early warning for the kind of duplication and complexity that turns into real production bugs later.",
  },
  {
    name: "Jenkins",
    quadrant: "delivery-tooling",
    ring: "assess",
    icon: "devicon-jenkins-line",
    blurb: "Worked with pipelines someone else built — here and with Azure DevOps elsewhere — never owned the configuration myself. Reserving judgment until that's actually my call.",
  },
  {
    name: "Maven",
    quadrant: "delivery-tooling",
    ring: "trial",
    icon: "devicon-maven-plain",
    blurb: "Fine day to day, but build speed on larger multi-module projects keeps me curious about Gradle.",
  },
  {
    name: "ELK",
    quadrant: "delivery-tooling",
    ring: "assess",
    icon: "fa-solid fa-boxes-stacked",
    blurb: "Only brief, surface-level exposure — enough to see the value of centralized structured logging, not enough to have a strong opinion on ELK specifically versus alternatives.",
  },

  // Architecture & platforms
  {
    name: "Microservices",
    quadrant: "architecture-platforms",
    ring: "trial",
    icon: "fa-solid fa-diagram-project",
    blurb: "Right call once team and domain boundaries justify the operational cost — the wrong default for a small system.",
  },
  {
    name: "AI / LLM tooling",
    quadrant: "architecture-platforms",
    ring: "trial",
    icon: "fa-solid fa-robot",
    blurb: "Actively integrating into day-to-day development and product features. Still forming firm opinions on where it belongs in production.",
  },
  {
    name: "REST",
    quadrant: "architecture-platforms",
    ring: "adopt",
    icon: "fa-solid fa-network-wired",
    blurb: "Default choice for new services — simple, cacheable, and the tooling around it (OpenAPI, client generation, testing) is hard to beat for most integration needs.",
  },
  {
    name: "SOAP",
    quadrant: "architecture-platforms",
    ring: "hold",
    icon: "fa-solid fa-scroll",
    blurb: "Still shows up integrating with older enterprise systems that never moved on, but I wouldn't reach for it on anything new — the WSDL/XML overhead buys little over REST today.",
  },
  {
    name: "Apache Camel",
    quadrant: "architecture-platforms",
    ring: "trial",
    icon: "fa-solid fa-route",
    blurb: "Routing, transformations and conditional flow redirection earned their keep once there was more than one protocol to reconcile — genuinely useful, not just DSL for its own sake.",
  },
  {
    name: "HL7",
    quadrant: "architecture-platforms",
    ring: "adopt",
    icon: "fa-solid fa-notes-medical",
    blurb: "Read and interpreted a wide range of message types — ADT, SIU, SQR^S25, RSP^K21 and others — mapping each into our business entities through HAPI parsing. Solid grasp of the healthcare interoperability domain itself.",
  },
  {
    name: "JBoss / Tomcat",
    quadrant: "architecture-platforms",
    ring: "hold",
    icon: "devicon-redhat-plain",
    blurb: "Stable app servers, but I'd default to a lighter embedded runtime (Spring Boot) for anything greenfield.",
  },
]
