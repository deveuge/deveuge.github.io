import React from "react"
import { Link } from "gatsby"

const FooterSection = () => {

    const waves = (
        <div id="footer-section">
            <div className="waves"></div>
        </div>
    )

    const footerLinks = (
        <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/projects">Projects</Link></li>
        </ul>
    )

    const socialLinks = (
        <ul className="social-icons">
            <li>
                <a href="https://github.com/deveuge" target="_blank" rel="noreferrer" className="hint--top" aria-label="Github">
                    <span className="fa-brands fa-github-alt"></span>
                </a>
            </li>
        </ul>
    )

    const footer = (
        <footer className="row justify-content-center align-items-center">
            <div className="col-12 col-md-3 order-lg-last">
                {footerLinks}
            </div>
            <div className="col-12 col-md-6">
                {socialLinks}
                <small>Copyright &copy; 2022 - {new Date().getFullYear()}. All Rights Reserved.</small>
            </div>
        </footer>
    )

    return (
        <React.Fragment>
            {waves}
            {footer}
        </React.Fragment>
    )
}

export default FooterSection
