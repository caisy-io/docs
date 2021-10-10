import { Input, IconSearch, IDropdownCategory, Popover } from "@caisy/league";
import React, { useRef } from "react";
import { SHeaderSearch } from "./styles/SHeaderSearch";
import Fuse from 'fuse.js'
import { highlight } from "src/utils/highlight";
import { HeaderDropdown } from "./HeaderDropdown";

interface IHeaderSearch {
  _?: null;
}

export const HeaderSearch: React.FC<IHeaderSearch> = ({ ...props }) => {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [dropdownOpen, setDropdownOpen] = React.useState<boolean>(false);

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

  const [categories, setCategories] = React.useState<IDropdownCategory[]>(dataArray);

  const popoverRef: React.MutableRefObject<any> = useRef();
  const containerRef: React.MutableRefObject<any> = useRef();

  const fuse = new Fuse(dataArray, {
    includeScore: true,
    distance: 2,
    includeMatches: true,
    keys: ['items.label']
  });

  const onClickOutside = (e) => {
    if (dropdownOpen && e.target.type !== "text"){
      setDropdownOpen(false);
      setCategories(dataArray);
      setInputValue("");
    }
  };
  
  const onSelect = (selectedCategory) => {
    setDropdownOpen(false);
    setCategories(dataArray);
    setInputValue(selectedCategory);
  };

  const onChange = (e) => {
    setInputValue(e.target.value);
    setDropdownOpen(true);
    if(e.target.value.length > 0){
      setCategories(highlight(fuse.search(e.target.value)));
    } else {
      setCategories(dataArray);
    }
  };

  const onClose = () => {
    setDropdownOpen(false);
    setCategories(dataArray);
    setInputValue("");
  };

  const onClick = () => {
    if(!dropdownOpen) setDropdownOpen(!dropdownOpen);
    if(inputValue.length > 0) setCategories(highlight(fuse.search(inputValue)));
  };

  return (
    <SHeaderSearch ref={containerRef}>
      <Input
        onClick={onClick}
        onClose={onClose}
        hasCloseButton 
        icon={IconSearch}
        value={inputValue}
        onChange={onChange}
      />
      {containerRef.current && (
        <div ref={popoverRef}>
          <Popover 
            disableTriangle 
            reference={popoverRef}
            container={popoverRef}
            placement="bottom"
            onClickOutside={onClickOutside}
          >
            <HeaderDropdown 
              dropDownPosition={1} 
              categories={categories}
              active={dropdownOpen} 
              onSelect={onSelect}
            />
          </Popover>
        </div>
      )}
    </SHeaderSearch>
  );
};
