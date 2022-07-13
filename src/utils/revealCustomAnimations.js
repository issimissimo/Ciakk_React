import { keyframes } from "@emotion/react";

export const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0px, 50px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

export const fadeOutUp = keyframes`
  from {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  to {
    opacity: 0;
    transform: translate3d(0px, -50px, 0);
  }
`;


export const lineFadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translate3d(-150px, 0, 0);
  }

  to {
    opacity: 0.5;
    transform: translate3d(0px, 0px, 0);
  }
`;


export const lineFadeOutLeft = keyframes`
  from {
    opacity: 0.5;
    transform: translate3d(0, 0, 0);
  }

  to {
    opacity: 0;
    transform: translate3d(150px, 0px, 0);
  }
`;


export const lineFadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translate3d(150px, 0, 0);
  }

  to {
    opacity: 0.5;
    transform: translate3d(0px, 0px, 0);
  }
`;


export const lineFadeOutRight = keyframes`
  from {
    opacity: 0.5;
    transform: translate3d(0, 0, 0);
  }

  to {
    opacity: 0;
    transform: translate3d(-150px, 0px, 0);
  }
`;