import React from 'react'
import styled from 'styled-components'

const SectionTitleStyle = styled.div`
  text-align: center;
  p {
    display: inline-block;
    width: 100%;
    color: #bcb4b4;
    font-size: 2rem;
    font-family: Poppins, sans-serif;
  }
  h2 {
    font-weight: bold;
    font-size: 6rem;
    margin-top: 0.5rem;
    text-transform: uppercase;
    margin: auto;
    color: #fff;
    font-family: Poppins, sans-serif;
  }
  @media only screen and (max-width: 768px) {
    p {
      font-size: 1.5rem;
      color: #bcb4b4;
    }
    h2 {
      font-size: 3rem;
    }
  }
  @media only screen and (max-width: 400px) {
    h2 {
      font-size: 2rem;
    }
  }
`;

function SectionTitle({subheading = "This is subheading", heading}) {
    return (
        <SectionTitleStyle className="section-title">
          <div class="container-fluid">
            <div className="row">
            <p>{subheading}</p>
            <h2>{heading}</h2>
            </div>
          </div>
            
        </SectionTitleStyle>
    )
}

export default SectionTitle
