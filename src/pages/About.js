import React, {useState} from "react";
import PText from "./../components/PText";
import Button from './../components/Button';
import AboutImg from "../profile.jpg";
import styled from 'styled-components';
import AboutInfoItem from './../components/AboutInfoItem';
import ContactBanner from './../components/ContactBanner';

const AboutPageStyles = styled.div`
  padding: 10rem 0;
  .top-section {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }
  .left {
    flex: 3;
    color: #fff;
  }
  .about__subheading {
    font-size: 2.2rem;
    font-family: Poppins, sans-serif;
    margin-bottom: 2rem;
    span {
      background-color: #1e1e1e;
      padding: 0.5rem;
      border-radius: 8px;
      font-family: Poppins, sans-serif;
    }
  }
  .about__heading {
    font-size: 3.6rem;
    margin-bottom: 3rem;
  }
  .about__info {
    margin-bottom: 4rem;
    .para {
      max-width: 100%;
    }
  }
  .right {
    img {
      border: 5px solid silver;
      border-radius: 8px;
    }
  }
  .about__info__items {
    margin-top: 15rem;
  }
  .about__info__item {
    margin-bottom: 10rem;
  }
  .about__info__heading {
    font-size: 3.5rem;
    text-transform: uppercase;
    font-family: Poppins, sans-serif;
    color: #fff;
  }
  @media only screen and (max-width: 768px) {
    padding: 7rem 0 0 0;
    .top-section {
      flex-direction: column;
      gap: 5rem;
    }
    .about__subheading {
      font-size: 1.8rem;
    }
    .about__heading {
      font-size: 2.8rem;
    }
    .about__info__items {
      margin-top: 5rem;
    }
    .about__info__item {
      background: linear-gradient(to left, #1a1a1a, #333);
      padding: 15px;
      text-align: center;
    }
    .about__info__heading {
      font-size: 3rem;
    }
  }
  @media only screen and (max-width: 400px) {
    .about__info__heading {
      font-size: 2rem;
    }
  }
`;

function About() {
  const [showResults, setResults] = useState(false);
  function handleClick(){
    // alert('Not available for download now!')
    setResults(true)
  }
  return (
    <AboutPageStyles>
      <div className="container">
        <div className="top-section">
          <div className="left">
            <p className="about__subheading">
              Hi, I'm <span>Franklin Ezeyim</span>
            </p>
            <h2 className="about__heading">A Software/Web Developer</h2>
            <div className="about__info">
              <PText>
                I'm a full-stack developer with over 3years of experience. Very
                passionate in developing website and apps.
                <p>
                  My career kick started immediately after my internship. I got
                  an actual job where I worked as the full stack developer,
                  digital marker and was the team lead
                </p>
                <p>
                  I helped deliver the company's toughest project back then and
                  got promoted
                </p>
                <p>
                  I'm open to opportunities where I can leverage my skills and
                  experience while I help deliever beauty
                </p>
                <p>
                  I'm a fan of sports(most epecially football), music, movies,
                  video games and entertainment. I love to research,
                  technologies. I love being around positive people.
                </p>
                {/* I love coding and always do my best to get results. I love
                building games, making interactive apps etc. 
                Languages I speak mostly among others are HTML, CSS, JavaScript, React js, Node js.  */}
                <p>I get jobs done! I mean, what's the point???</p>
              </PText>
            </div>
            <div
              className="btnWrapper"
              style={{ display: "flex", justifyContent: "center" }}
              onClick={handleClick}
            >
              <div className="wrapp">
                <Button btnText="Download CV" btnLinks="#" />
                <div className="text-center">
                  {showResults ? (
                    <small className="text-danger text-capitalize">
                      Not available for download at this time!
                    </small>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <img src={AboutImg} alt="Franklin img" width="300px" />
          </div>
        </div>
        <div className="about__info__items">
          <div className="about__info__item">
            <h1 className="about__info__heading"> Education </h1>
            <AboutInfoItem title="School" items={["Imo State University"]} />
            <AboutInfoItem title="Degree" items={["Bsc (Computer Science)"]} />
          </div>
          <div className="about__info__item">
            <h1 className="about__info__heading"> My Skills </h1>
            <AboutInfoItem title="Languages" items={["Javascript", "C#"]} />
            <AboutInfoItem
              title="Front-End"
              items={[
                "HTML",
                "CSS",
                "Bootstrap",
                "Tailwind",
                "MUI",
                "EJS",
                "JS",
                "Redux",
                "Context API",
                "REACT",
                "NEXT JS",
              ]}
            />
            <AboutInfoItem
              title="Back-End"
              items={["Node", "Express", "MySQL", "Mongo DB"]}
            />
            <AboutInfoItem
              title="Gaming"
              items={["JavaScript", "Scratch", "Unity"]}
            />
            <AboutInfoItem
              title="No Code Programming"
              items={["Bubble", "Adaolo", "Glide"]}
            />
            <AboutInfoItem title="Mobile" items={["Ionic-React"]} />
            <AboutInfoItem title="CMS" items={["Word-press"]} />
            <AboutInfoItem
              title="Tools"
              items={[
                "Git",
                "Redux",
                "React-Hooks",
                "React-query",
                "Socket.io",
                "Graph ql",
                "Sanity IO",
              ]}
            />
          </div>
          <div className="about__info__item">
            <h1 className="about__info__heading"> Experience </h1>
            <AboutInfoItem title="2020" items={["Junior Front-End Developer"]} />
            <AboutInfoItem
              title="2021"
              items={["Mid Developer & Scratch Tutor"]}
            />
            <AboutInfoItem
              title="2022 - Till Date"
              items={["Lead FullStack Developer"]}
            />
          </div>
        </div>
      </div>

      <ContactBanner />
    </AboutPageStyles>
  );
}

export default About;
