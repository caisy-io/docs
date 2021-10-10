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

export default parseBodyText;