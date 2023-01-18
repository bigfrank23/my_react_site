import React from 'react'
import PText from './PText';
import FooterCol from './FooterCol';
import styled from 'styled-components';
import FT from '../ft.png'

const FooterStyles = styled.div`
  padding-top: 8rem;
  .container-fluid {
    background: #221d1c;
    padding: 5rem;
    display: flex;
    gap: 3rem;
  }
  .footer__col1 {
    flex: 2;
  }
  .footer__col2,
  .footer__col3,
  .footer__col4 {
    flex: 1;
  }
  .footer__col1__title {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    color: #fff;
    font-family: Poppins, sans-serif;
  }
  .copyright {
    background: #221d1c;
    text-align: left;
    padding: 1rem 0;
    margin-top: 2rem;
    .para {
      margin-left: 0;
    }
  }
  @media only screen and (max-width: 768px) {
    .container-fluid {
      flex-direction: column;
      gap: 0rem;
      padding: 4rem;
      & > div {
        margin-top: 5rem;
        text-align: center;
      }
    }
    .footer__col1 .para {
      max-width: 100%;
    }
    .para {
      margin-top: -50 px;
    }
    .footer__col1__title {
      font-size: 2rem;
    }
    .copyright {
      .container {
        div {
          margin-top: 0;
        }
      }
    }
  }
`;

function Footer() {
    return (
      <FooterStyles>
        <div className="container-fluid">
          <div className="footer__col1">
            <h1 className="footer__col1__title">Franklin Ezeyim</h1>
            <PText>
              A software/web developer from Lagos, Nigeria.
            </PText>
          </div>
          <div className="footer__col3">
            <FooterCol
              heading="Contact Info"
              links={[
                {
                  title: "+2348135488233",
                  path: "tel:+2348135488233",
                },
                {
                  title: "ezeyimf@gmail.com",
                  path: "mailto:ezeyimf@gmail.com",
                },
                {
                  title: "Lagos, Nigeria",
                  path: "https://maps.google.com/maps/ms?source=s_q&hl=en&geocode&ie=UTF8&g=lagos,+nigeria&msa=0&msid=106466873463735552359.000463c592bc923e046e2&ll=6.4473,3.4393&spn=108.274147,158.203125&z=3",
                },
              ]}
            />
          </div>
          <div className="footer__col4">
            <FooterCol
              heading="Social Links"
              links={[
                // {
                //   title: "Twitter",
                //   path: "https://twitter.com/big_frank93?s=09",
                // },
                {
                  title: "Linkedin",
                  path: "https://www.linkedin.com/in/franklin-ezeyim/",
                },
                {
                  title: "WhatsApp",
                  path: "https://api.whatsapp.com/send?phone=+2348135488233",
                },
              ]}
            />
          </div>
        </div>
        <div className="copyright">
          <div className="container">
            <PText>
              {" "}
              <i class="fa fa-copyright" aria-hidden="true"></i> 2021 - Franklin{" "}
              <img
                src={FT}
                alt="my logo"
                style={{
                  objectFit: "cover",
                  height: "20px",
                  width: "20px",
                }}
              />{" "}
            </PText>
          </div>
        </div>
      </FooterStyles>
    );
}

export default Footer
