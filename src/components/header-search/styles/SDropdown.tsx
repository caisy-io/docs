import styled from "styled-components";

export const SDropdown = styled.ul<any>`
  width: 44vw;
  min-height: auto;
  max-height: 500px;
  padding-bottom: 8px;
  border-radius: 4px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 8px 10px;
  overflow-y: auto;
  transition: left 0.2s;
  z-index: 9;
  
  &.dropdown {
    transform: scale(1);
    opacity: 1;
    transition: all 0.2s;
  }

  .title, .dropdown-option {
    .highlighted {
      background-color: var(--primary-100);
      border-radius: 5%;
      padding: 2px 0;
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
