import React from 'react'
import styled from 'styled-components';
import PText from './PText';

const ItemStyles = styled.div`
  padding: 2rem;
  background-color: #221d1c;
  display: flex;
  align-items: center;
  gap: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  .icon {
    color: #fff;
    background: gray;
    padding: 1.3rem;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
  @media only screen and (max-width: 400px) {
    gap: 1rem;
  }
`;

function ContactInfoItem({
    icon = <i class="fa fa-map-marker" aria-hidden="true"></i>,
    text = 'this is an info'
}) {
    return (
        <ItemStyles>
            <div className="icon"> {icon} </div>
            <div className="info">
                <p style={{color: "#fff", fontSize: "1rem", fontFamily: "Poppins, sans-serif"}}> {text} </p>
            </div>
        </ItemStyles>
    )
}

export default ContactInfoItem
