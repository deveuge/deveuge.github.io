import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../../static/css/404.css"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout id="not-found" location={location} title={siteTitle} post="null">
      <SEO title="404" />

      <article>
        <div class="stack">
          <span>PAGE NOT FOUND</span>
          <span>PAGE NOT FOUND</span>
          <span>PAGE NOT FOUND</span>
        </div>
        <p>Sorry! The page you are looking for does not exist.</p>
        <Link to="/">Back to home</Link>
      </article>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
