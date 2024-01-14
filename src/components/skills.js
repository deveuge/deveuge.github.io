import React from "react"
import Isotope from "isotope-layout/js/isotope";

export const SkillItem = ({ name, className, time, icon, unused, year }) => {
    var fullTime = time;
    if (year) {
        fullTime = time.replace(/X/g, (new Date().getFullYear() - year));
    }
    return (
        <div className={"element-item " + className + (unused ? ' unused' : '')} data-category={className}>
            <span className={icon}></span>
            <h3 className="name">{name}</h3>
            <em>{fullTime}</em>
        </div>
    )
}

const Skills = ({ children }) => {

    const [isotope, setIsotope] = React.useState(null);
    const [filterKey, setFilterKey] = React.useState('*');

    React.useEffect(() => {
        setIsotope(
            new Isotope('.grid', {
                itemSelector: '.element-item',
                getSortData: {
                    name: '.name',
                    category: '[data-category]'
                },
                masonry: {
                    columnWidth: 60,
                    isFitWidth: true
                }
            })
        );
    }, []);

    React.useEffect(() => {
        if (isotope) {
            filterKey === '*'
                ? isotope.arrange({ filter: `*` })
                : isotope.arrange({ filter: `.${filterKey}` });
        }
    }, [isotope, filterKey]);


    const filters = (
        <div id="filters" className="button-group">
            <button className="button is-checked" onClick={() => setFilterKey('*')}>All</button>
            <button className="button" onClick={() => setFilterKey('language:not(.unused)')}>
                Languages
            </button>
            <button className="button" onClick={() => setFilterKey('database:not(.unused)')}>
                Databases
            </button>
            <button className="button" onClick={() => setFilterKey('library:not(.unused)')}>
                Libraries
            </button>
            <button className="button" onClick={() => setFilterKey('server:not(.unused)')}>
                Server
            </button>
            <button className="button" onClick={() => setFilterKey('unused')}>Unused</button>
        </div>
    )

    return (
        <div className="row justify-content-center" style={{ marginBottom: '3rem' }} data-aos="fade-up">
            <div className="col-12 col-lg-6">
                {filters}
                <div className="grid">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Skills
