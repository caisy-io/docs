import styled from "styled-components";

export const SDropdownOptionHeader = styled.h3`
  display: flex;
  height: 36px;
  border-top: 1px solid var(--neutral-200);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 16px;
  align-items: center;
  //text-transform: uppercase;
  font-size: 12px;
  color: var(--neutral-500);

  .title__headline {
      display: contents;
      font-weight: bold;
      color: var(--neutral-600);
    }
`;
