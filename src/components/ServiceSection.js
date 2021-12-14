import React from "react";
import styled from "styled-components";
import SectionTitle from "./SectionTitle";
import ServicesSectionItem from "./ServicesSectionItem";

const ServicesItemStyles = styled.div`
  padding: 0;
  .services__allItems {
    display: flex;
    gap: 5rem;
    justify-content: space-between;
    margin-top: 5rem;
    padding-right: 50px;
    padding-left: 50px;
    background: linear-gradient(to left, #1a1a1a, #333);
  }
  @media only screen and (max-width: 768px) {
    padding: 0;
    .services__allItems {
      flex-direction: column;
      max-width: 350px;
      margin: 4rem auto;
      gap: 3rem;
    }
  }
`;

function ServiceSection() {
  return (
    <ServicesItemStyles>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center">
          <SectionTitle heading="Services" subheading="what I can do for you" />
          <div className="services__allItems">
            <ServicesSectionItem
              icon={
                <i
                  class="fa fa-code"
                  style={{ color: "#6ea2dd", fontSize: "xxx-large" }}
                />
              }
              title="Web development"
              desc="  I develop good reponsive websites and web apps
                        with some mind-blowing designs.
                        Websites and Apps with powerful performance, effective responsiveness, stylish and user-friendly
                        are ideal. Hence, I enjoy crafting such.
                        If you have a design, I can create the Front-End and Back-end code for it.
                        I code from scratch or otherwise."
            />
            <ServicesSectionItem
              icon={
                <i
                  class="fa fa-gamepad"
                  style={{ color: "#cf96c2", fontSize: "xxx-large" }}
                />
              }
              title="Game development"
              desc="For gamers, if you have a game idea you wish to have for yoursels or sell
              hit the contact button now. Meanwhile, I can train your kids on how
              to code by building simple games of thier choice now!"
            />
            <ServicesSectionItem
              icon={
                <i
                  class="fa fa-mobile"
                  style={{ color: "#f2cd5f", fontSize: "xxx-large" }}
                />
              }
              title="Mobile app development"
              desc="Mobile app development(with react native, ionic) coming pretty soon..."
            />
          </div>
        </div>
      </div>
    </ServicesItemStyles>
  );
}

export default ServiceSection;
