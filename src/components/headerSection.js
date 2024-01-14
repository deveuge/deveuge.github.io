import React from "react"

import avatar from "../../static/img/avatar.svg"

export const IndexHeaderSection = () => {
    return (
        <header className="home-title" id="header-section">
            <div className="waves"></div>
            <div>
                <img src={avatar} alt="Deveuge" />
                <div className="title">
                    <h1>deveuge<span className="fa-solid fa-code fa-beat"></span></h1>
                </div>
                <div className="role">
                    <p>Software Developer</p>
                </div>
            </div>
        </header>
    )
}

const HeaderSection = ({ title, subtitle }) => {
    return (
        <header id="header-section" data-aos="fade-up">
            <div className="waves"></div>
            <div>
                <h1>{title}</h1>
                <p>{subtitle}</p>
            </div>
        </header>
    )
}

export default HeaderSection
