import { useState } from 'react';

interface UseKeyboardNavigationProps {
  items: string[];
  onSelect: (item: string) => void;
  onDelete?: () => void;
  onEscape?: () => void;
  onSearch?: () => void;
}

export default function useKeyboardNavigation({
  items,
  onSelect,
  onDelete,
  onEscape,
  onSearch
}: UseKeyboardNavigationProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < items.length - 1 ? prev + 1 : prev
        );
        break;

      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev > 0 ? prev - 1 : -1
        );
        break;

      case 'Enter':
        e.preventDefault();
        console.log('selectedIndex: ', selectedIndex);
        if (selectedIndex >= 0 && items[selectedIndex]) {
          onSelect(items[selectedIndex]);
        } else {
          onSearch?.();
        }
        break;

      case 'Backspace':
        onDelete?.();
        break;

      case 'Escape':
        onEscape?.();
        break;
    }
  };

  return {
    selectedIndex,
    setSelectedIndex,
    handleKeyDown
  };
}