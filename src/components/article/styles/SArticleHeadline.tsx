import styled, { css } from "styled-components";
import { MIN_SILVER, MIN_GOLD, MIN_PLATINUM, MIN_DIAMOND } from "../../../constants/styles/mediaquerys";

interface ISArticleHeadline {}

const Bronze = css<ISArticleHeadline>`
  font-weight: bold;
  font-size: 48px;
`;

const Silver = css<ISArticleHeadline>``;

const Gold = css<ISArticleHeadline>``;

const Platinum = css<ISArticleHeadline>``;

const Diamond = css<ISArticleHeadline>``;

export const SArticleHeadline = styled.h1`
  ${Bronze}
  ${MIN_SILVER`${Silver}`};
  ${MIN_GOLD`${Gold}`};
  ${MIN_PLATINUM`${Platinum}`};
  ${MIN_DIAMOND`${Diamond}`};
`;
