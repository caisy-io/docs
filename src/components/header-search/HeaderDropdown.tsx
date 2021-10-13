import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { createSnippets } from "src/utils/snippets";
import { SDropdownOuterContainer } from "./styles/SDropdownOuterContainer";
import { SDropdown } from "./styles/SDropdown";
import { SDropdownOption } from "./styles/SDropdownOption";
import { SDropdownOptionHeader } from "./styles/SDropdownOptionHeader";
import { SDropdownOptionItem } from "./styles/SDropdownOptionItem";

interface IDropdownProps {
  active: boolean;
  categories: IDropdownCategory[];
  onSelect?: (key: IDropdownCategory) => void;
  onClose?: () => void;
  currentOptionIndex?: number;
  searchInputValue?: string;
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

const MAX_DOPDOWN_OPTIONS = 5;

export const lastLinesOfText = (text: string, lineNumber: number) => {
    let lines = text.split(/(?:\r\n|\r|\n)/g);
    if (lines.length > lineNumber) {
      lines = lines.splice(lineNumber, lines.length - 1 );
    }
    return lines.join("")
};

export const firstLinesOfText = (text: string, lineNumber: number) => {
  let lines = text.split(/(?:\r\n|\r|\n)/g);
  if (lines.length > lineNumber) {
      lines = lines.splice(0, lineNumber);
    }
    return lines.join("")
};

export const HeaderDropdown = ({
  categories,
  active,
  onSelect,
  onClose,
  searchInputValue,
  currentOptionIndex = -1,
  setCurrentOptionIndex,
}: IDropdownProps) => {
  const router = useRouter();
  const reference = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (!active) {
        return;
      }

      let currIndex = currentOptionIndex;

      if (e.key === "Escape") {
        onClose?.();
        return;
      }

      if (e.key === "Enter") {
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

      if (e.key === "ArrowUp") {
        if (currIndex <= 0) {
          currIndex = categories.length - 1;
        } else {
          currIndex--;
        }
      }

      if (e.key === "ArrowDown") {
        if (currIndex >= categories.length - 1) {
          currIndex = 0;
        } else {
          currIndex++;
        }
      }

      setCurrentOptionIndex?.(currIndex);
    };

    if (active) {
      document.addEventListener("keydown", handler);
    }

    return () => document.removeEventListener("keydown", handler);
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

  const joinElementsText = (text, start, end) => {
    const xstart = text[start] ? start : 0
    const xend = (text[end] &&  end < text.length - 1 ) ? end : text.length - 1 
    let count = 0;
    let result: string = ""
    while((count + xstart) <= xend) {
      result += text[xstart + count].text;
      count++;
    }
    return result;
  }

  const handleStripedPart = (text,partIndex ) => {
    const part = text[partIndex];

    console.log(`handleStripedPart partIndex ${partIndex}`, text, text.length);

    console.log(` lastLinesOfText(joinElementsText(text, partIndex - 30, partIndex - 1), 6)`, lastLinesOfText(joinElementsText(text, partIndex - 30, partIndex - 1), 2));
    console.log(` part.text`, part.text);
console.log(` firstLinesOfText(joinElementsText(text, partIndex + 1, partIndex + 30), 6)`, firstLinesOfText(joinElementsText(text, partIndex + 1, partIndex + 30), 2));
    return (
      <>
        {text[partIndex - 1] ? <span key={partIndex - 1}>{lastLinesOfText(joinElementsText(text, partIndex - 30, partIndex - 1), 6) }</span> : null}
        <span key={partIndex} className="highlighted">
          {part.text}
        </span>
        {text[partIndex + 1] ? <span key={partIndex + 1}>{firstLinesOfText(joinElementsText(text, partIndex + 1, partIndex + 30), 6)}</span> : null}
      </>
    );
  }

  const renderHighlightedTextStripped = (text) => {
    // first loop for direct matches with search
    let partIndexDirect = 0;
    for (const part of text) {
      if (part.highlighted && part.text.toLowerCase().includes(searchInputValue.toLowerCase())) {
       return handleStripedPart(text, partIndexDirect)
      }
      partIndexDirect++;
    }

    // another loop if we did not find direct matches 
    let partIndexIndirect = 0;
    for (const part of text) {
      if (part.highlighted ) {
        return handleStripedPart(text, partIndexIndirect)
      }
      partIndexIndirect++;
    }
  };

  const renderTitle = (title) => {
    const isHighlighted = title instanceof Array;

    if (isHighlighted) {
      return renderHighlightedText(createSnippets(title));
    } else {
      return (
        <div>
          {title.substr(0, title.lastIndexOf(" / "))} /
          <span className="title__headline"> {title.substr(title.lastIndexOf(" / ") + 2, title.length)}</span>
        </div>
      );
    }
  };

  const renderBodyText = (bodyText) => {
    const isHighlighted = bodyText instanceof Array;

    if (isHighlighted) {
      return renderHighlightedTextStripped(createSnippets(bodyText));
    } else {
      return <>{firstLinesOfText(bodyText, 3)}</>;
    }
  };

  return (
    <div ref={reference}>
      <SDropdownOuterContainer active={active}>
        <SDropdown active={active} className="dropdown">
          {categories.map(
            (category, index) =>
              index < MAX_DOPDOWN_OPTIONS && (
                <Link key={"C" + index} href={category.path}>
                  <SDropdownOptionItem className={currentOptionIndex == index ? "selected" : ""}>
                    <SDropdownOptionHeader className="title">{renderTitle(category.title)}</SDropdownOptionHeader>
                    <SDropdownOption className="dropdown-option" onClick={() => onSelect?.(category)}>
                      {renderBodyText(category.bodyText)}
                    </SDropdownOption>
                  </SDropdownOptionItem>
                </Link>
              ),
          )}
        </SDropdown>
      </SDropdownOuterContainer>
    </div>
  );
};
