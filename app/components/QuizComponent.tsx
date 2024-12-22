import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowLeft, AlertCircle, Timer as TimerIcon } from 'lucide-react';
import type { Question, Answer, QuizConfig } from '../types/quiz';
import Timer from './Timer';

interface QuizComponentProps {
  config: QuizConfig;
  onComplete: (answers: Answer[]) => void;
}

export default function QuizComponent({ config, onComplete }: QuizComponentProps) {
  const { questions, totalDuration } = config;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isQuestionTimeUp, setIsQuestionTimeUp] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [isAnimating, setIsAnimating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  useEffect(() => {
    setIsQuestionTimeUp(false);
  }, [currentIndex]);

  useEffect(() => {
    if (currentQuestion.type === 'text') {
      inputRef.current?.focus();
    }
  }, [currentIndex, currentQuestion.type]);

  const handleNext = () => {
    if (currentAnswer.trim() === '' || isAnimating) return;

    setIsAnimating(true);
    setSlideDirection('left');

    const newAnswers = [...answers];
    const existingAnswerIndex = answers.findIndex(a => a.questionId === currentQuestion.id);
    const newAnswer = { questionId: currentQuestion.id, answer: currentAnswer };

    if (existingAnswerIndex >= 0) {
      newAnswers[existingAnswerIndex] = newAnswer;
    } else {
      newAnswers.push(newAnswer);
    }

    setAnswers(newAnswers);
    setCurrentAnswer('');

    if (isLastQuestion) {
      onComplete(newAnswers);
    } else {
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        const nextQuestion = questions[currentIndex + 1];
        const previousAnswer = newAnswers.find(a => a.questionId === nextQuestion.id);
        if (previousAnswer) {
          setCurrentAnswer(previousAnswer.answer);
        }
        setIsAnimating(false);
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0 && !isAnimating) {
      setIsAnimating(true);
      setSlideDirection('right');
      
      setTimeout(() => {
        setCurrentIndex(prev => prev - 1);
        const previousAnswer = answers.find(a => a.questionId === questions[currentIndex - 1].id);
        setCurrentAnswer(previousAnswer?.answer || '');
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleQuestionTimeUp = () => {
    setIsQuestionTimeUp(true);
    handleNext();
  };

  const handleTotalTimeUp = () => {
    onComplete(answers);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isQuestionTimeUp || isAnimating) return;

      if (e.key === 'f' && e.ctrlKey) {
        e.preventDefault();
        setIsFocusMode(prev => !prev);
        return;
      }

      if (currentQuestion.type === 'multiple-choice' && currentQuestion.choices) {
        const num = parseInt(e.key);
        if (num >= 1 && num <= currentQuestion.choices.length) {
          const choice = currentQuestion.choices[num - 1];
          setCurrentAnswer(choice.id);
        }
      }

      switch (e.key) {
        case 'Enter':
          if (currentAnswer.trim()) handleNext();
          break;
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          if (currentAnswer.trim()) handleNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, currentAnswer, currentQuestion, isQuestionTimeUp, isAnimating]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isFocusMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-3xl mx-auto p-6 pt-12">
        <div className={`rounded-2xl shadow-lg overflow-hidden transition-colors duration-500 ${
          isFocusMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          {/* Header */}
          <div className="p-6 border-b border-opacity-10 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-2xl font-bold transition-colors duration-500 ${
                isFocusMode ? 'text-white' : 'text-gray-800'
              }`}>
                Question {currentIndex + 1}
              </h2>
              <div className="flex items-center gap-4">
                {currentQuestion.duration && (
                  <Timer
                    duration={currentQuestion.duration}
                    onTimeUp={handleQuestionTimeUp}
                    className={`${isFocusMode ? 'text-orange-400' : 'text-orange-600'}`}
                  />
                )}
                {totalDuration && (
                  <Timer
                    duration={totalDuration}
                    onTimeUp={handleTotalTimeUp}
                    className={`${isFocusMode ? 'text-red-400' : 'text-red-600'}`}
                  />
                )}
                <span className={`text-sm transition-colors duration-500 ${
                  isFocusMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {currentIndex + 1} of {questions.length}
                </span>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Content */}
          <div className="p-8 relative overflow-hidden">
            <div className={`transform transition-all duration-300 ease-in-out ${
              isAnimating 
                ? slideDirection === 'left'
                  ? '-translate-x-full opacity-0'
                  : 'translate-x-full opacity-0'
                : 'translate-x-0 opacity-100'
            }`}>
              <h3 className={`text-xl mb-6 transition-colors duration-500 ${
                isFocusMode ? 'text-gray-100' : 'text-gray-700'
              }`}>
                {currentQuestion.text}
              </h3>
              
              {isQuestionTimeUp ? (
                <div className="flex items-center gap-2 text-orange-500 mb-4">
                  <AlertCircle className="w-5 h-5" />
                  <p>Time's up! Moving to next question...</p>
                </div>
              ) : currentQuestion.type === 'multiple-choice' ? (
                <div className="space-y-3">
                  {currentQuestion.choices?.map((choice, index) => (
                    <button
                      key={choice.id}
                      onClick={() => setCurrentAnswer(choice.id)}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] ${
                        currentAnswer === choice.id
                          ? isFocusMode 
                            ? 'border-blue-400 bg-blue-900/50 text-blue-200'
                            : 'border-blue-500 bg-blue-50 text-blue-700'
                          : isFocusMode
                            ? 'border-gray-700 hover:border-blue-800 hover:bg-gray-800/50 text-gray-300'
                            : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span className={`inline-block w-6 ${
                        isFocusMode ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        {index + 1}.
                      </span>
                      {choice.text}
                    </button>
                  ))}
                </div>
              ) : (
                <input
                  ref={inputRef}
                  type="text"
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className={`w-full p-4 rounded-lg transition-all duration-200 ${
                    isFocusMode
                      ? 'bg-gray-800 border-2 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500'
                      : 'bg-white border-2 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-blue-500'
                  }`}
                />
              )}
            </div>
          </div>

          {/* Footer */}
          <div className={`p-6 border-t border-opacity-10 flex justify-between items-center ${
            isFocusMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0 || isAnimating}
              className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                currentIndex === 0 || isAnimating
                  ? isFocusMode ? 'text-gray-600' : 'text-gray-400'
                  : isFocusMode
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-100'
              } cursor-${currentIndex === 0 || isAnimating ? 'not-allowed' : 'pointer'}`}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Previous
            </button>

            <div className={`text-sm ${
              isFocusMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Press Ctrl+F to toggle focus mode
            </div>

            <button
              onClick={handleNext}
              disabled={!currentAnswer.trim() || isAnimating}
              className={`flex items-center px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                currentAnswer.trim() && !isAnimating
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : isFocusMode
                    ? 'bg-gray-800 text-gray-500'
                    : 'bg-gray-200 text-gray-400'
              } cursor-${currentAnswer.trim() && !isAnimating ? 'pointer' : 'not-allowed'}`}
            >
              {isLastQuestion ? 'Complete' : 'Next'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}