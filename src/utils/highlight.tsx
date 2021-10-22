// src: https://gist.github.com/evenfrost/1ba123656ded32fb7a0cd4651efd4db0
const set = (obj: object, path: string, value: any) => {
  const pathValue = path.split(".");
  let i;

  for (i = 0; i < pathValue.length - 1; i++) {
    obj = obj[pathValue[i]];
  }

  obj[pathValue[i]] = value;
};

const highlight = (fuseSearchResult: any) => { //searchInputValue: string
  // do normal matches and then highlight only the ones that are exact matches
  // sort all the matches so the ones with real highlight are infront
  // return only the first result (first line plus next 2 lines of the result text)
  const generateHighlightedText = (inputText: string, regions: number[] = []) => {
    const content = [];
    let nextUnhighlightedRegionStartingIndex = 0;

    regions.forEach((region) => {
      // optional version filtering with search result
      // const lastRegionNextIndex = region[1] + 1;
      // const selectionIncluding30More = inputText.substring(region[0] - 30, region[1] + 30);
      // const includesTerm = selectionIncluding30More.toLowerCase().includes(searchInputValue.toLowerCase());
      // if (includesTerm) {
      //   content.push({ text: inputText.substring(nextUnhighlightedRegionStartingIndex, region[0]) });
      //   content.push({ highlighted: true, text: inputText.substring(region[0], lastRegionNextIndex) });
      //   nextUnhighlightedRegionStartingIndex = lastRegionNextIndex;
      // }else {
      //   console.log(` searchInputValue`, searchInputValue);
      // }

      const lastRegionNextIndex = region[1] + 1;
      content.push({ text: inputText.substring(nextUnhighlightedRegionStartingIndex, region[0]) });
      content.push({ highlighted: true, text: inputText.substring(region[0], lastRegionNextIndex) });

      nextUnhighlightedRegionStartingIndex = lastRegionNextIndex;
    });

    content.push({ text: inputText.substring(nextUnhighlightedRegionStartingIndex) });
    return content;
  };

  return fuseSearchResult
    .filter(({ matches }: any) => matches && matches.length)
    .map(({ item, matches }: any) => {
      const highlightedItem = { ...item };
      matches.forEach((match: any) => {
        set(highlightedItem, match.key, generateHighlightedText(match.value, match.indices));
      });
      return highlightedItem;
    });
};

export { highlight };
