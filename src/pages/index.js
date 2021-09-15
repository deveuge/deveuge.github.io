import React from "react"
import Helmet from 'react-helmet'
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"


const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Inicio" />

      <Helmet>
          <body className="container-fluid" id="home" />
      </Helmet>

      {posts.map(({ node }, index) => {
        const isBigProject = index % 3 === 0;
        const title = node.frontmatter.title || node.fields.slug
        return (
          <figure key={node.fields.slug} data-aos="fade-up" className={isBigProject ? "col-12" : "col-lg-6"}>
  					<img src={node.frontmatter.imagePreview} alt="Proyecto" />
            <p>{node.frontmatter.description}</p>
  					<figcaption>
  						<h2>{title}</h2>
  						<a href={node.frontmatter.codePreview} target="_blank" rel="noreferrer" aria-label="Ver código" className="hint--top"><span></span></a>
  						<a href={node.frontmatter.livePreview} target="_blank" rel="noreferrer" aria-label="Previsualizar" className={"hint--top" + (node.frontmatter.livePreview ? "" : " disabled")}><span></span></a>
  						<Link to={node.fields.slug} aria-label="Detalles" className="hint--top"><span></span></Link>
  					</figcaption>
  				</figure>
        )
      })}

    </Layout>
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
