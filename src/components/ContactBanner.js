import React from 'react'
import PText from './PText';
import Button from './Button';
import styled from 'styled-components';

const ContactBannerStyles = styled.div`
  padding: 18rem o;
  .contactBanner__wrapper {
    background: #221d1c;
    border-radius: 12px;
    padding: 5rem 0;
    text-align: center;
  }
  .contactBanner__heading {
    font-size: 4rem;
    margin-bottom: 2rem;
    color: #fff;
    font-family: Poppins, sans-serif;
  }
  @media only screen and (max-width: 768px) {
    .contactBanner__heading {
      font-size: 2.3rem;
    }
  }
`;

function ContactBanner() {
    return (
        <ContactBannerStyles>
            <div className="container">
                <div className="contactBanner__wrapper">
                    <PText>Have a project in mind</PText>
                    <h1 className="contactBanner__heading">Let me help you</h1>
                    <Button btnText="Contact Now" btnLinks="contact"></Button>
                </div>
            </div>
        </ContactBannerStyles>
    )
}

export default ContactBanner
