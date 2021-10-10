import { IDropdownCategory } from '@caisy/league/dist/components/dropdown/types';
import Link from 'next/link';
import React, { useState, useEffect, Fragment } from 'react';
import { SDropdown } from './styles/SDropdown';
import { SDropdownOption } from './styles/SDropdownOption';
import { SDropdownOptionHeader } from './styles/SDropdownOptionHeader';
import { SDropdownOptionItem } from './styles/SDropdownOptionItem';

interface IDropdownProps {
  active: boolean;
  categories: IDropdownCategory[];
  onSelect?: (key: IDropdownCategory) => void;
}

export const HeaderDropdown = ({ categories, active, onSelect }: IDropdownProps) => {
    const [currentOptionIndex, setCurrentOptionIndex] = useState<number>(-1);
    // const flatCategories = categories.flatMap((c) => c.items.filter((i) => i.visible));

    // useEffect(() => {
    //   const handler = (e) => {
    //     if (!active) {
    //       return;
    //     }

    //     let currIndex = currentOptionIndex;

    //     if (e.key === 'Enter') {
    //       if (currIndex < 0) {
    //         currIndex = 0;
    //       }
    //       onSelect(flatCategories[currIndex].key);
    //       return;
    //     }

    //     if (currIndex > flatCategories.length - 1) {
    //       currIndex = flatCategories.length - 1;
    //     }

    //     if (e.key === 'ArrowUp') {
    //       if (currIndex <= 0) {
    //         currIndex = flatCategories.length - 1;
    //       } else {
    //         currIndex--;
    //       }
    //     }

    //     if (e.key === 'ArrowDown') {
    //       if (currIndex >= flatCategories.length - 1) {
    //         currIndex = 0;
    //       } else {
    //         currIndex++;
    //       }
    //     }

    //     setCurrentOptionIndex(currIndex);
    //   };

    //   if (active) {
    //     document.addEventListener('keydown', handler);
    //   }

    //   return () => document.removeEventListener('keydown', handler);
    // });

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
        return renderHighlightedText(title);
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
        return renderHighlightedText(bodyText);
      } else {
        return <div>{bodyText}</div>;
      }
    }

    const reference = React.useRef(null);

    return (
      <div ref={reference}>
        {active && (
            <SDropdown active={active} className='dropdown'>
              {categories.map((category, index) => {
                console.log(category.path);

                return (
                  <Link key={'C' + index} href={category.path}>
                    <SDropdownOptionItem>
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
