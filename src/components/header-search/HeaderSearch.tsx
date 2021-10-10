import { Input, IconSearch, IDropdownCategory, Popover } from '@caisy/league';
import React, { useEffect, useRef } from 'react';
import { SHeaderSearch } from './styles/SHeaderSearch';
import Fuse from 'fuse.js'
import { highlight } from 'src/utils/highlight';
import { HeaderDropdown } from './HeaderDropdown';
import getCategoriesData from 'src/utils/getCategoriesData';

interface IHeaderSearch {
  _?: null;
  NavigationTop?: any;
}

export const HeaderSearch: React.FC<IHeaderSearch> = ({ ...props }) => {
  const [inputValue, setInputValue] = React.useState<string>('');
  const [dropdownOpen, setDropdownOpen] = React.useState<boolean>(false);

  const categoriesData: Array<IDropdownCategory> = getCategoriesData(props.NavigationTop);

  const [searchResults, setSearchResults] = React.useState<IDropdownCategory[]>(categoriesData);
  
  const popoverRef: React.MutableRefObject<any> = useRef();
  const containerRef: React.MutableRefObject<any> = useRef();

  const fuse = new Fuse(categoriesData, {
    includeScore: true,
    includeMatches: true,
    keys: ['title', 'bodyText']
  });

  const onClickOutside = (e) => {
    if (dropdownOpen && e.target.type !== 'text'){
      setDropdownOpen(false);
      setSearchResults(categoriesData);
      setInputValue('');
    }
  };
  
  const onSelect = (selectedCategory) => {
    console.log('selectedCategory', selectedCategory);

    setDropdownOpen(false);
    setSearchResults(categoriesData);
    setInputValue(selectedCategory.headline);
  };

  const onChange = (e) => {
    setInputValue(e.target.value);
    setDropdownOpen(true);
    if(e.target.value.length > 0){
      console.log('search text',  e.target.value);
      const fuseSearchResult = fuse.search(e.target.value);
      console.log('fuseSearchResult', fuseSearchResult);
      const highlighted = highlight(fuseSearchResult);
      console.log('highlighted', highlighted);
      setSearchResults(highlighted);
    } else {
      setSearchResults(categoriesData);
    }
  };

  const onClose = () => {
    setDropdownOpen(false);
    setSearchResults(categoriesData);
    setInputValue('');
  };

  const onClick = () => {
    fuse.setCollection(categoriesData);
    setSearchResults(inputValue.length > 0 ? highlight(fuse.search(inputValue)) : categoriesData);
    if(!dropdownOpen) setDropdownOpen(!dropdownOpen);
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
            placement='bottom'
            onClickOutside={onClickOutside}
          >
            <HeaderDropdown 
              categories={searchResults}
              active={dropdownOpen} 
              onSelect={onSelect}
            />
          </Popover>
        </div>
      )}
    </SHeaderSearch>
  );
};
