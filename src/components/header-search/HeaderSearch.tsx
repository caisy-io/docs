import { Input, IconSearch, IDropdownCategory, Popover } from '@caisy/league';
import React, { useEffect, useRef } from 'react';
import { SHeaderSearch } from './styles/SHeaderSearch';
import Fuse from 'fuse.js'
import { highlight } from 'src/utils/highlight';
import { HeaderDropdown } from './HeaderDropdown';
import { IGenNavigationTop } from 'src/constants/gen_types';

interface IHeaderSearch {
  _?: null;
  NavigationTop?: any;
}

export const HeaderSearch: React.FC<IHeaderSearch> = ({ ...props }) => {
  const [inputValue, setInputValue] = React.useState<string>('');
  const [dropdownOpen, setDropdownOpen] = React.useState<boolean>(false);

  const getCategoriesData = () : Array<IDropdownCategory>  => {
    const parseBodyText = (body: Array<object>) : string => {
      const paragraphPrefix = '\n';
      const listItemPrefix = '\n• ';

      const parseBodyTextRecursive = (root: object, prefixes: Array<string> = [], suffixes: Array<string> = []) => {
        const newPrefixes = [...prefixes];
        const newSuffixes = [...suffixes];

        const isTextLeaf = 'type' in root && root['type'] == 'text';
        const isParagraph = 'type' in root && root['type'] == 'paragraph';
        const isListItem = 'type' in root && root['type'] == 'listItem';
        const isCodeBlock = 'type' in root && root['type'] == 'codeBlock'; 

        const hasTitleAndText = 'title' in root && 'text' in root;
        const hasContent = 'content' in root;

        if(isListItem) {
          newPrefixes.push(listItemPrefix);
        } else if(isParagraph && !newPrefixes.includes(listItemPrefix)) {
          newPrefixes.push(paragraphPrefix);
        } else if(isCodeBlock) {
          newPrefixes.push(paragraphPrefix);
          newSuffixes.push(paragraphPrefix);
        }

        if(isTextLeaf) {
          return newPrefixes.concat([root['text']]).concat(newSuffixes);
        } else if (hasTitleAndText) {
          // const title = root['title']; // Use this?
          return ['\n', ...parseBodyTextRecursive(root['text'], newPrefixes, newSuffixes)];
        } else if(hasContent) {
          return (root['content'] || []).flatMap(item => parseBodyTextRecursive(item, newPrefixes, newSuffixes));
        } else {
          return [];
        }
      }
      return body.flatMap(item => parseBodyTextRecursive(item)).join('').trim();
    };

    const getCategoriesDataRecursive = (root: object, path: string = '', titles: string = '') : Array<IDropdownCategory> => {
      if(!root) {
        return [];
      }
      
      const isPageLeaf = 'body' in root;

      if(isPageLeaf) {
        const headline = root['headline'] || '';
        const newPath = path + '/' + (root['slug'] || '');
        const title = titles + ' / ' + headline;
        const rawBody = root['body'];
        const bodyText = parseBodyText(rawBody);

        return [{ path: newPath, title, headline, rawBody, bodyText}];
      } else {
        const newPath = path + (root['slug'] ? ('/' + root['slug']) : '');
        const newTitles = titles + (root['title'] ? (' / ' + root['title']) : '');

        return (root['items'] || [])
          .flatMap(item => getCategoriesDataRecursive(item, newPath, newTitles));
      }
    }

    return getCategoriesDataRecursive(props.NavigationTop);
  }

  const categoriesData: Array<IDropdownCategory> = getCategoriesData();

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
