import { Input, Dropdown, IconSearch, IDropdownCategory, Popover, DropdownResultsList } from "@caisy/league";
import React, { useRef } from "react";
import { SHeaderSearch } from "./styles/SHeaderSearch";
import lunr from "lunr";

interface IHeaderSearch {
  _?: null;
}

const dataArray = [
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
];

export const HeaderSearch: React.FC<IHeaderSearch> = ({ ...props }) => {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [dropdownOpen, setDropdownOpen] = React.useState<boolean>(false);
  const [categories, setCategories] = React.useState<IDropdownCategory[]>(dataArray);
  const ref: any = useRef();
  const containerRef: any = useRef();

  var idx = lunr(function () {
    this.ref('key')
    this.field('label')
    this.field('items')
  
    dataArray.forEach(function (category) {
      this.add(category)
    }, this)
  });

  const onSelect = (e) => {
    setDropdownOpen(false);
  };

  const onClickOutside = () => {
    setDropdownOpen(false);
  };

  const onChange = (e) => {
    console.log(` e`, e);
    console.log("old categories", categories);

    setInputValue(e.target.value);
    setDropdownOpen(true);

    if (e.target.value.length > 0) {
      console.log(idx.search(e.target.value));
      setCategories(idx.search(e.target.value));
    } else { 
      setCategories(dataArray); 
    }
  };

  return (
    <SHeaderSearch ref={containerRef}>
      <Input
        // onClose={props.onClose}
        hasCloseButton
        icon={IconSearch}
        value={inputValue}
        onChange={(e) => onChange(e)}
      />
      {containerRef.current && (
        <Popover container={ref} onClickOutside={onClickOutside} disableTriangle placement="bottom" reference={ref}>
          <DropdownResultsList categories={categories} active={dropdownOpen} onSelect={(e) => onSelect(e)} />
        </Popover>
      )}
    </SHeaderSearch>
  );
};
