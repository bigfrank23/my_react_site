import React from 'react'
import SectionTitle from './SectionTitle'
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore, {Navigation} from 'swiper'
import projects from '../data/projects'
import ProjectItem from './ProjectItem'
import styled from 'styled-components'
import 'swiper/swiper-bundle.min.css'

SwiperCore.use([Navigation]);

const ProjectSectionStyle = styled.div`
  padding: 10rem 0;
  .projects__allItems {
    display: flex;
    gap: 3rem;
    margin-top: 5rem;
  }
  .swiper-container {
    padding-top: 8rem;
    max-width: 100%;
  }
  .swiper-button-prev,
  .swiper-button-next {
    postion: absolute;
    height: 50px;
    width: 50px;
    background: #221d1c;
    z-index: 10;
    right: 60px;
    left: auto;
    top: 0;
    transform: translateY(50%);
    color: #bcb4b4;
    border-radius: 8px;
  }
  .swiper-button-next {
    right: 0;
  }
  .swiper-button-prev::after,
  .swiper-button-next::after {
    font-size: 2rem;
  }
  @media only screen and (max-width: 768px) {
    padding: 4rem 0;
    .projects__allItems {
      flex-direction: column;
      max-width: 400px;
      margin: 0 auto;
      /* margin-top: 7rem; */
      gap: 5rem;
      .projectItem__img {
        width: 100%;
      }
    }
    .swiper-container {
      padding-top: 6rem;
    }
  }
`;

function ProjectSection() {
    return (
      <ProjectSectionStyle>
        <div className="container">
          <SectionTitle
            heading="Projects"
            subheading="some of my recent works"
          />
          <div className="projects__allItems">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              navigation
              breakpoints={{
                //When window is >= 640px
                640: {
                  slidesPerView: 1,
                },
                //When window is >= 768px
                768: {
                  slidesPerView: 2,
                },
                //When window is >= 1200px
                1200: {
                  slidesPerView: 3,
                },
              }}
            >
              {projects.map((project, index) => {
                if (index >= 0)
                return (
                  <SwiperSlide key={project.id}>
                    <ProjectItem
                    title={project.name} 
                    desc={project.desc}
                    img={project.img}
                    lan={project.lan}
                     />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </ProjectSectionStyle>
    );
}

export default ProjectSection
