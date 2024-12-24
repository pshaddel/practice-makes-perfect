'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { availableTags } from '../data/sampleQuestions';
import useKeyboardNavigation from '../hooks/useKeyboardNavigation';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  autoFocus?: boolean;
}

export default function SearchBar({ autoFocus = false }: SearchBarProps) {
  const [input, setInput] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const {
    selectedIndex: selectedSuggestionIndex,
    setSelectedIndex: setSelectedSuggestionIndex,
    handleKeyDown
  } = useKeyboardNavigation({
    items: suggestions,
    onSelect: (tag) => addTag(tag),
    onDelete: () => input === '' && selectedTags.length > 0 && removeTag(selectedTags[selectedTags.length - 1]),
    onEscape: () => {
      setIsFocused(false);
      inputRef.current?.blur();
    }
  });
  useEffect(() => {
    // Update the URL query parameters whenever the tags state changes
    const query = new URLSearchParams({ tags: selectedTags.join(',') }).toString();
    router.push(`?${query}`, {});
  }, [selectedTags, router]);


  // Auto-focus effect
  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    if (input.trim()) {
      const filtered = availableTags.filter(
        tag =>
          tag.toLowerCase().includes(input.toLowerCase()) &&
          !selectedTags.includes(tag)
      );
      setSuggestions(filtered);
      setSelectedSuggestionIndex(-1);
    } else {
      setSuggestions([]);
      setSelectedSuggestionIndex(-1);
    }
  }, [input, selectedTags, setSelectedSuggestionIndex]);

  // Scroll selected suggestion into view
  useEffect(() => {
    if (selectedSuggestionIndex >= 0 && suggestionsRef.current) {
      const suggestionElements = suggestionsRef.current.children;
      if (suggestionElements[selectedSuggestionIndex]) {
        suggestionElements[selectedSuggestionIndex].scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }
  }, [selectedSuggestionIndex]);

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      const newTags = [...selectedTags, tag];
      setSelectedTags(newTags);
    }
    setInput('');
    setSelectedSuggestionIndex(-1);
    inputRef.current?.focus();
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = selectedTags.filter(tag => tag !== tagToRemove);
    setSelectedTags(newTags);
    // onTagsChange(newTags);
    inputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        className={`relative bg-white rounded-2xl shadow-lg transition-all duration-300 ${isFocused ? 'shadow-blue-100 ring-2 ring-blue-100' : ''
          }`}
      >
        <div className="flex items-center px-6 py-4">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <div className="flex-1 flex flex-wrap gap-2 items-center">
            {selectedTags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium group"
              >
                {tag}
                <button
                  type='button'
                  onClick={() => removeTag(tag)}
                  className="hover:bg-blue-100 rounded-full p-0.5 transition-colors duration-200 opacity-60 group-hover:opacity-100"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              placeholder={selectedTags.length === 0 ? "Suche nach Tags" : ""}
              className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-400 min-w-[200px]"
            />
          </div>
        </div>

        {suggestions.length > 0 && isFocused && (
          <div
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-10 max-h-64 overflow-auto"
          >
            {suggestions.map((tag, index) => (
              <button
                type="button"
                key={tag}
                onClick={() => addTag(tag)}
                className={`w-full px-4 py-2 text-left transition-colors duration-200 ${index === selectedSuggestionIndex
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {(
        <div className={`mt-4 text-center ${isFocused ? 'block' : 'invisible'}`}>
          <p className="text-sm text-gray-500">
            Use <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">↑</kbd> <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">↓</kbd> to navigate,
            <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs ml-1">Enter</kbd> to select,
            <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs ml-1">Backspace</kbd> to remove
          </p>
        </div>
      )}
    </div>
  );
}