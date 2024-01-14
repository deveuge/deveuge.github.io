import React from "react"
import { graphql } from "gatsby"

import "devicon/devicon.min.css"
import "../../static/css/about-me.css"

import Layout from "../components/layout"
import SEO from "../components/seo"

import HeaderSection from "../components/headerSection"
import Timeline, { TimelinePeriod, TimelineExperienceItem, TimelineEducationItem } from "../components/timeline"
import Skills, { SkillItem } from "../components/skills"

import { CurrentSkills } from "../templates/current-skills"

const AboutMePage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  const DownloadCVSection = () => {
    return (
      <div className="row justify-content-center">
        <div className="col-sm-10 col-lg-6" data-aos="fade-up">
          <div className="project-controls" style={{ justifyContent: 'center' }}>
            <a href="https://drive.google.com/file/d/1b0u6c3pwhoY1xpmOcDiYXAbxkgR9Sklt/view?usp=sharing" target="_blank" rel="noreferrer"><i className="fa-regular fa-file-pdf" style={{ marginRight: '0.5rem' }}></i> Descargar CV</a>
            <a href="https://drive.google.com/file/d/1ZCOJ7zBwYxlsNO0ajXR4Rz31T2FY4OYw/view?usp=sharing" target="_blank" rel="noreferrer" style={{ marginLeft: '0.5rem' }}>Download CV <i className="fa-solid fa-file-pdf" style={{ marginLeft: '0.5rem' }}></i></a>
          </div>
        </div>
      </div>
    )
  }

  const TimelineSection = () => {
    return (
      <Timeline>
        <TimelinePeriod name="Experience" />
        <TimelineExperienceItem
          period="FEB 2022 – PRESENT"
          title="Full Stack Web & Desktop Developer"
          company="Bahia Software – Galicia (Spain)"
          desc="Current lead developer of a new web centralized application written in Java for the billing of the Galician public health system, while making punctual maintenance of the current billing desktop application.
          Maintenance and development of new functionalities in multiple applications of the Galician public health system (pathological anatomy, kidney patients and hematopoietic progenitors)."
          technologies="Java Spring, Struts, Hibernate, Apache Camel, SOAP and REST web services, JUnit. Informix and Oracle Databases. VB6 on specific occasions." />
        <TimelineExperienceItem
          period="JUN 2019 – FEB 2022"
          title="Full Stack Web & Desktop Developer"
          company="Indra Minsait – Galicia (Spain)"
          desc="Analyst-programmer in architecture project for the Public Administration. Functions of development, analysis, support, documentation, testing, establishment of standards, patterns and archetypes for the architecture and research of new technologies for its evolution."
          technologies="Spring (MVC and Boot), Hibernate, Websockets, Apache CXF and Camel, SOAP and REST web services, SQL Server, JMeter, JUnit. Thymeleaf and React for the front-end. .NET on specific occasions." />
        <TimelineExperienceItem
          period="SEP 2018 – MAY 2019"
          title="Full Stack Web Developer & Android Developer"
          company="Movilgest Intersoft – Madrid (Spain)"
          desc="Development of web and Android applications communicated with each other through web services, oriented to mobility and logistics. Working with clients such as Iveco, Renault or Viscofan and communication with their ERP SAP."
          technologies="HTML5, CSS3, Javascript and JQuery with Thymeleaf and Bootstrap. Java Spring (MVC, Security, JPA), SOAP and REST web services. Android Studio, SQL Server, ZPL markup language, barcode treatment, Leaflet." />
        <TimelineExperienceItem
          period="APR 2018 – JUL 2018"
          title="Full Stack Web Developer"
          company="QR Group – Madrid (Spain)"
          desc="Development of a web ERP for project management aimed at the construction, installation and renovation sectors."
          technologies="PHP, HTML5, CSS3, Javascript, JQuery and MySQL." />
        <TimelinePeriod name="Education" />
        <TimelineEducationItem
          title="HNC Web Applications Development"
          school="Centro para la Innovación y Desarrollo de la Educación a Distancia – Madrid (Spain)"
          desc="Professional training with PHP focused on programming software
        for web applications."
          grade="9" />
        <TimelineEducationItem
          title="HNC Multiplatform Applications Development"
          school="IES Lázaro Cárdenas – Madrid (Spain)"
          desc="Professional training with Java focused on programming
          software for web, mobile and desktop applications. Candidate for the Extraordinary Vocational Training Awards for the 2017 - 2018 academic year of the Community of Madrid."
          withHonors={true}
          grade="9.5" />
        <TimelinePeriod name="Skills" />
      </Timeline>
    )
  }

  const SkillsSection = () => {
    return (
      <Skills>
        {CurrentSkills.map((skill, index) => {
          return (
            <SkillItem
              key={index}
              name={skill.name}
              className={skill.class}
              time={skill.time}
              icon={skill.icon}
              unused={skill.unused}
              year={skill.year} />
          )
        })}
      </Skills>
    )
  }

  return (
    <Layout location={location} title={siteTitle} post="null">
      <SEO title="About me" />
      <HeaderSection title="About me" subtitle="Curriculum Vitae" />
      <DownloadCVSection />
      <TimelineSection />
      <SkillsSection />
      <DownloadCVSection />
    </Layout>
  )
}

export default AboutMePage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
