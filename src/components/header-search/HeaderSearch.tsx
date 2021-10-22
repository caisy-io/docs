import { Input, IconSearch, Popover } from "@caisy/league";
import { useState, useRef, FC, MutableRefObject, useEffect, useMemo } from "react";
import { SHeaderSearch } from "./styles/SHeaderSearch";
import Fuse from "fuse.js";
import { highlight } from "src/utils/highlight";
import { HeaderDropdown, IDropdownCategory } from "./HeaderDropdown";
import getCategoriesData from "src/utils/getCategoriesData";

interface IHeaderSearch {
  NavigationTop?: any;
  setCurrentTab?: (number: number) => void;
}

export const HeaderSearch: FC<IHeaderSearch> = ({ ...props }) => {
  const fuse = useRef<any>();
  const categoriesData: Array<IDropdownCategory> = useMemo(
    () => getCategoriesData(props.NavigationTop),
    [props.NavigationTop],
  );

  useEffect(() => {
    fuse.current = new Fuse(categoriesData, {
      includeMatches: true,
      includeScore: true,
      ignoreLocation: true,
      minMatchCharLength: 3,
      threshold: 0.5,
      shouldSort: true,
      keys: ["title", "bodyText"],
    });
  }, [categoriesData]);

  useEffect(() => {
    fuse.current?.setCollection(categoriesData);
  }, [fuse.current, categoriesData]);

  const [searchResults, setSearchResults] = useState<IDropdownCategory[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [currentOptionIndex, setCurrentOptionIndex] = useState<number>(-1);

  const popoverRef: MutableRefObject<any> = useRef();
  const containerRef: MutableRefObject<any> = useRef();

  const onClickOutside = (e) => {
    if (dropdownOpen && e.target.type !== "text") {
      setCurrentOptionIndex(-1);
      setDropdownOpen(false);
      setSearchResults([]);
      setInputValue("");
    }
  };

  const onSelect = (selectedCategory) => {
    setCurrentOptionIndex(-1);
    setDropdownOpen(false);
    setSearchResults([]);
    setInputValue(selectedCategory.headline);
    props.setCurrentTab(
      props.NavigationTop?.items?.findIndex((item) => item["slug"] == selectedCategory.path.split("/")[1]) || 0,
    );
  };

  const onChange = (e) => {
    setInputValue(e.target.value);
    setDropdownOpen(true);
    if (e.target.value.length > 0 && fuse.current) {
      // console.log('search text',  e.target.value);
      const fuseSearchResult = fuse.current.search(e.target.value);
      const highlighted = highlight(fuseSearchResult);
      setSearchResults(highlighted);
    } else {
      setSearchResults([]);
    }
  };

  const onClose = () => {
    setCurrentOptionIndex(-1);
    setDropdownOpen(false);
    setSearchResults([]);
    setInputValue("");
  };

  const onClick = () => {
    setCurrentOptionIndex(-1);
    setSearchResults(inputValue.length > 0 ? highlight(fuse.current?.search(inputValue)) : []);
    if (!dropdownOpen) setDropdownOpen(!dropdownOpen);
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
            placement="left"
            onClickOutside={onClickOutside as any}
          >
            <HeaderDropdown
              searchInputValue={inputValue}
              categories={searchResults}
              active={dropdownOpen && searchResults.length != 0}
              onSelect={onSelect}
              onClose={onClose}
              currentOptionIndex={currentOptionIndex}
              setCurrentOptionIndex={setCurrentOptionIndex}
            />
          </Popover>
        </div>
      )}
    </SHeaderSearch>
  );
};
