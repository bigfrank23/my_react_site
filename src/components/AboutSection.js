import React from 'react'
import SectionTitle from './SectionTitle'
import PText from './PText'
import Button from './Button'
import AboutImg from '../profile3.jpg'
import styled from 'styled-components'

const AboutSectionStyle = styled.div`
  padding: 10rem;
  .container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-align: left;
  }
  .aboutSection__left,
  .aboutSection__right {
    flex: 1;
  }
  .aboutSection__right {
    margin-left: 50px;
  }
  .section-title {
    text-align: left;
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
  @media only screen and (max-width: 950px) {
    .aboutSection__left {
      flex: 4;
    }
    .aboutSection__right {
      flex: 3;
      img {
        margin-left: 30px;
        display: block;
      }
    }
  }
  @media only screen and (max-width: 768px) {
    .container {
      flex-direction: column;
      text-align: center;
    }
    .aboutSection__left,
    .aboutSection__right {
      width: 100%;
    }
    .aboutSection__right {
      margin-top: 2rem;
      margin-left: 0;
      img {
        display: none;
      }
    }
    .section-title {
      text-align: center;
    }
    .para {
      margin: 0 auto;
      margin-top: 2rem;
      width: 250px;
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
            <div className="container">
              <div className="row">
                <div className="aboutSection__left">
                    <SectionTitle 
                    subheading = "Let me introduce myself"
                    heading= "About me"
                     />
                     <PText>
                    I'm Franklin Ezeyim. I web developer. I do front end jobs, back end jobs and I also enjoying building games. 
                    I must say programming is fun especially when you love Javascript...
                     </PText>
                     <div className="aboutSection__button">
                        <Button btnLinks= "contact" btnText= "Contact" />
                        <Button btnLinks= "about" btnText= "Read More"  outline />
                     </div>
                </div>
                <div className="aboutSection__right">
                    <img src={AboutImg} alt="profile image" style={{width: "100%"}} className="rounded" />
                </div>
            </div>
            </div>
        </AboutSectionStyle>
    )
}

export default AboutSection
