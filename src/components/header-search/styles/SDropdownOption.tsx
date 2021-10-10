import styled from "styled-components";

interface ISDropdownOption {
  selected: boolean | undefined;
}

export const SDropdownOption = styled.li<any>`
  display: block;
  margin-bottom: 20px;
  color: var(--neutral-800);
  max-height: 200px;
  line-height: 24px;
  align-items: center;
  padding: 0 16px;
  font-size: 12px;

  &:not(:hover),
  &:not(.current-selection) {
    user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
  }

  overflow: hidden;
  white-space: pre;
  text-overflow: ellipsis;
  display: block;

  /*&.current-selection,
  &:hover {
    //color: var(--primary-400);
    background-color: var(--primary-100);
    cursor: pointer;
  }*/

  ${(props) => props.selected && "color: var(--primary-400); background-color: var(--primary-100);"}
`;
