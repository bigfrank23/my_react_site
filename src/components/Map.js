import React from 'react'
import styled from 'styled-components';
import PText from './PText';
import MapImg from '../image2.jpg'

const MapStyles = styled.div`
  background: url(${MapImg}) no-repeat center / cover;
  min-height: 400px;
  .container {
    position: relative;
    min-height: 400px;
  }
  .map__card {
    position: absolute;
    top: 5%;
    right: 10%;
    bottom: 10%;
    padding: 2rem;
    background: #221d1c;
    width: 100%;
    max-width: 300px;
    border-radius: 12px;
  }
  .map__card__heading {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #fff;
    font-family: Poppins, sans-serif;
  }
  .map__card__link {
    display: inner-block;
    font-size: 1.6rem;
    margin-top: 3rem;
    text-decoration: underline;
    color: #fff;
    font-family: Poppins, sans-serif;
  }
  @media only screen and (max-width: 768px) {
    background-position: 80% center;
    .fa-map-pin:before {
      content: "\f276";
      text-align: center;
      position: absolute;
      top: 50%;
      left: 20%;
      transform: translate(-50%, -50%);
      font-size: x-large;
    }
  }
`;

function Map() {
    return (
      <MapStyles>
        <div className="container">
          <div className="map__card">
            <h3 className="map__card__heading">Current Location</h3>
            <PText>
              <i
                class="fa fa-map-pin"
                style={{ color: "red" }}
                aria-hidden="true"
              ></i>
              <br />
              Lagos , Nigeria
            </PText>
            <a
              href="https://www.google.com.ng/maps/@6.5351549,2.9765108,9z?hl=en"
              target="_blank"
              rel="noreferrer"
              className="map__card__link"
            >
              Open in Google Map
            </a>
          </div>
        </div>
      </MapStyles>
    );
}

export default Map
