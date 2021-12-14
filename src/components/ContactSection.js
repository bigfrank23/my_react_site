import React from 'react'
import SectionTitle from './SectionTitle'
import styled from 'styled-components'
import ContactInfoItem from './ContactInfoItem';
import ContactForm from './ContactForm';

const ContactSectionStyle = styled.div`
  padding: 10rem 0;
  .contactSection__wrapper {
    display: flex;
    gap: 5rem;
    margin-top: 7rem;
    justify-content: space-between;
    position: relative;
  }
  .contactSection__wrapper::after {
    position: absolute;
    content: "";
    width: 2px;
    height: 50%;
    background: #bcb4b4;
    left: 50%;
    top: 30%;
    transform: translate(-50%, -50%);
  }
  .left {
    width: 100%;
    max-width: 500px;
  }
  .right {
    width: 100%;
    max-width: 500px;
  }
  @media only screen and (max-width: 950px) {
    .contactSection__wrapper::after {
      display: none;
    }
  }

  @media only screen and (max-width: 768px) {
    padding: 7rem 0 7rem 0;
    .contactSection__wrapper {
      flex-direction: column;
    }
    .contactSection__wrapper::after {
      display: none;
    }
    .left,
    .right {
      max-width: 100%;
    }
    .right {
      padding: 4rem 2rem 2rem 2rem;
    }
  }
`;

function ContactSection() {
    return (
      <ContactSectionStyle>
        <div className="container">
          <SectionTitle heading="Contact" subheading="get in touch" />
          <div className="contactSection__wrapper">
            <div className="left">
              <ContactInfoItem
                icon={<i class="fa fa-phone" aria-hidden="true"></i>}
                text="+2348135488233"
              />
              <ContactInfoItem
                icon={<i class="fa fa-envelope" aria-hidden="true"></i>}
                text="ezeyimf@gmail.com || franklinezeyim@gmail.com"
              />
              <ContactInfoItem text="Lagos , Nigeria" />
            </div>
            <div className="right">
                <ContactForm />
            </div>
          </div>
        </div>
      </ContactSectionStyle>
    );
}

export default ContactSection
