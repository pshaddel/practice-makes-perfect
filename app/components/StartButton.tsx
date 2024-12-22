import React from 'react';
import { ArrowRight } from 'lucide-react';

interface StartButtonProps {
  onClick: () => void;
}

export default function StartButton({ onClick }: StartButtonProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200 group"
    >
      Start Practice
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
    </button>
  );
}