import React, {useState} from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import SectionTitle from './SectionTitle'
import PText from './PText'
import Styled from 'styled-components'
import testimonials from '../data/testimonials'

const TestimonialSectionStyle = Styled.div`
    padding: 10rem 0;
    text-align: center;
    .testimonial__wrapper{
        position: relative;
        max-width: 700px;
        margin: 0 auto;
    }
    .testimonial__info{
        width: 100%;
        height: fit-content;
        padding: 3rem;
        background: #221d1c;
        border-radius: 12px;
        margin-top: 5rem;
    }
    .testimonial__desc{
        .para{
            text-align: center;
        }
    }
    .testimonial__name{
        margin-top: 4rem;
        font-family: system ui;
        font-size: 2.2rem;
        color: darkcyan;
    }
    .testimonial__title{
        margin-top: 0.3rem;
        font-size: 1.6rem;
        color: #bcb4b4;
        font-weight: 700;
    }
    .arrows{
        margin-top: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        .fa{
            width: 30px;
            pointer-events: none;
            color: #fff;
        }
        .next,
        .prev{
            margin: 0 0.5rem;
            width: fit-content;
            background: #221d1c;
            padding: 0.5rem 2rem;
            border-radius: 8px;
            cursor: pointer;

        }
    }
    .fade-enter{
      opacity: 0;
      transform: scale(.96);
    }
    .fade-enter-active{
      opacity: 1;
      transform: scale(1);
      transition: 250ms ease-in;
      transition-property: opacity, transform;
    }
    .fade-exit{
      opacity: 1;
      transform: scale(1);
    }
    .fade-exit-active{
      opacity: 0;
      transform: scale(.96);
      transition: 250ms ease-in;
      transition-property: opacity, transform;
    }
    @media only screen and (max-width: 768px) {
      padding: 4rem 0;
    }
`;

function TestimonialsSection() {
    const [activeIndex, setActiveIndex] = useState(3);
    const activeSlide = testimonials[activeIndex];

    function handleNext() {
      if (activeIndex >= testimonials.length - 1) {
        setActiveIndex(0);
      } else {
        setActiveIndex((oldIndex) => oldIndex + 1);
      }
    }

    function handlePrev() {
        if (activeIndex <= 0) {
          setActiveIndex(testimonials.length - 1);
        } else {
          setActiveIndex((oldIndex) => oldIndex - 1);
        }
    }

    return (
      <TestimonialSectionStyle>
        <div className="container">
          <SectionTitle
            heading="Testimonials"
            subheading="see what my clients say about me"
          />
          <div className="testimonial__wrapper">
            <SwitchTransition component={null}>
              <CSSTransition key={activeSlide.id} timeout={300} classNames="fade">
                <div className="testimonial__info">
                  <div className="testimonial__desc">
                    <PText>{activeSlide.desc}</PText>
                  </div>
                  <h2 className="testimonial__name">{activeSlide.name}</h2>
                  <p className="testimonial__title">{activeSlide.title}, <br/> {activeSlide.org}</p>
                </div>
              </CSSTransition>
            </SwitchTransition>
          </div>
          <div className="arrows">
            <div className="prev" onclick={handlePrev} role="button" tabIndex={0} onKeyDown={handlePrev}>
              <i class="fa fa-arrow-left" ></i>
            </div>
            <div className="next" onclick={handleNext} role="button" tabIndex={0} onKeyDown={handleNext}>
              <i class="fa fa-arrow-right" ></i>
            </div>
          </div>
        </div>
      </TestimonialSectionStyle>
    );
}

export default TestimonialsSection
