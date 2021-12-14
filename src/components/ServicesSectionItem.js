import React from "react";
import PText from "./PText";
import styled from "styled-components";

const ItemStyles = styled.div`
  text-align: center;
  .servicesItem__icon {
    svg {
      width: 3rem;
    }
  }
  .servicesItem__title {
    font-size: 2.5rem;
    font-family: Poppins, sans-serif;
    color: #fff;
  }
  .para {
    margin-top: 2rem;
  }
`;

function ServicesSectionItem({ icon, title, desc }) {
  return (
    <ItemStyles>
      <div className="servicesItem__icon">{icon} </div>
      <div className="servicesItem__title">{title}</div>
      <PText>{desc}</PText>
    </ItemStyles>
  );
}

export default ServicesSectionItem;
