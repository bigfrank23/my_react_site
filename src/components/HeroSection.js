import React from 'react'
import profileImg from '../me2.png'
import likeImg from '../like.png'
import call from '../call.png'
import call2 from '../call2.png'
import expert from '../expert.png'
import PText from './PText'
import Button from '../components/Button'
import styled from 'styled-components'
import { Box, Typography } from "@mui/material";
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Carousel from 'nuka-carousel';


const HeroStyles = styled.div`
  .hero__heading {
    font-size: 2rem;
    margin-top: 10.5rem;
    span {
      display: inline-block;
      width: 100%;
      color: #bcb4b4;
      font-family: Poppins, sans-serif;
    }
    .hero__name {
      font-size: clamp(30px, 20vw, 7rem);
      color: #fff;
      font-family: Poppins, sans-serif;
      font-weight: bold !important;
      margin: 0;
    }
  }
  .hero__image{
      max-width: 800px;
      width: 100%;
      height: 500px;
      margin: 0 auto;
      border: 2px solid #fff;
  }
  .hero__info{
      margin-top: -13rem;
      text-align: center;
  }
  .hero__social,
  .hero__scrollDown{
      display: flex;
      flex-direction: column;
      gap: 3rem;
      bottom: 20px;
      width: 100%;

  }
  .hero__social{
      left: 50px;
  }
  .hero__scrollDown{
      right: 50px;
      color: #fff;
  }
  .hero__social__indicator,
  .hero__scrollDown{
      width: 50px;
      font-size: 2rem;
      p{
          font-size: 1.6rem;
          transform: translateY(-70px) rotate(90deg);
          letter-spacing: .7rem;
          text-transform: uppercase;
          font-family: Poppins, sans-serif;
      }
      imgk{
          max-height: 45px;
          width: 16px;
          margin: 0 auto;
          object-fit: contain;
      }
  }
  .hero__scrollDown{
      img{
          max-height: 70px;
      }
  }
  .hero__social__text{
    line-height: 7vh;
      ul{
          li{
              text-decoration: none;
          }
          a{
              font-size: 1.6rem;
              letter-spacing: 5px;
              text-decoration: none;
              font-family: Poppins, sans-serif;
              color: #fff;
                .fa-linkedin{
                &:hover{
                  background: #fff;
                  color: blue;
                  padding: 5px;
                  border-radius: 3px;
                  transition: .25s ease-in-out background;
                }
              }
              .fa-twitter{
                &:hover{
                  background: steelblue;
                  color: #fff;
                  padding: 5px;
                  border-radius: 3px;
                  transition: .25s ease-in-out background;
                }
              }
              .fa-whatsapp{
                &:hover{
                  background: green;
                  color: #fff;
                  padding: 5px;
                  border-radius: 3px;
                  transition: .25s ease-in-out background;
                }
                
          }
      }
  }
  @media only screen and (max-width: 768px) {
    .container{
      width: 100%;
      flex-direction: column;
    }
    .hero__info{
      margin-top: -11rem;
  }
}
}
  
`

