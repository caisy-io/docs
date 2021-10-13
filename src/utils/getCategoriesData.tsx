import { IDropdownCategory } from '../components/header-search/HeaderDropdown';
import parseBodyText from './parseBodyText';

const getCategoriesData = (navigationTop) : Array<IDropdownCategory>  => { 
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

    return getCategoriesDataRecursive(navigationTop);
  }


export default getCategoriesData;