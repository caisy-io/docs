import styled, { css } from "styled-components";
import { MIN_SILVER, MIN_GOLD, MIN_PLATINUM, MIN_DIAMOND } from "../../../constants/styles/mediaquerys";

const activeStyle = css`
  transition: all 0.2s ease-out;
  transform: scale(1);
  opacity: 1;
  left: 8px;
  top: 4px;
  position: absolute;
`;

const Bronze = css`
  width: 40vw;
  border-radius: 6px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 8px 10px;
  overflow: hidden;
  z-index: 9;
  transform: scale(0);
  opacity: 0;
  transition: none;
  ${(props: any) => (props.active ? activeStyle : null)}
`;

const Silver = css``;

const Gold = css``;

const Platinum = css``;

const Diamond = css``;

export const SDropdownOuterContainer = styled.div`
  ${Bronze}
  ${MIN_SILVER`${Silver}`};
  ${MIN_GOLD`${Gold}`};
  ${MIN_PLATINUM`${Platinum}`};
  ${MIN_DIAMOND`${Diamond}`};
`;
