import React, { useEffect } from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
import logo from "../../static/img/favicon-alt.svg"

import "aos/dist/aos.css";
import AOS from "aos"

const Layout = ({ location, title, children, post }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header, logoElement
  const columnSize = (location.pathname === rootPath) ? 6 : 4
  const columnSizeAlt = (location.pathname === rootPath) ? 6 : 8

  useEffect(() => {
    AOS.init({
      once: true});
  }, []);

  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/avatar.png/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          description
          subtitle
          author {
            name
            summary
          }
          social {
            github
            email
          }
        }
      }
    }
  `)

  const { description, subtitle, author, social  } = data.site.siteMetadata

  logoElement = (
    <Link id="logo" to="/">
      <img src={logo} alt="Logo" />
      <h1>{title}</h1>
      <span>{subtitle}</span>
    </Link>
  )

  if (location.pathname === rootPath) {
    header = (
      <div className="align-self-center">
				<div id="wave"></div>
				<div id="dark-mode-wrapper" className="hint--top" aria-label="Modo oscuro">
					<span id="dark-mode"></span>
				</div>
				{logoElement}
				<p id="description">{description}</p>
				<ul id="menu">
					<li aria-label="Github" className="hint--bottom"><a href={`https://github.com/${social.github}`} target="_blank" rel="noreferrer" className="fab fa-fw fa-github-alt"></a></li>
					<li aria-label="Email" className="hint--bottom"><a href={`mailto:${social.email}`} className="fas fa-fw fa-at"></a></li>
				</ul>
			</div>
    )
  } else {
    header = (
      <div className="align-self-center">
        <div id="wave"></div>
        <div id="dark-mode-wrapper" className="hint--top" aria-label="Modo oscuro">
          <span id="dark-mode"></span>
        </div>
        {logoElement}
				<p id="description">
					{post.description}
				</p>
				<div id="post-controls">
					<Link to="/" className="hint--bottom" aria-label="Atrás"><span></span></Link>
					<a href={post.codePreview} target="_blank" rel="noreferrer" className="hint--bottom" aria-label="Ver código"><span></span></a>
					<a href={post.livePreview} target="_blank" rel="noreferrer" className={"hint--bottom" + (post.livePreview ? "" : " disabled")} aria-label="Previsualizar"><span></span></a>
				</div>
			</div>
    )
  }

  return (
    <div id="body-wrapper">

      <div className="row center">
        <aside className={`col-12 col-lg-${columnSize} d-flex`} data-aos="fade-right">
          {header}
        </aside>
      </div>

      <main className={`col-12 col-lg-${columnSizeAlt} offset-lg-${columnSize}`}>
  			<div className="row" id="projects-wrapper">
          {children}
        </div>

        <footer>
          <small className="col">© {author.name} 2020-{new Date().getFullYear()}</small>
        </footer>
  		</main>

  	</div>

  )
}

export default Layout
