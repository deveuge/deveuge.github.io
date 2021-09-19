import React from "react"
import Helmet from "react-helmet"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import NotFoundImage from "../../static/img/404.svg"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle} post="null">
      <SEO title="404"/>

      <Helmet>
          <body className="container-fluid" id="not-found" />
      </Helmet>

      <article>
        <img src={NotFoundImage} />
        <h1>404 - No encontrado</h1>
        <p>La página que buscas no existe en este sitio web.</p>
        <Link to="/">Volver al inicio</Link>
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
