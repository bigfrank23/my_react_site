import styled from "styled-components";

const GlobalStyles = styled.div`
  /* Smooth Scroll */
  [data-scrollbar] {
    height: 100vh;
    overflow: hidden;
    background-color: red;
    .scroll-content {
      background-color: red;
    }
    .scrollbar-track.scrollbar-track-y {
        z-index: 101;
      background-color: red;
      .scrollbar-thumb-y {
        background-color: red;
      }
    }
  }
`;
export default GlobalStyles