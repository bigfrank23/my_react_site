import React from 'react'
import PText from './PText';
import styled from 'styled-components';

const AboutItemStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 3rem;
  position: relative;
  .title {
    font-size: 2.4rem;
    color: #fff;
  }
  .items {
    display: flex;
    gap: 1.5rem;
    position: absolute;
    left: 18rem;
  }
  .item {
    background-color: #221d1c;
    padding: 1rem;
    border-radius: 8px;
  }

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    .items {
      position: initial;
      gap: 1rem;
    }
    .title {
      font-size: 2rem;
      font-family: Poppins, sans-serif;
    }
    .item {
      padding: 0;
      background-color: unset;
    }
  }
  @media only screen and (max-width: 768px) {
    .items {
      position: initial;
      gap: 0.5rem;
    }
  }
`;

function AboutInfoItem({
    title="This is title",
    items= ['HTML','CSS','JS']
}) {
    return (
      <AboutItemStyles>
        <h1
          className="title"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {title}
        </h1>
        <div className="items">
          {items.map((item, index) => (
            <div className="item" key={index}>
              <PText>{item}</PText>
            </div>
          ))}
        </div>
      </AboutItemStyles>
    );
}

export default AboutInfoItem
