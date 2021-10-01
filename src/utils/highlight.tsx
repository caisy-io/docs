// src: https://gist.github.com/evenfrost/1ba123656ded32fb7a0cd4651efd4db0

const highlight = (fuseSearchResult: any, highlightClassName: string = 'highlight') => {
  const set = (obj: object, path: string, value: any) => {
      const pathValue = path.split('.');
      let i;

      for (i = 0; i < pathValue.length - 1; i++) {
        obj = obj[pathValue[i]];
      }

      obj[pathValue[i]] = value;
  };

  const generateHighlightedText = (inputText: string, regions: number[] = []) => {
    let content = '';
    let nextUnhighlightedRegionStartingIndex = 0;

    regions.forEach(region => {
      const lastRegionNextIndex = region[1] + 1;

      content += [
        inputText.substring(nextUnhighlightedRegionStartingIndex, region[0]),
        `<span class="${highlightClassName}">`,
        inputText.substring(region[0], lastRegionNextIndex),
        '</span>',
      ].join('');

      nextUnhighlightedRegionStartingIndex = lastRegionNextIndex;
    });

    content += inputText.substring(nextUnhighlightedRegionStartingIndex);
    return content;
  };

  return fuseSearchResult
    .filter(({ matches }: any) => matches && matches.length)
    .map(({ item, matches }: any) => {
      const highlightedItem = { ...item };

      matches.forEach((match: any) => {
        console.log('match', match);
        set(highlightedItem, match.key, generateHighlightedText(match.value, match.indices));
      });

      return highlightedItem;
    });
};

export {highlight}