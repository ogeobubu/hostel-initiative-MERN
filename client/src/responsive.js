import { css } from "styled-components";

export const small = (props) => {
  return css`
    @media only screen and (max-width: 320px) {
      ${props}
    }
  `;
};

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 540px) {
      ${props}
    }
  `;
};

export const tablet = (props) => {
  return css`
    @media only screen and (max-width: 780px) {
      ${props}
    }
  `;
};

export const largeTablet = (props) => {
  return css`
    @media only screen and (max-width: 862px) {
      ${props}
    }
  `;
};

export const aboutResponsive = (props) => {
  return css`
    @media only screen and (max-width: 1073px) {
      ${props}
    }
  `;
};

export const large = (props) => {
  return css`
    @media only screen and (max-width: 1260px) {
      ${props}
    }
  `;
};

export const imageConfig = (props) => {
  return css`
  @media only screen and (max-width: 1290px) {
    ${props}
  }
  `;
};

export const extraLarge = (props) => {
  return css`
    @media only screen and (min-width: 1300px) {
      ${props}
    }
  `;
};
