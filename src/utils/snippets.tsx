const MAX_PREFIX_LENGTH = 30;
const MAX_SUFFIX_LENGTH = 30;

const createSnippets = (highlightedText: Array<object>) => {
  const highlightedPartsIndices = new Set();
  const highlightedPartsPrefixesIndices = new Set();
  const highlightedPartsSuffixesIndices = new Set();

  highlightedText.forEach((part, index) => {
    const isHighlighted = "highlighted" in part && part["highlighted"];

    if (isHighlighted) {
      highlightedPartsIndices.add(index);
      if (index - 1 >= 0) {
        highlightedPartsPrefixesIndices.add(index - 1);
      }
      if (index + 1 < highlightedText.length) {
        highlightedPartsSuffixesIndices.add(index + 1);
      }
    }
  });

  const snippets = [];

  highlightedText.forEach((part, index) => {
    const isPrefixSnippet = highlightedPartsPrefixesIndices.has(index);
    const isSuffixSnippet = highlightedPartsSuffixesIndices.has(index);
    const isFullSnippet = highlightedPartsIndices.has(index) || (isPrefixSnippet && isSuffixSnippet);

    const partText = part["text"] || "";

    if (isFullSnippet) {
      snippets.push(part);
    } else if (isPrefixSnippet) {
      const prefixSnippetText =
        partText.length <= MAX_PREFIX_LENGTH
          ? partText
          : "..." + partText.substr(partText.length - MAX_PREFIX_LENGTH, partText.length);

      snippets.push({ ...part, text: prefixSnippetText });
    } else if (isSuffixSnippet) {
      const suffixSnippetText =
        partText.length <= MAX_SUFFIX_LENGTH ? partText : partText.substr(0, MAX_SUFFIX_LENGTH) + "...";

      snippets.push({ ...part, text: suffixSnippetText });
    }
  });

  return snippets;
};

export { createSnippets };
