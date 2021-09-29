import { Input, Dropdown, IconSearch, IDropdownCategory } from "@caisy/league";
import React from "react";
import { SHeaderSearch } from "./styles/SHeaderSearch";

interface IHeaderSearch {
  _?: null;
}

export const HeaderSearch: React.FC<IHeaderSearch> = ({ ...props }) => {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [dropdownOpen, setDropdownOpen] = React.useState<boolean>(false);
  const [categories, setCategories] = React.useState<IDropdownCategory[]>([
    {
      key: "test",
      visible: true,
      items: [
        {
          key: "Badges",
          label: "Badges",
          visible: true,
        },
        {
          key: "Button external link",
          label: "Button external link",
          visible: true,
        },
        {
          key: "Button internal pages",
          label: "Button internal pages",
          visible: true,
        },
      ],
    },
  ]);
  const onSelect = (e) => {
    setDropdownOpen(false);
  };
  const onChange = (e) => {
    console.log(` e`, e);
    setInputValue(e.target.value);
    setDropdownOpen(true);
  };

  return (
    <SHeaderSearch>
      <Input
        // onClose={props.onClose}
        hasCloseButton
        icon={IconSearch}
        value={inputValue}
        onChange={(e) => onChange(e)}
      />
      <Dropdown dropDownPosition={0} categories={categories} active={dropdownOpen} onSelect={(e) => onSelect(e)} />
    </SHeaderSearch>
  );
};
