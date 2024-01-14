import React from "react"
import { Link } from "gatsby"

const Project = ({ node }) => {
    const rootPath = `${__PATH_PREFIX__}/`
    let title = node.frontmatter.title || node.fields.slug;
    return (
        <article key={node.fields.slug} className="col-12 col-lg-4 project-container" data-aos="fade-up">
            <div className="project">
                <div className="img">
                    <img src={rootPath + node.frontmatter.imagePreview} alt={title} />
                </div>
                <div className="content">
                    <h1>{title}</h1>
                    <p>{node.frontmatter.description}</p>
                    <div className="project-controls">
                        <a href={node.frontmatter.codePreview} target="_blank" rel="noreferrer" aria-label="See code" className={"hint--top" + (node.frontmatter.codePreview ? "" : " disabled")}><span></span></a>
                        <a href={node.frontmatter.livePreview} target="_blank" rel="noreferrer" aria-label="Live demo" className={"hint--top" + (node.frontmatter.livePreview ? "" : " disabled")}><span></span></a>
                        <Link to={node.fields.slug} aria-label="Details" className="hint--top">Learn more</Link>
                    </div>
                </div>
            </div>
        </article>
    )
}

const ProjectsList = ({ posts }) => {
    return (
        <div className="row justify-content-center">
            <div className="col-11 col-lg-8">
                <div className="row">
                    {posts.map(({ node }, index) => {
                        return (
                            <Project node={node} key={index} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ProjectsList
