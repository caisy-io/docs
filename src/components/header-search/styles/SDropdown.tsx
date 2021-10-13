import styled from "styled-components";

export const SDropdown = styled.ul<any>`
  overflow-y: auto;
  min-height: auto;
  max-height: 500px;
  padding-bottom: 8px;
  .title, .dropdown-option {
    .highlighted {
      font-weight: 700;
      /* background-color: var(--primary-200); */
      /* border-radius: 5%; */
      /* padding: 2px 0; */
    }
  }

  .search-option-disable {
    pointer-events: none;
    color: var(--neutral-500);
  }

  .search-btn {
    cursor: pointer;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--black-opacity-48);
    border-radius: 3px;
  }
`;
