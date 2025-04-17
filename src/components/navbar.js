import React from "react"
import { Link } from "gatsby"
import "../../static/css/navbar.css"
import logo from "../../static/img/icon.png"

const Navbar = ({ location }) => {
    const rootPath = `${__PATH_PREFIX__}/`
    const isIndex = (location.pathname === rootPath)

    const logoElement = (
        <Link className="logo" to="/">
            <img src={logo} alt="Logo" width="32px" />
            <span>deveuge</span>
        </Link>
    )

    const themeToggler = (
        <button
            className="theme-toggle"
            id="theme-toggle"
            title="Toggle theme"
            aria-label="light"
            aria-live="polite"
        >
            <svg
                className="sun-and-moon"
                aria-hidden="true"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <mask className="moon" id="moon-mask">
                    <rect x="0" y="0" width="100%" height="100%" fill="white"></rect>
                    <circle cx="24" cy="10" r="6" fill="black"></circle>
                </mask>
                <circle
                    className="sun"
                    cx="12"
                    cy="12"
                    r="6"
                    mask="url(#moon-mask)"
                    fill="currentColor"
                ></circle>
                <g className="sun-beams" stroke="currentColor">
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </g>
            </svg>
        </button>
    )

    const menuIcon = (
        <div id="menu-icon">
            <span></span>
        </div>
    )

    const topBar = (
        <nav className="navbar">
            {logoElement}
            <div className="d-flex">
                {themeToggler}
                {menuIcon}
            </div>
        </nav>
    )

    const menuOverlay = (
        <div id="menu-overlay"></div>
    )

    const menu = (
        <aside id="nav-container" className="col-10 col-md-5 col-lg-4">
            <ul id="navigation">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/projects">Projects</Link></li>
            </ul>
        </aside>
    )

    const readProgress = (
        <progress value="0"></progress>
    )

    return (
        <React.Fragment>
            {topBar}
            {isIndex ? null : readProgress}
            {menuOverlay}
            {menu}
        </React.Fragment>
    )
}

export default Navbar
