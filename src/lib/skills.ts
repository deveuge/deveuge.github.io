export type SkillCategory = "language" | "database" | "framework" | "tooling" | "integration" | "server"

export interface Skill {
  name: string
  category: SkillCategory
  /** Fixed label — only used (and required in practice) when `year` is absent, since a `year` makes the duration computed automatically. */
  time?: string
  icon: string
  /** Deprioritized in the UI: no longer actively used, kept for history. */
  unused?: boolean
  /** Year the skill was first used. When set, the displayed duration is computed automatically instead of relying on a hand-written `time`. */
  year?: number
  /** Year the skill stopped being used. Freezes the computed duration instead of letting it keep growing every year. */
  endYear?: number
}

export const skills: Skill[] = [
  { name: "Java", category: "language", icon: "devicon-java-plain", year: 2018 },
  { name: "JavaScript", category: "language", icon: "devicon-javascript-plain", year: 2018 },
  { name: "CSS", category: "language", icon: "devicon-css3-plain", year: 2018 },
  { name: "HTML", category: "language", icon: "devicon-html5-plain", year: 2018 },
  { name: "PL/SQL", category: "language", icon: "fa-solid fa-code", year: 2018 },
  { name: "VB/.NET", category: "language", unused: true, time: "Sporadically", icon: "devicon-dot-net-plain" },
  { name: "PHP", category: "language", unused: true, time: "< 1 year", icon: "devicon-php-plain" },
  { name: "MySQL", category: "database", time: "< 1 year", icon: "devicon-mysql-plain" },
  { name: "PostgreSQL", category: "database", icon: "devicon-postgresql-plain", year: 2026 },
  { name: "MS SQL Server", category: "database", time: "+ 3 years", icon: "devicon-microsoftsqlserver-plain" },
  { name: "Informix", category: "database", icon: "fa-solid fa-database", year: 2022, endYear: 2026 },
  { name: "Oracle", category: "database", unused: true, time: "Sporadically", icon: "devicon-oracle-plain" },
  { name: "Spring", category: "framework", icon: "devicon-spring-plain", year: 2018 },
  { name: "Spring Security", category: "framework", icon: "fa-solid fa-shield-halved", year: 2019 },
  { name: "Hibernate", category: "framework", icon: "devicon-hibernate-plain", year: 2018 },
  { name: "JPA", category: "framework", icon: "fa-solid fa-layer-group", year: 2018 },
  { name: "Thymeleaf", category: "framework", unused: true, icon: "fa-solid fa-leaf", year: 2018, endYear: 2026 },
  { name: "Bootstrap", category: "framework", unused: true, icon: "devicon-bootstrap-plain", year: 2018, endYear: 2026 },
  { name: "JQuery", category: "framework", unused: true, icon: "devicon-jquery-plain", year: 2018, endYear: 2026 },
  { name: "Jasper Reports", category: "framework", time: "+ 3 years", icon: "fa-regular fa-file-pdf" },
  { name: "React", category: "framework", time: "< 1 year", icon: "devicon-react-original" },
  { name: "GraphQL", category: "framework", icon: "devicon-graphql-plain", year: 2026 },
  { name: "AI", category: "framework", icon: "fa-solid fa-robot", year: 2026 },
  { name: "Git", category: "tooling", icon: "devicon-git-plain", year: 2018 },
  { name: "Maven", category: "tooling", icon: "devicon-maven-plain", year: 2018 },
  { name: "JUnit", category: "tooling", icon: "fa-solid fa-vial", year: 2018 },
  { name: "Mockito", category: "tooling", icon: "fa-solid fa-vial-circle-check", year: 2018 },
  { name: "Jenkins", category: "tooling", icon: "devicon-jenkins-line", year: 2019 },
  { name: "SonarQube", category: "tooling", icon: "fa-solid fa-magnifying-glass-chart", year: 2019 },
  { name: "ELK", category: "tooling", unused: true, time: "< 1 year", icon: "fa-solid fa-boxes-stacked" },
  { name: "REST/SOAP", category: "integration", icon: "fa-solid fa-network-wired", year: 2018 },
  { name: "Apache Camel", category: "integration", icon: "fa-solid fa-route", year: 2022, endYear: 2026 },
  { name: "HL7", category: "integration", icon: "fa-solid fa-notes-medical", year: 2022, endYear: 2026 },
  { name: "ActiveMQ", category: "integration", icon: "fa-solid fa-shuffle", year: 2020, endYear: 2022 },
  { name: "Microservices", category: "integration", icon: "fa-solid fa-diagram-project", year: 2026 },
  { name: "JBoss", category: "server", time: "+ 3 years", icon: "devicon-redhat-plain" },
  { name: "Apache", category: "server", icon: "devicon-apache-plain", year: 2019 },
  { name: "Tomcat", category: "server", icon: "devicon-tomcat-line", year: 2022 },
]
