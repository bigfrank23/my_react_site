import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import SectionTitle from './../components/SectionTitle';
import ProjectItem from './../components/ProjectItem';
import ProjectInfo from '../data/projects'

const ProjectStyles = styled.div`
  padding: 10rem 0;
  .projects__allItems {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 5rem;
    margin-top: 5rem;
  }
  .projects__searchBar {
    position: relative;
    width: 300px;
    margin-top: 5rem;
  }
  .projects__searchBar input {
    width: 100%;
    font-size: 2rem;
    padding: 0.8rem;
    color: #000;
    border-radius: 6px;
    outline: none;
    border: none;
  }
  .projects__searchBar .searchIcon::before {
    position: absolute;
    width: 2rem;
    right: 0.5rem;
    opacity: 0.5;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  @media only screen and (max-width: 768px) {
    padding: 7rem 0 0 0;
    .projects__searchBar,
    .projects__searchBar form,
    .projects__searchBar input {
      width: 100%;
    }
  }
`;

function Projects() {
    const [searchText, setSearchText] = useState('')
    const [projectData, setProjectData] = useState(ProjectInfo);

    useEffect(()=>{
        if(searchText === '') return;
        setProjectData(()=> (
            ProjectInfo.filter(item =>(
                item.name.toLowerCase().match(searchText.toLowerCase())
            ))
        ))

    }, [searchText])

    function handleChange(e) {
        e.preventDefault();
        setSearchText(e.target.value);
        if(!e.target.value.length > 0){
            setProjectData(ProjectInfo);
        }
    }

    return (
      <ProjectStyles>
        <div className="container">
          <SectionTitle
            heading="Projects"
            subheading="some of my recent works"
          />
          <div className="projects__searchBar">
            <form>
              <input type="text"
              value={searchText}
              onChange={handleChange}
              placeholder="Project Name"
               />
              <i
                class="fa fa-search searchIcon"
                aria-hidden="true"
              ></i>
            </form>
          </div>
          <div className="projects__allItems">
            {projectData.map((item) => (
              <ProjectItem
                key={item.id}
                title={item.name}
                desc={item.desc}
                img={item.img}
                lan={item.lan}
              />
            ))}
          </div>
        </div>
      </ProjectStyles>
    );
}

export default Projects
