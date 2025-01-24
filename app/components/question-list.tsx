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
    const [autoselectModalOpen, setAutoselectModalOpen] = useState(false);
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
            // onSelectQuestions(newSelection);
            return newSelection;
        });
    };



    return (
        <div className="min-h-screen bg-gray-50">
            {autoselectModalOpen && (
                <AutoSelectModal
                    onClose={() => setAutoselectModalOpen(false)}
                    onSelectQuestions={(questions) => {
                        setSelectedQuestions(questions);
                        onSelectQuestions(questions);
                    }}
                />
            )}
            <div className="max-w-3xl mx-auto p-6 pt-12">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-800">Question List</h2>
                        <p className="text-sm text-gray-500 mt-2">
                            Select questions to add to your quiz. Scroll down to load more.
                        </p>
                        <div className="mt-4 flex space-x-4">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedQuestions(questions);
                                        } else {
                                            setSelectedQuestions([]);
                                        }
                                    }}
                                    checked={selectedQuestions.length === questions.length}
                                />
                                <span className="text-gray-700">Select All</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    onChange={() => setSelectedQuestions([])}
                                    checked={selectedQuestions.length === 0}
                                />
                                <span className="text-gray-700">Deselect All</span>
                            </label>
                            <button
                                onClick={() => {
                                    // open a modal to select the number of questions
                                    // then select random questions
                                    setAutoselectModalOpen(true);
                                }}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg transition-all duration-200 hover:bg-green-700"
                            >
                                Auto Select for Exam
                            </button>
                        </div>
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
                                    {question.type === 'multiple-choice' && (
                                        <div className="mt-2 flex flex-wrap gap-2 max-w-full">
                                            {question.choices?.map((choice, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                                                >
                                                    {choice.text}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    <div className="mt-2 flex flex-wrap gap-2 max-w-full">
                                        {question.tags.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-1 bg-gray-100 text-blue-600 rounded text-xs"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                        {question.tags.length > 3 && (
                                            <span className="px-2 py-1 bg-gray-100 text-blue-600 rounded text-xs">
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

function AutoSelectModal({ onClose, onSelectQuestions }: { onClose: () => void; onSelectQuestions: (questions: Question[]) => void }) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div ref={modalRef} className="bg-white rounded-lg p-6 max-w-xl w-full">
                <h2 className="text-2xl font-bold text-gray-800">Auto Select Questions</h2>
                <p className="text-sm text-gray-500 mt-2">
                    Enter the number of questions you want to select randomly.
                </p>
                <div className="mt-4 flex items-center space-x-4">
                    <input
                        type="number"
                        className="w-20 px-4 py-2 border border-gray-200 rounded-lg"
                    />
                    <button
                        onClick={() => {
                            // select random questions
                            // then call onSelectQuestions
                            onClose();
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg transition-all duration-200 hover:bg-green-700"
                    >
                        Select Questions
                    </button>
                </div>
            </div>
        </div>
    );
}