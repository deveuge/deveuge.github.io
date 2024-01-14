import React from "react"

export const TimelinePeriod = ({ name }) => {
    return (
        <li className="timeline-item period" data-aos="fade-up">
            <div className="timeline-info"></div>
            <div className="timeline-marker"></div>
            <div className="timeline-content">
                <h2>{name}</h2>
            </div>
        </li>
    )
}

export const TimelineEducationItem = ({ title, school, desc, withHonors, grade }) => {
    return (
        <li className="timeline-item" data-aos="fade-up">
            <div className="timeline-info">
            </div>
            <div className="timeline-marker"></div>
            <div className="timeline-content">
                <h3>{title}</h3>
                <h4>{school}</h4>
                <p>{desc}</p>
                <p>Graduated with {withHonors ? 'honors and' : 'an'} average grade of <strong>{grade}</strong>.</p>
            </div>
        </li>
    )
}

export const TimelineExperienceItem = ({ period, title, company, desc, technologies }) => {
    return (
        <li className="timeline-item" data-aos="fade-up">
            <div className="timeline-info">
                <span>{period}</span>
            </div>
            <div className="timeline-marker"></div>
            <div className="timeline-content">
                <h3>{title}</h3>
                <h4>{company}</h4>
                <p>{desc}</p>
                <p><strong>Technologies</strong>: {technologies}</p>
            </div>
        </li>
    )
}

const Timeline = ({ children }) => {
    return (
        <div className="row justify-content-center">
            <div className="col-sm-10 col-lg-6">
                <ul className="timeline">
                    {children}
                </ul>
            </div>
        </div>
    )
}

export default Timeline
