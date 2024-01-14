import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import debounce from "lodash/debounce"

import "../../static/css/index.css"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ProjectsList from "../components/projectList"


const Projects = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const allPosts = data.allMarkdownRemark.edges

  const emptyQuery = ""
  const [state, setState] = useState({
    filteredData: [],
    query: emptyQuery,
  })
  const { filteredData, query } = state
  const hasSearchResults = filteredData && query !== emptyQuery
  const posts = hasSearchResults ? filteredData : allPosts


  const handleInputChange = event => {
    debouncedSearch(event.target.value);
  }

  const debouncedSearch = debounce(function (query) {
    const posts = data.allMarkdownRemark.edges || []

    const filteredData = posts.filter(post => {
      const { description, title, tags } = post.node.frontmatter
      return (
        description.toLowerCase().includes(query.toLowerCase()) ||
        title.toLowerCase().includes(query.toLowerCase()) ||
        (tags && tags
          .join("")
          .toLowerCase()
          .includes(query.toLowerCase()))
      )
    })

    setState({
      query,
      filteredData,
    })
  }, 300);

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Projects" />
      <div className="row justify-content-center">
        <div className="col-11 col-lg-8">
          <div id="input-search">
            <input
              type="text"
              aria-label="Search"
              placeholder="Type to filter projects..."
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <ProjectsList posts={posts} />
    </Layout >
  )
}

export default Projects

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