function HeroSection() {
  const date = new Date();
  const hours = date.getHours();
  let timeOfDay;

  if (hours < 12) {
    timeOfDay = "Morning";
  } else if (hours >= 12 && hours < 15) {
    timeOfDay = "Afternoon";
  } else {
    timeOfDay = "Evening";
  }

  ////////////
  const [like, setLike] = useState([])
  const [hideBtn, setHideBtn] = useState(false)

  const handleClick = async() => {
    const res = await axios.post("http://localhost:5000/api/likes/");
    try {
      // setLike(res.data.likeResult)
      console.log(res.data);
      setHideBtn(true)
      localStorage.setItem('liked', true)
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(()=> {
    const getLikes = async() => {
      const res = await axios.get("http://localhost:5000/api/likes/");
      // setLike(res.data.likeRes)
      setLike(Object.values(res.data).map(a=> a.likes));
      // console.log(Object.values(res.data).map(a=> a.likes));
    }
    getLikes()
  }, [like])

    return (
      <HeroStyles>
        <div class="container-fluid">
          <div className="row d-flex align-items-center justify-content-center text-center">
            <div className="col-3 d-none d-lg-flex d-md-flex justify-content-center align-items-center">
              <div className="hero__social">
                <div className="hero__social__indicator">
                  {/* <img src={socialMediaArrow} alt="" /> */}
                </div>
                <div className="hero__social__text">
                  <ul>
                    <li>
                      <a
                        href="https://www.linkedin.com/in/franklin-ezeyim-5694051a6/"
                        target="_blank"
                        rel="noreffer"
                      >
                        <i class="fa fa-linkedin"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://twitter.com/big_frank93?s=09"
                        target="_blank"
                        rel="noreffer"
                      >
                        <i class="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://api.whatsapp.com/send?phone=+2348135488233"
                        target="_blank"
                        rel="noreffer"
                      >
                        <i class="fa fa-whatsapp"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className=" col-10 col-xs-10 col-md-6 col-lg-6 col-md-offset-3 p p-0">
              <Box
                sx={{
                  marginTop: "10.5rem",
                  color: "#fff",
                  position: "absolute",
                  right: 0,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {hideBtn || localStorage.getItem("liked") ? (
                  <>
                    <Box
                      component="img"
                      loading="lazy"
                      src={likeImg}
                      sx={{
                        mixBlendMode: "luminosity",
                        width: "35px",
                        height: "35px",
                        userSelect: "none",
                      }}
                    />
                    <Typography
                      variant="h6"
                      marginBlock="-5px"
                      fontSize=".8rem"
                      textAlign="right"
                    >
                      {like}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Box
                      onClick={handleClick}
                      component="img"
                      src={likeImg}
                      sx={{
                        width: "35px",
                        height: "35px",
                        cursor: "pointer",
                      }}
                    />
                    <Typography
                      variant="h6"
                      marginBlock="-5px"
                      fontSize=".8rem"
                      textAlign="right"
                    >
                      {like}
                    </Typography>
                  </>
                )}
              </Box>
              <h1 className="hero__heading">
                <span>
                  Good {timeOfDay}! <br /> This is
                </span>
                <span className="hero__name">Franklin</span>
              </h1>
              <Carousel>
                <div>
                  <div className="hero__image">
                    <img
                      loading="lazy"
                      src={profileImg}
                      alt="Profile image"
                      style={{
                        objectFit: "cover",
                        border: "2px double",
                        mixBlendMode: "soft-light",
                        height: "100%",
                        width: "100%",
                        minHeight: "50px",
                      }}
                    />
                  </div>
                  <div className="hero__info">
                    <PText>
                      The MERN stack developer and Game developer you've been
                      looking for!!!
                    </PText>
                    <Button
                      btnLinks="projects"
                      btnText="Check out my Projects"
                      outline={false}
                      style={{ display: "flex", justifyContent: "center" }}
                    />
                  </div>
                </div>
                <div>
                  <img
                    src={expert}
                    loading="lazy"
                    style={{
                      objectFit: "cover",
                      border: "2px double",
                      mixBlendMode: "soft-light",
                      height: "100%",
                      width: "100%",
                      minHeight: "50px",
                    }}
                  />
                  <div
                    style={{
                      background: "#111",
                      textAlign: "center",
                      padding: "1rem",
                    }}
                  >
                    <PText>
                      Expert in building e-Commerce, Blogs, Frontend & Backend{" "}
                    </PText>
                  </div>
                </div>
                <div>
                  <img
                    src={call}
                    loading="lazy"
                    style={{
                      objectFit: "cover",
                      border: "2px double",
                      mixBlendMode: "soft-light",
                      height: "100%",
                      width: "100%",
                      minHeight: "50px",
                    }}
                  />
                    <PText>Give that job to the right hands.</PText>
                    <Button
                      btnLinks="contact"
                      btnText="Call Me Now!"
                      outline={false}
                      style={{ display: "flex", justifyContent: "center" }}
                    />
                </div>
              </Carousel>
            </div>

            <div
              className="col-3 d-none d-md-flex d-lg-flex justify-content-center align-items-end"
              style={{ marginBottom: "-320px" }}
            >
              <div className="hero__scrollDown">
                <p>Scroll</p>
                {/* <img src={scrollDown} alt="" /> */}
                <i class="fa fa-chevron-circle-down" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
      </HeroStyles>
    );
}

export default HeroSection
