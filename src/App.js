import React, { Component } from 'react'
import NavMenu from './components/NavMenu';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Scrollbar from "react-smooth-scrollbar";
import SmoothScrollbar from "smooth-scrollbar";
import OverscrollPlugin from "smooth-scrollbar/plugins/overscroll";
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import Services from './pages/Services';
import ScrollToTop from './components/ScrollToTop';

// import './App.css'
import Footer from './components/Footer';

SmoothScrollbar.use(OverscrollPlugin);
export default class App extends Component {
  render() {
    return (
      <>
        <Router>
          <NavMenu />
          <ScrollToTop />
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/services">
              <Services />
            </Route>
            <Route path="/projects">
              <Projects />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
          <Footer />
        </Router>
        <Scrollbar damping={30} renderByPixels={true} plugins={{ overscroll: {effect: "bounce", damping: 30}}}>
        </Scrollbar>
      </>
    );
  }
}
