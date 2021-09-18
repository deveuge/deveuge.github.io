import React from "react"
import Helmet from 'react-helmet'
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"


const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle} post={post.frontmatter}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />

      <Helmet>
          <body className="container-fluid" id="post" />
      </Helmet>

      <article>
        <div id="slideshow">
          <img src={`../${post.frontmatter.image01}`} alt="Imagen del proyecto" />
          <div className="row">
            <img className="col-4" src={`../${post.frontmatter.image01}`} alt="Imagen del proyecto"/>
            <img className="col-4" src={`../${post.frontmatter.image02}`}  alt="Imagen del proyecto"/>
            <img className="col-4" src={`../${post.frontmatter.image03}`}  alt="Imagen del proyecto"/>
          </div>
        </div>

        <div id="article-content">
          <div dangerouslySetInnerHTML={{ __html: post.html }}></div>

          <div id="tags">
            {post.frontmatter.tags.map((tag) =>
              <span class="fas fa-code" aria-label={tag}></span>
            )}
          </div>
        </div>
      </article>

      <nav id="pagination">
        <ul>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                <span className="fas fa-angle-left"></span> {next.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                {previous.frontmatter.title} <span className="fas fa-angle-right"></span>
              </Link>
            )}
          </li>
        </ul>
      </nav>

    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        image01
        image02
        image03
        codePreview
        livePreview
        tags
      }
    }
  }
`
