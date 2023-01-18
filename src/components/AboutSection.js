import React from 'react'
import SectionTitle from './SectionTitle'
import PText from './PText'
import Button from './Button'
import AboutImg from '../profile3.jpg'
import styled from 'styled-components'

const AboutSectionStyle = styled.div`
  padding: 10rem;
  display: flex;
  .aboutSection__left,
  .aboutSection__right {
    flex: 1;
  }
  .aboutSection__right {
    margin-left: 50px;
    /* height: 450px; */
  }
  .para {
    margin-top: 2rem;
    margin-left: 0;
    font-family: Poppins, sans-serif;
  }
  .aboutSection__button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 2rem;
    margin-top: 2rem;
  }
  @media only screen and (max-width: 996px) {
    display: block;
    /* .aboutSection__left {
      flex: 4;
    } */
    .aboutSection__right {
      display: none;
      /* flex: 3;
      img {
        margin-left: 30px;
        display: block;
      } */
    }
    .para {
      text-align: center;
      margin: 1rem auto;
    }
    .aboutSection__button {
      justify-content: center;
    }
  }
  @media only screen and (max-width: 768px) {
    display: block;
    padding: 10rem 2rem;
    .aboutSection__left {
      width: 100%;
    }
    .aboutSection__right {
      display: none;
    }
    .para {
      margin: 0 auto;
      margin-top: 2rem;
      /* width: 250px; */
      padding: 5px;
    }
    .aboutSection__button {
      flex-direction: column;
      gap: 0;
      .button-wrapper,
      a {
        width: 100%;
        text-align: center;
      }
    }
  }
`;

function AboutSection() {
    return (
      <AboutSectionStyle>
        <div className="aboutSection__left">
          <SectionTitle
            subheading="Let me introduce myself"
            heading="About me"
          />
          <PText>
            I'm a software/web developer with the major aim of solving problem via the developing
            applications. 
            {/* I do front end jobs, back
            end jobs and I also enjoying building games. I must say programming
            is fun especially when you love Javascript... */}
          </PText>
          <div className="aboutSection__button">
            <Button btnLinks="about" btnText="Read More" outline />
            <Button btnLinks="contact" btnText="Contact" />
          </div>
        </div>
        <div className="aboutSection__right">
          <img
            src={AboutImg}
            alt="profile img"
            style={{
              width: "100%",
              height: "80%",
              boxShadow: "10px 10px 0px 4px #f0725c",
            }}
          />
        </div>
      </AboutSectionStyle>
    );
}

export default AboutSection
