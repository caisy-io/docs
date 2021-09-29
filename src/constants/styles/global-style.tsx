import { createGlobalStyle, css } from "styled-components";

const Bronze = css`
  a:-webkit-any-link,
  a {
    text-decoration: none;
    color: var(--neutral-700);
    cursor: pointer;
  }
`;

export const GSBaseDocs = createGlobalStyle`
    ${Bronze}
`;
