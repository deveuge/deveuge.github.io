import React from "react"
import { Link, graphql } from "gatsby"
import kebabCase from "lodash/kebabCase"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../../static/css/post.css"


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

      <article id="post">

        <div className="row justify-content-center">
          <div className="col-12 col-lg-8" style={{ padding: 0 }}>
            <div id="header-photo" data-aos="fade-right">
              {post.frontmatter.images.map((img, i) =>
                <img key={img} src={`../${img}`} className={i === 0 ? 'current' : ''} alt={post.frontmatter.title} />
              )}

              <div className="row">
                <button className="fas fa-angle-left col-2" id="left-slide" aria-label="Previous image" />
                <button className="fas fa-angle-right col-2" id="right-slide" aria-label="Next image" />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4" id="post-summary" data-aos="fade-left">
            <div>
              <h1>{post.frontmatter.title}</h1>
              <em>{post.frontmatter.description || post.excerpt}</em>
            </div>
            <div id="post-toc">
              <h2>Contents</h2>
              <div dangerouslySetInnerHTML={{ __html: post.tableOfContents }}></div>
            </div>
          </div>
        </div>

        <div id="article-content" data-aos="fade-up">
          <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
          <div id="tags">
            {post.frontmatter.tags.map((tag) =>
              <Link to={`/tags/${kebabCase(tag)}/`} key={tag}>{tag}</Link>
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

    </Layout >
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
      tableOfContents
      frontmatter {
        title
        description
        images
        codePreview
        livePreview
        tags
      }
    }
  }
`
