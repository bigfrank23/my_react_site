import React, { useState } from "react";
import {NavLink} from 'react-router-dom'
import styled from 'styled-components';

const NvaMenuStyles = styled.div`
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  padding: 1rem 0;
  background-color: #262626;
  ul {
    display: flex;
    justify-content: center;
    max-width: 1200px;
    margin: 0 auto;
    width: 90px;
    text-align: center;
    li {
      display: inline-block;
      border-radius: 8px;
      transition: 0.3s ease background-color;
      &:hover {
        background: #1e1e1e;
        border-bottom: 2px solid #f0725c;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }
    a {
      font-family: Poppins, sans-serif;
      padding: 1rem 1rem;
      font-size: 2rem;
      color: #bcb4b4;
      outline: 0;
      text-decoration: none;
    }
    .active {
      color: #fff;
    }
  }
  .mobile-menu-icon {
    position: absolute;
    right: 1rem;
    top: 1rem;
    width: 4rem;
    cursor: pointer;
    outline: 0;
    display: none;
  }
  .closeNavIcon {
    display: none;
  }
  @media only screen and (max-width: 768px) {
    .hide-Item {
      transform: translateY(calc(-100% - var(--top)));
    }
    .mobile-menu-icon {
      display: block;
      * {
        pointer-events: none;
      }
    }
    .navItems {
      --top: 1rem;
      transition: 0.3s ease transform;
      background: #1e1e1e;
      padding: 2rem;
      width: 100%;
      max-width: 300px;
      border-radius: 12px;
      position: absolute;
      right: 1rem;
      top: var(--top);
      display: block;
      .closeNavIcon {
        display: block;
        width: 3rem;
        margin: 0 0 0 auto;
        cursor: pointer;
        * {
          pointer-events: none;
        }
      }
      li {
        margin-bottom: 1rem;
      }
    }
  }
`;
const faCol = {color: '#fff', fontSize: '2rem'}

function NavMenu() {
  const [showNav, setShowNav] = useState(false);
    return (
      <NvaMenuStyles>
        <div className="container-fluid">
        <div
          className="mobile-menu-icon"
          onClick={() => setShowNav(!showNav)}
          role="button"
          onKeyDown={() => setShowNav(!showNav)}
          tabIndex={0}
        >
          <i class="fa fa-bars" style={faCol}></i>
        </div>
        <ul className={!showNav ? "navItems hide-Item" : "navItems"}>
          <div
            className="closeNavIcon"
            onClick={() => setShowNav(!showNav)}
            role="button"
            onKeyDown={() => setShowNav(!showNav)}
            tabIndex={0}
          >
            <i class="fa fa-times" style={faCol}></i>
          </div>
          <li>
            <NavLink
              to="/"
              exact
              onClick={() => setShowNav(!showNav)}
              role="button"
              onKeyDown={() => setShowNav(!showNav)}
              tabIndex={0}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="about"
              onClick={() => setShowNav(!showNav)}
              role="button"
              onKeyDown={() => setShowNav(!showNav)}
              tabIndex={0}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="services"
              onClick={() => setShowNav(!showNav)}
              role="button"
              onKeyDown={() => setShowNav(!showNav)}
              tabIndex={0}
            >
              Services
            </NavLink>
          </li>
          <li>
            <NavLink
              to="projects"
              onClick={() => setShowNav(!showNav)}
              role="button"
              onKeyDown={() => setShowNav(!showNav)}
              tabIndex={0}
            >
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Contact"
              onClick={() => setShowNav(!showNav)}
              role="button"
              onKeyDown={() => setShowNav(!showNav)}
              tabIndex={0}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
      </NvaMenuStyles>
    );
}

export default NavMenu
