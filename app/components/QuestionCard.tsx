import React from 'react';
import { Clock, Tag } from 'lucide-react';
import type { Question } from '../types/quiz';

interface QuestionCardProps {
  question: Question;
  onClick: () => void;
}

export default function QuestionCard({ question, onClick }: QuestionCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 group"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
          {question.text}
        </h3>
        {question.duration && (
          <div className="flex items-center gap-1 text-gray-500 shrink-0">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{question.duration}s</span>
          </div>
        )}
      </div>
      
      <div className="mt-4 flex items-center gap-2">
        <Tag className="w-4 h-4 text-gray-400" />
        <div className="flex flex-wrap gap-2">
          {question.tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-50 text-gray-600 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}