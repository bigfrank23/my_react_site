import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ColStyles = styled.div`
  color: #f2cd5f;
  .heading {
    font-size: 2.4rem;
    margin-bottom: 2rem;
    font-family: Poppins, sans-serif;
  }
  ul {
    padding: 0;
    li {
      margin-bottom: 1rem;
      list-style: none;
    }
  }
  a {
    font-size: 1.8rem;
    color: #fff;
    text-decoration: none;
    font-family: Poppins, sans-serif;
  }
  @media only screen and (max-width: 768px) {
    .heading {
      font-size: 2rem;
      text-align: center;
    }
    ul {
      text-align: center;
    }
    a {
      font-size: 1.5rem;
    }
  }
`;

function FooterCol({
    heading= 'Important Links',
    links= [
        {
            type: "Links",
            title:  "Home",
            path:  "/home"
        },
        {
            type: "Links",
            title:  "About",
            path:  "/about"
        },
    ]
}
) {
    return (
        <ColStyles>
            <h1 className="heading">{heading}</h1>
            <ul>
                {
                links.map((item,index)=> (
                    <li key={index}>
                        {item.type === 'Links' ? (<Link to={item.path}> {item.title} </Link>) : (
                            <a href={item.path} target="_blank" rel="noreferrer"> {item.title} </a>
                        )}
                    </li>
                ))
            }
            </ul>
        </ColStyles>
    )
}

export default FooterCol
