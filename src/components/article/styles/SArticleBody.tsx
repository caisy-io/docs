import styled, { css } from "styled-components";
import { MIN_SILVER, MIN_GOLD, MIN_PLATINUM, MIN_DIAMOND } from "src/constants/styles/mediaquerys";

const Bronze = css`
  padding: 16px;
  pre {
    border-radius: 16px;
    background-color: #252b37;
    color: #e4f0fb;
    padding: 32px;
    line-height: 1.6;
  }
  ul {
    li {
      list-style: initial;
    }
  }
  ol {
    li {
      list-style: decimal;
    }
  }
  li {
    list-style: initial;
  }
  ul,
  ol {
    padding: 0 1.2rem;
  }

  h6 {
    line-height: 1.1;
    font-size: 1.1rem;
  }
  h5 {
    line-height: 1.2;
    font-size: 1.2rem;
  }
  h4 {
    line-height: 1.4;
    font-size: 1.4rem;
  }
  h3 {
    line-height: 1.5;
    font-size: 1.5rem;
  }
  h2 {
    line-height: 1.7;
    font-size: 1.7rem;
  }
  h1 {
    line-height: 2;
    font-size: 2rem;
  }

  strong {
    font-weight: bolder;
  }
  em {
    font-style: italic;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }

  /* Table-specific styling */
  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;

    td,
    th {
      min-width: 1em;
      border: 2px solid #ced4da;
      padding: 3px 5px;
      vertical-align: top;
      box-sizing: border-box;
      position: relative;

      > * {
        margin-bottom: 0;
      }
    }

    th {
      font-weight: bold;
      text-align: left;
      background-color: #f1f3f5;
    }

    .selectedCell:after {
      z-index: 2;
      position: absolute;
      content: "";
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(200, 200, 255, 0.4);
      pointer-events: none;
    }

    .column-resize-handle {
      position: absolute;
      right: -2px;
      top: 0;
      bottom: -2px;
      width: 4px;
      background-color: #adf;
      pointer-events: none;
    }
  }

  .tableWrapper {
    overflow-x: auto;
  }

  .resize-cursor {
    cursor: col-resize;
  }

  iframe {
    display: block;
  }

  a {
    color: var(--action-primary-default);
    cursor: pointer;
  }
`;

const Silver = css``;

const Gold = css``;

const Platinum = css``;

const Diamond = css``;

export const SArticleBody = styled.div`
  ${Bronze};
  ${MIN_SILVER`${Silver}`};
  ${MIN_GOLD`${Gold}`};
  ${MIN_PLATINUM`${Platinum}`};
  ${MIN_DIAMOND`${Diamond}`};
`;
