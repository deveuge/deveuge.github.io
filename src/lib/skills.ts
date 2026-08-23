export type SkillCategory = "language" | "database" | "library" | "server"

export interface Skill {
  name: string
  category: SkillCategory
  time: string
  icon: string
  /** Deprioritized in the UI: no longer actively used, kept for history. */
  unused?: boolean
  /** Year the skill was first used, when known. */
  year?: number
}

export const skills: Skill[] = [
  { name: "Java", category: "language", time: "+ X years", icon: "devicon-java-plain", year: 2018 },
  { name: "JavaScript", category: "language", time: "+ X years", icon: "devicon-javascript-plain", year: 2018 },
  { name: "CSS", category: "language", time: "+ X years", icon: "devicon-css3-plain", year: 2018 },
  { name: "HTML", category: "language", time: "+ X years", icon: "devicon-html5-plain", year: 2018 },
  { name: "VB/.NET", category: "language", unused: true, time: "Sporadically", icon: "devicon-dot-net-plain" },
  { name: "PHP", category: "language", unused: true, time: "< 1 year", icon: "devicon-php-plain" },
  { name: "MySQL", category: "database", time: "< 1 year", icon: "devicon-mysql-plain" },
  { name: "MS SQL Server", category: "database", time: "+ 3 years", icon: "devicon-microsoftsqlserver-plain" },
  { name: "Informix", category: "database", time: "+ X years", icon: "fa-solid fa-database", year: 2022 },
  { name: "Oracle", category: "database", unused: true, time: "Sporadically", icon: "devicon-oracle-plain" },
  { name: "Spring", category: "library", time: "+ X years", icon: "devicon-spring-plain", year: 2018 },
  { name: "Thymeleaf", category: "library", time: "+ X years", icon: "fa-solid fa-leaf", year: 2018 },
  { name: "Bootstrap", category: "library", time: "+ X years", icon: "devicon-bootstrap-plain", year: 2018 },
  { name: "JQuery", category: "library", time: "+ X years", icon: "devicon-jquery-plain", year: 2018 },
  { name: "Jasper Reports", category: "library", time: "+ 3 years", icon: "fa-regular fa-file-pdf" },
  { name: "React", category: "library", time: "< 1 year", icon: "devicon-react-original" },
  { name: "ELK", category: "library", unused: true, time: "< 1 year", icon: "fa-solid fa-boxes-stacked" },
  { name: "JBoss", category: "server", time: "+ 3 years", icon: "devicon-redhat-plain" },
  { name: "Apache", category: "server", time: "+ X years", icon: "devicon-apache-plain", year: 2019 },
  { name: "Tomcat", category: "server", time: "+ X years", icon: "devicon-tomcat-line", year: 2022 },
]
