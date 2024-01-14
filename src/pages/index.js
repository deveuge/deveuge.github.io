import React from "react"
import { Link, graphql } from "gatsby"

import "../../static/css/index.css"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { IndexHeaderSection } from "../components/headerSection"


const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  const AboutMe = () => {
    return (
      <div className="row justify-content-center">
        <div className="col-11 col-lg-8">
          <div id="about-section">
            <blockquote data-aos="fade-up"><p>Passionate full stack web developer, I am dedicated to building applications to offer robust, flexible, scalable, secure and easily maintainable solutions, adapted to each client.</p></blockquote>
            <Link to="/about" data-aos="fade-left">See my professional background <span class="fa-solid fa-angles-right"></span></Link>
          </div>
        </div>
      </div>
    )
  }

  const FeaturedProject = ({ node }) => {
    let title = node.frontmatter.title || node.fields.slug;
    return (
      <article key={node.fields.slug} className="featured-project" data-aos="fade-up">
        <div className="img">
          <img src={node.frontmatter.imagePreview} alt={title} />
        </div>
        <h3>{title}</h3>
        <div className="content">
          <p>{node.frontmatter.description}</p>
          <div className="project-controls">
            <a href={node.frontmatter.codePreview} target="_blank" rel="noreferrer" aria-label="See code" className={"hint--top" + (node.frontmatter.codePreview ? "" : " disabled")}><span></span></a>
            <a href={node.frontmatter.livePreview} target="_blank" rel="noreferrer" aria-label="Live demo" className={"hint--top" + (node.frontmatter.livePreview ? "" : " disabled")}><span></span></a>
            <Link to={node.fields.slug} aria-label="Details" className="hint--top">Learn more</Link>
          </div>
        </div>
      </article>
    )
  }

  const FeaturedProjects = ({ posts }) => {
    return (
      <div className="row justify-content-center">
        <div className="col-11 col-lg-8">
          <h2 class="index-title" data-content="Featured projects">Featured projects</h2>
          {posts.map(({ node }, index) => {
            return (
              index < 3 ? <FeaturedProject node={node} key={index} /> : null
            )
          })}
          <div id="btn-all-projects" data-aos="fade-left">
            <Link to="/projects">See all my projects <span class="fa-solid fa-angles-right"></span></Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" />
      <IndexHeaderSection />
      <AboutMe />
      <FeaturedProjects posts={posts} />
    </Layout >
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            imagePreview
            codePreview
            livePreview
            description
          }
        }
      }
    }
  }
`
