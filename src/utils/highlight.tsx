// src: https://gist.github.com/evenfrost/1ba123656ded32fb7a0cd4651efd4db0

// TODO improve set to be more flexible 

const highlight = (fuseSearchResult: any, highlightClassName: string = 'highlight') => {
  const set = (obj: object, path: string, value: any, refIndex: number) => {
    const pathValue = path.split('.');
    obj[pathValue[0]][refIndex]['highlighted'] = value; // TODO fix hard coded 0?
};

  const generateHighlightedText = (inputText: string, regions: number[] = []) => {
    let content = '';

    regions.forEach(region => {
      const lastRegionNextIndex = region[1] + 1;

      content += [
        inputText.substring(region[0], lastRegionNextIndex),
      ].join('');
    });

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