'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { Question } from './QuizComponent'; // Assuming this type is exported from your existing file

interface QuestionListProps {
    questions: Question[];
    onSelectQuestions: (selectedQuestions: Question[]) => void;
}

export default function QuestionList({ questions, onSelectQuestions }: QuestionListProps) {
    const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
    const [visibleQuestions, setVisibleQuestions] = useState<Question[]>([]);
    const [page, setPage] = useState(1);
    const loader = useRef(null);

    const QUESTIONS_PER_PAGE = 10;

    useEffect(() => {
        setVisibleQuestions(questions.slice(0, QUESTIONS_PER_PAGE));
    }, [questions]);

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
        });
        if (loader.current) {
            observer.observe(loader.current);
        }
        return () => observer.disconnect();
    }, []);

    const handleObserver = (entities: IntersectionObserverEntry[]) => {
        const target = entities[0];
        if (target.isIntersecting) {
            setPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        const newVisibleQuestions = questions.slice(0, page * QUESTIONS_PER_PAGE);
        setVisibleQuestions(newVisibleQuestions);
    }, [page, questions]);

    const toggleQuestionSelection = (question: Question) => {
        setSelectedQuestions((prev) => {
            const isSelected = prev.some((q) => q.id === question.id);
            const newSelection = isSelected
                ? prev.filter((q) => q.id !== question.id)
                : [...prev, question];
            onSelectQuestions(newSelection);
            return newSelection;
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-3xl mx-auto p-6 pt-12">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-800">Question List</h2>
                        <p className="text-sm text-gray-500 mt-2">
                            Select questions to add to your quiz. Scroll down to load more.
                        </p>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {visibleQuestions.map((question) => (
                                <div
                                    key={question.id}
                                    className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${selectedQuestions.some((q) => q.id === question.id)
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
                                        }`}
                                    onClick={() => toggleQuestionSelection(question)}
                                >
                                    <div className="flex items-center justify-between">
                                        <p className="text-gray-700">{question.text}</p>
                                        {selectedQuestions.some((q) => q.id === question.id) ? (
                                            <Check className="w-5 h-5 text-blue-500" />
                                        ) : (
                                            <ChevronRight className="w-5 h-5 text-gray-400" />
                                        )}
                                    </div>
                                    <div className="mt-2 flex flex-wrap gap-2 max-w-full">
                                        {question.tags.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                        {question.tags.length > 3 && (
                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                                +{question.tags.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div ref={loader} className="h-10" />
                    </div>
                    <div className="p-6 border-t border-gray-200 flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                            {selectedQuestions.length} questions selected
                        </span>
                        <button
                            onClick={() => onSelectQuestions(selectedQuestions)}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg transition-all duration-200 hover:bg-blue-700"
                        >
                            Create Quiz
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

