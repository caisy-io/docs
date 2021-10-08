// src: https://gist.github.com/evenfrost/1ba123656ded32fb7a0cd4651efd4db0

const highlight = (fuseSearchResult: any, highlightClassName: string = 'highlighted') => {
  const set = (obj: object, path: string, value: any, refIndex: number) => {
    const pathValue = path.split('.');
    obj[pathValue[0]][refIndex]['highlighted'] = value;
};

  const generateHighlightedText = (inputText: string, regions: number[] = []) => {
    let content = [];
    let nextUnhighlightedRegionStartingIndex = 0;

    regions.forEach(region => {
      const lastRegionNextIndex = region[1] + 1;

      content.push({text: inputText.substring(nextUnhighlightedRegionStartingIndex, region[0])});
      content.push({highlighted: true, text: inputText.substring(region[0], lastRegionNextIndex)});

      nextUnhighlightedRegionStartingIndex = lastRegionNextIndex;
    });

    content.push({text: inputText.substring(nextUnhighlightedRegionStartingIndex)});
    return content;
  };

  return fuseSearchResult
    .filter(({ matches }: any) => matches && matches.length)
    .map(({ item, matches }: any) => {
      const highlightedItem = { ...item };
      matches.forEach((match: any) => {
        set(highlightedItem, match.key, generateHighlightedText(match.value, match.indices), match.refIndex);
      });

      return highlightedItem;
    });
};

export { highlight }