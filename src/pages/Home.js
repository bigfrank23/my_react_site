import React from 'react'
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServiceSection from '../components/ServiceSection';
import ProjectSection from "../components/ProjectSection";
import ContactBanner from './../components/ContactBanner';
import TestimonialsSec from './../components/TestimonialsSec';
import '../App.css'

function Home() {
    return (
      <div>
        <HeroSection />
        <AboutSection />
        <ServiceSection/>
        <ProjectSection/>
        <TestimonialsSec />
        <ContactBanner/>

        <div id="cursorMeter">
          <div id="percent">Page Scrolled</div>
          <div id="scollPath">
            <div id="progressBar"></div>
          </div>
        </div>
      </div>
    );
}

export default Home
