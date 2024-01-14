import React from "react"

const ScrollToTop = () => {
    return (
        <div id="to-top" className="hint--top" aria-label="To top">
            <div className="scroll-to-top">
                <svg width="100%" height="100%" viewBox="-1 -1 102 102">
                    <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
                </svg>
            </div>
        </div>
    )
}

export default ScrollToTop
