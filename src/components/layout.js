import React, { useEffect } from "react"

import "aos/dist/aos.css";
import AOS from "aos"

import Navbar from "../components/navbar"
import ScrollToTop from "../components/scrollToTop"
import FooterSection from "../components/footerSection"

const Layout = ({ id, location, children }) => {
  const isBrowser = typeof window !== "undefined";

  useEffect(() => {
    if (isBrowser) {
      AOS.init({ once: true });
    }
  }, [isBrowser]);

  return (
    <React.Fragment>

      <Navbar location={location} />
      <ScrollToTop />

      <main id="main" className="container-fluid">
        <div className="main-container" id={id}>
          {children}
        </div>
        <FooterSection />
      </main>

    </React.Fragment>

  )
}

export default Layout
