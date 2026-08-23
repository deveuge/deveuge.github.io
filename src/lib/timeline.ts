export interface ExperienceItem {
  period: string
  title: string
  company: string
  description: string
  technologies: string
}

export interface CertificateItem {
  title: string
  company: string
  date: string
}

export interface EducationItem {
  title: string
  school: string
  description: string
  withHonors?: boolean
  grade: string
}

export const experience: ExperienceItem[] = [
  {
    period: "FEB 2022 – PRESENT",
    title: "Senior Java Software Engineer",
    company: "Bahia Software – Galicia (Spain)",
    description:
      "Technical leadership and core development of a centralized healthcare billing platform for the Galician public health system (SERGAS), replacing a distributed legacy solution, taking end-to-end ownership of critical system workflows and acting as the team’s technical reference.",
    technologies:
      "Java Spring, Struts, Hibernate, Apache Camel, SOAP and REST web services, JUnit, SonarQube. Informix and Oracle Databases. VB6 on specific occasions.",
  },
  {
    period: "JUN 2019 – FEB 2022",
    title: "Java Software Engineer",
    company: "Indra Minsait – Galicia (Spain)",
    description:
      "Participation in architecture initiatives for enterprise systems, combining software development, definition of technical standards, and platform evolution.",
    technologies:
      "Spring (MVC and Boot), Hibernate, Websockets, ActiveMQ, Apache CXF and Camel, SOAP and REST web services, SQL Server, JMeter, JUnit. Thymeleaf and React for the front-end. .NET on specific occasions.",
  },
  {
    period: "SEP 2018 – MAY 2019",
    title: "Java Software Developer",
    company: "Movilges Intersoft – Madrid (Spain)",
    description:
      "Development of web and Android solutions for logistics and mobility operations, aimed at enterprise clients such as Iveco, Renault, and Viscofan.",
    technologies:
      "Java Spring (MVC, Security, JPA), SOAP and REST web services. Android Studio, SQL Server, ZPL markup language, barcode treatment, Leaflet. HTML5, CSS3, Javascript and JQuery with Thymeleaf and Bootstrap.",
  },
  {
    period: "APR 2018 – JUL 2018",
    title: "Full Stack Developer",
    company: "QR Group – Madrid (Spain)",
    description:
      "Contributed to the development of a web-based ERP platform for managing construction, installation, and renovation projects.",
    technologies: "PHP, HTML5, CSS3, Javascript, JQuery and MySQL.",
  },
]

export const certifications: CertificateItem[] = [
  { title: "Microsoft Certified: Azure AI Fundamentals", company: "Microsoft", date: "MAY 2024" },
  {
    title: "Spring Boot and Spring Cloud – Cloud Microservices Architecture",
    company: "Xunta de Galicia",
    date: "MAY 2024",
  },
  { title: "Cambridge English Advanced (C1)", company: "Cambridge Assessment English", date: "DEC 2023" },
  { title: "ITIL Foundation", company: "AXELOS Global Best Practice", date: "AUG 2022" },
]

export const education: EducationItem[] = [
  {
    title: "Higher Vocational Degree in Web Application Development",
    school: "Centro para la Innovación y Desarrollo de la Educación a Distancia – Madrid (Spain)",
    description: "Professional training with PHP focused on programming software for web applications.",
    grade: "9",
  },
  {
    title: "Higher Vocational Degree in Multiplatform Application Development",
    school: "IES Lázaro Cárdenas – Madrid (Spain)",
    description:
      "Professional training with Java focused on programming software for web, mobile and desktop applications. Candidate for the Extraordinary Vocational Training Awards for the 2017 - 2018 academic year of the Community of Madrid.",
    withHonors: true,
    grade: "9.5",
  },
]
