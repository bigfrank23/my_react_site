import React from 'react'
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServiceSection from '../components/ServiceSection';
import ProjectSection from "../components/ProjectSection";
import ContactBanner from './../components/ContactBanner';
import TestimonialsSec from './../components/TestimonialsSec';
import '../App.css'
import BlogIndex from '../components/BlogIndex';
import ShopIndex from '../components/ShopIndex';

function Home({ products, handleAddToCart, cart, totalItems }) {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ServiceSection />
      <BlogIndex />
      <ShopIndex
        products={products}
        handleAddToCart={handleAddToCart}
        cart={cart}
        totalItems={totalItems}
      />
      <ProjectSection />
      <TestimonialsSec />
      <ContactBanner />

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
