import React from 'react'
import { Link } from 'react-router-dom'
// import ProjectImg from '../data/projects'
import ProjectImg from '../inspiration1.jpg'
import styled from 'styled-components'

const ProjectItemStyles = styled.div`
  .projectItem__img {
    width: 100%;
    height: 400px;
    overflow: hidden;
    border-radius: 12px;
    display: inline-block;
    border: 3px solid #3c3c3c;
    img {
      height: 100%;
    }
  }
  .projectItem__info {
    margin-top: 1rem;
    background-color: #221d1c;
    padding: 1rem;
    border-radius: 12px;
  }
  .projectItem__desc {
    font-size: 1.6rem;
    margin-top: 1rem;
    font-family: Poppins, sans-serif;
    color: #fff;
  }
  @media only screen and (max-width: 768px) {
    .projectItem__img {
      height: 350px;
    }
  }
`;

function ProjectItem({
  img= ProjectImg,
  title= 'Project Name',
  desc= 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, cupiditate',
  lan= 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, cupiditate'
}) {
    return (
      <ProjectItemStyles>
        <Link to="/projects" className="projectItem__img">
          <img src={img} alt="project img" style={{ width: "100%" }} />
        </Link>
        <div className="projectItem__info">
          <a
            href="http://myprojects111.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3
              className="projectItem__title"
              style={{
                fontSize: "2rem",
                color: "#f2cd5f",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              {title}
            </h3>
          </a>
          <p className="projectItem__desc">{desc}</p>
          <p className="projectItem__lan" style={{ color: "ghostwhite" }}>
            {lan}
          </p>
        </div>
      </ProjectItemStyles>
    );
}

export default ProjectItem
