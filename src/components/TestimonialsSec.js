import React from 'react'
import testimonials from '../data/testimonials'
import { Carousel } from 'react-bootstrap'
import styled from 'styled-components'
import PText from './PText';
import SectionTitle from './SectionTitle';

const TestimonialsSecStyles = styled.div`
  padding: 10rem 0;
  text-align: center;
  .testimonial__wrapper {
    position: relative;
    max-width: 700px;
    margin: 0 auto;
  }
  .testimonial__info {
    width: 100%;
    height: fit-content;
    padding: 3rem;
    background: #221d1c;
    border-radius: 12px;
    margin-top: 5rem;
  }
  .testimonial__desc {
    .para {
      text-align: center;
    }
  }
  .testimonial__name {
    margin-top: 4rem;
    font-family: Poppins, sans-serif;
    font-size: 2.2rem;
    color: #f2cd5f;
  }
  .testimonial__title {
    margin-top: 0.3rem;
    font-size: 1.6rem;
    color: #bcb4b4;
    font-weight: 700;
  }
  @media only screen and (max-width: 768px) {
    padding: 4rem 0;
  }
`;


function TestimonialsSec() {
    return (
      <TestimonialsSecStyles>
        <div className="container">
          <SectionTitle
            heading="Testimonials"
            subheading="see what our clients say about us"
          />
          <div className="testimonial__wrapper">
            <Carousel interval={1000}>
              {testimonials.map((data, index) => {
                return (
                  <Carousel.Item interval={5000} key={index}>
                    <div className="testimonial__info">
                      <div className="testimonial__desc">
                        <PText>{data.desc}</PText>
                      </div>
                      <h2 className="testimonial__name">{data.name}</h2>
                    </div>
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </div>
        </div>
      </TestimonialsSecStyles>
    );
}

export default TestimonialsSec
