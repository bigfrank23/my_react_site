import React from 'react'
import { useHistory, BrowserRouter as Router, Link } from 'react-router-dom'
import styled from 'styled-components'

const ButtnStyle = styled.div`
  margin-top: 1rem;
  .button {
    background: ${(props) =>
      props.outline ? "transparent" : "lightslategray"};
    font-size: ${(props) => (props.outline ? "1.6rem" : "2.2rem")};
    font-family: Poppins, sans-serif;
    font-weight: 700;
    padding: 0.7em 2em;
    border-radius: 8px;
    display: inline-block;
    border: 2px solid #bcb4b4;
    position: relative;
    z-index: 1;
    color: ${(props) => (props.outline ? "#bcb4b4" : "black")};
    text-decoration: none;
    &:hover {
      border-right-color: ${(props) =>
        props.outline ? "lightslategray" : "lightslategray"};
      color: ${(props) => (props.outline ? "#bcb4b4" : "#bcb4b4")};
      font-weight: 400;
    }
  }
  @media only screen and (max-width: 768px) {
    .button {
      font-size: 1.5rem;
      padding: 20px;
    }
  }
`;

//the dafault value of the props is optional
function Button({ btnLinks = "Text", btnText = "Text", outline = false }) {
  const history = useHistory();
  return (
    <ButtnStyle
      outline={outline}
      className="button-wrapper"
      onClick={() => history.push(btnLinks)}
    >
      <Router>
        <Link className="button" to={btnLinks}>
          {btnText}
        </Link>
      </Router>
    </ButtnStyle>
  );
}

export default Button
