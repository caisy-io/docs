import styled from "styled-components";

export const SDropdownOptionItem = styled.a`
  display: inline-block;
  width: 100%;

  &:hover,
  &.selected {
    //color: var(--primary-400);
    background-color: var(--primary-100);
    cursor: pointer;
  }
`;
