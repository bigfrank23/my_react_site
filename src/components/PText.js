import React from 'react'
import styled from 'styled-components'

const PStyle = styled.div`
  max-width: 500px;
  margin: 0 auto;
  font-size: 1.8rem;
  line-height: 1.3em;
  color: #fff;
  @media only screen and (max-width: 768px) {
    font-size: 1.3rem;
    padding: 0;
  }
`;

function PText({children}) {
    return (
      <PStyle className="para">
        <p style={{ fontFamily: "Poppins, sans-serif" }}>
          {children}
        </p>
      </PStyle>
    );
}

export default PText
