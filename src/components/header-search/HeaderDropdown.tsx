import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { createSnippets } from 'src/utils/snippets';
import { SDropdown } from './styles/SDropdown';
import { SDropdownOption } from './styles/SDropdownOption';
import { SDropdownOptionHeader } from './styles/SDropdownOptionHeader';
import { SDropdownOptionItem } from './styles/SDropdownOptionItem';

interface IDropdownProps {
  active: boolean;
  categories: IDropdownCategory[];
  onSelect?: (key: IDropdownCategory) => void;
  onClose?: () => void;
  currentOptionIndex?: number;
  setCurrentOptionIndex?: (index: number) => void;
}
export interface IDropdownCategory {
  title: string;
  headline: string;
  path: string;
  rawBody: object;
  bodyText: string;
  highlighted?: any;
}

export const HeaderDropdown = ({ categories, active, onSelect, onClose, currentOptionIndex = -1, setCurrentOptionIndex }: IDropdownProps) => {
    const router = useRouter();

    useEffect(() => {
      const handler = (e) => {
        if (!active) {
          return;
        }

        let currIndex = currentOptionIndex;

        if(e.key === 'Escape') {
          onClose?.();
          return;
        }

        if (e.key === 'Enter') {
          if (currIndex < 0) {
            currIndex = 0;
          }
          onSelect?.(categories[currIndex]);
          router.push(categories[currIndex].path);
          return;
        }

        if (currIndex > categories.length - 1) {
          currIndex = categories.length - 1;
        }

        if (e.key === 'ArrowUp') {
          if (currIndex <= 0) {
            currIndex = categories.length - 1;
          } else {
            currIndex--;
          }
        }

        if (e.key === 'ArrowDown') {
          if (currIndex >= categories.length - 1) {
            currIndex = 0;
          } else {
            currIndex++;
          }
        }

        setCurrentOptionIndex?.(currIndex);
      };

      if (active) {
        document.addEventListener('keydown', handler);
      }

      return () => document.removeEventListener('keydown', handler);
    });

    const renderHighlightedText = (text) => {
      return text.map((part, index) => {
        return (
          part.highlighted ? 
            <span key={index} className='highlighted'>{part.text}</span>
          : 
            <span key={index}>{part.text}</span>
        );
      });
    }

    const renderTitle = (title) => {
      const isHighlighted = title instanceof Array;

      if(isHighlighted) {
        return renderHighlightedText(createSnippets(title));
      } else {
        return <div>
          {title.substr(0, title.lastIndexOf(' / '))} / 
          <span className='title__headline'> {title.substr(title.lastIndexOf(' / ') + 2, title.length)}</span>
        </div>;
      }
    }

    const renderBodyText = (bodyText) => {
      const isHighlighted = bodyText instanceof Array;

      if(isHighlighted) {
        return renderHighlightedText(createSnippets(bodyText));
      } else {
        return <div>{bodyText}</div>;
      }
    }

    const reference = useRef(null);

    return (
      <div ref={reference}>
        {active && (
            <SDropdown active={active} className='dropdown'>
              {categories.map((category, index) => {
                return (
                  <Link key={'C' + index} href={category.path}>
                    <SDropdownOptionItem className={currentOptionIndex == index ? 'selected' : ''}>
                      <SDropdownOptionHeader className='title'>
                        {renderTitle(category.title)}
                      </SDropdownOptionHeader>
                      <SDropdownOption
                        className='dropdown-option'
                        onClick={() => onSelect?.(category)}
                      >
                        {renderBodyText(category.bodyText)}
                      </SDropdownOption>
                    </SDropdownOptionItem>
                  </Link>
                );
              })}
            </SDropdown>
        )}
      </div>
    );
  };
