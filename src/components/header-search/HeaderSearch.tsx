import { Input, Dropdown, IconSearch, IDropdownCategory, DropdownResultsList, Popover } from "@caisy/league";
import React, { Fragment, useRef } from "react";
import { SHeaderSearch } from "./styles/SHeaderSearch";
import Fuse from 'fuse.js'
import { highlight } from "src/utils/highlight";

interface IHeaderSearch {
  _?: null;
}

const dataArray = [
  {
    "key": "test",
    "visible": true,
    "items": [
      {
        "key": "Badges",
        "label": "Badges",
        "visible": true,
      },
      {
        "key": "Button external link",
        "label": "Button external link",
        "visible": true,
      },
      {
        "key": "Button internal pages",
        "label": "Button internal pages",
        "visible": true,
      },
    ],
  },
  {
    "key": "test2",
    "visible": true,
    "items": [
      {
        "key": "Donate",
        "label": "donate",
        "visible": true,
      },
      {
        "key": "link",
        "label": "link",
        "visible": true,
      },
      {
        "key": "pages",
        "label": "pages",
        "visible": true,
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

  const updateData = () => {
    const data = [];
    categories.forEach((i) => data.push(i['item']));
    return data;
  }

  const fuse = new Fuse(dataArray, {
    includeScore: true,
    distance: 2,
    includeMatches: true,
    keys: ['items.label']
  })

  const onClickOutside = () => {
    setDropdownOpen(false);
    setCategories(dataArray);
  };
  
  const onSelect = (e) => {
    setDropdownOpen(false);
    setCategories(dataArray);
  };

  const onChange = (e) => {
    setInputValue(e.target.value);
    setDropdownOpen(true);
    if(e.target.value.length > 0){
      console.log('result', fuse.search(e.target.value));
      const res = highlight(fuse.search(e.target.value));
      console.log('highlighted', res);
      setCategories(res);
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
          <Dropdown dropDownPosition={1} categories={categories?.[0]?.['item'] ? updateData() : categories} active={dropdownOpen} onSelect={onSelect}/>
        </Popover>
      )}
    </SHeaderSearch>
  );
};
