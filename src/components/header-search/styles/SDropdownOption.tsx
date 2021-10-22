import styled from "styled-components";

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
  overflow-wrap: break-word;
  display: block;
  white-space: pre-line;

  ${(props) => props.selected && "color: var(--primary-400); background-color: var(--primary-100);"}
`;
