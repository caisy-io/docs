import styled, { css } from "styled-components";
import { MIN_SILVER, MIN_GOLD, MIN_PLATINUM, MIN_DIAMOND } from "../../../constants/styles/mediaquerys";

interface ISArticle {}

const Bronze = css<ISArticle>`
  display: flex;
  flex-direction: column;
  gap: 32px;
  overflow-x: hidden;
  overflow-y: auto;
  height: calc(100vh - 238px);
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--primary-500-opacity-48);
    border-radius: 6px;
  }
`;

const Silver = css<ISArticle>``;

const Gold = css<ISArticle>`
  padding: 0 calc(100% / 2 - 500px);
`;

const Platinum = css<ISArticle>``;

const Diamond = css<ISArticle>``;

export const SArticle = styled.div`
  ${Bronze}
  ${MIN_SILVER`${Silver}`};
  ${MIN_GOLD`${Gold}`};
  ${MIN_PLATINUM`${Platinum}`};
  ${MIN_DIAMOND`${Diamond}`};
`;
