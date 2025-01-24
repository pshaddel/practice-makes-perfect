'use client';
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowLeft, AlertCircle, Timer as TimerIcon } from 'lucide-react';
import Timer from './Timer';
import { useRouter } from 'next/navigation';
import QuestionList from './question-list';

export interface Choice {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'text';
  choices?: Choice[];
  isSingleAnswer?: boolean;
  duration?: number;
  tags: string[];
  answers: string[];
  explanation?: string;
}

export interface QuizConfig {
  questions: Question[];
  totalDuration?: number;
  practice?: boolean;
}

export interface Answer {
  questionId: string;
  answer: string;
}

interface QuizComponentProps {
  config: QuizConfig;
  // onComplete: (answers: Answer[]) => void;
}

export default function QuizComponent({ config }: QuizComponentProps) {
  const onComplete = (answers: Answer[]) => {
    console.log('Completed', answers);
    // sendtoServer(answers);
  };
  const { questions, totalDuration } = config;
  if (!questions || questions.length === 0) {
    return <DefaultView />;
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isQuestionTimeUp, setIsQuestionTimeUp] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isQuizeFinished, setIsQuizeFinished] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);

  const handleSelectQuestions = (questions: Question[]) => {
    setSelectedQuestions(questions);
    setIsQuizStarted(true);
  };

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

  if (!isQuizStarted) {
    return <QuestionList questions={config.questions} onSelectQuestions={handleSelectQuestions} />;
  }

  const newConfig = { questions: selectedQuestions, totalDuration };
  return (
    <Quiz config={newConfig} />
  )
}

export function Quiz({ config }: QuizComponentProps) {
  const { questions, totalDuration, practice } = config;
  if (!questions || questions.length === 0) {
    return <DefaultView />;
  }
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isQuestionTimeUp, setIsQuestionTimeUp] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isQuizeFinished, setIsQuizeFinished] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const onComplete = (answers: Answer[]) => {
    setIsQuizeFinished(true);
  };

  useEffect(() => {
    setIsQuestionTimeUp(false);
  }, [currentIndex]);

  useEffect(() => {
    if (currentQuestion.type === 'text') {
      inputRef.current?.focus();
    }
  }, [currentIndex, currentQuestion.type]);

  const handleNext = () => {
    if (practice && showAnswer) {
      setShowAnswer(false);
    }
    // console.log('currentAnswer', currentAnswer, practice, showAnswer);
    // if (practice && !showAnswer) {
    //   console.log('show answer');
    //   setShowAnswer(true);
    //   return;
    // }
    // // setShowAnswer(false);
    if (practice) {
      setShowAnswer(false);
    }
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
        setDarkMode(prev => !prev);
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
          console.log('currentAnswer', currentAnswer);
          if (practice && !showAnswer) {
            setShowAnswer(true);
            return;
          }
          if (currentAnswer.trim()) handleNext();
          break;
        case 'ArrowLeft':
          if (practice)
            setShowAnswer(false);
          handlePrevious();
          break;
        case 'ArrowRight':
          if (currentAnswer.trim()) {
            handleNext();
            if (practice)
              setShowAnswer(false);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, currentAnswer, currentQuestion, isQuestionTimeUp, isAnimating]);

  if (isQuizeFinished) {
    return <QuizResult answers={answers} questions={questions} />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-3xl mx-auto p-6 pt-12">
        <div className={`rounded-2xl shadow-lg overflow-hidden transition-colors duration-500 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          {/* Header */}
          <div className="p-6 border-b border-opacity-10 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-2xl font-bold transition-colors duration-500 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Question {currentIndex + 1}
              </h2>
              <div className="flex items-center gap-4">
                {currentQuestion.duration && !practice && (
                  <Timer
                    duration={currentQuestion.duration}
                    onTimeUp={handleQuestionTimeUp}
                    className={`${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}
                  />
                )}
                {totalDuration && !practice && (
                  <Timer
                    duration={totalDuration}
                    onTimeUp={handleTotalTimeUp}
                    className={`${isDarkMode ? 'text-red-400' : 'text-red-600'}`}
                  />
                )}
                <span className={`text-sm transition-colors duration-500 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
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
                isDarkMode ? 'text-gray-100' : 'text-gray-700'
              }`}>
                {currentQuestion.text}
              </h3>

              {isQuestionTimeUp && !practice ? (
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
                        ? isDarkMode
                            ? 'border-blue-400 bg-blue-900/50 text-blue-200'
                            : 'border-blue-500 bg-blue-50 text-blue-700'
                        : isDarkMode
                            ? 'border-gray-700 hover:border-blue-800 hover:bg-gray-800/50 text-gray-300'
                            : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span className={`inline-block w-6 ${
                        isDarkMode ? 'text-gray-500' : 'text-gray-400'
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
                    isDarkMode
                      ? 'bg-gray-800 border-2 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500'
                      : 'bg-white border-2 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-blue-500'
                  }`}
                />
              )}
            </div>
          </div>

          {/* Footer */}
          <div>
            {showAnswer && (
              <div className={`p-6 bg-gray-100 rounded-b-xl text-gray-700`}>
                <strong>Answer:</strong>
                <p>{currentQuestion.answers}</p>
                {
                  currentQuestion.explanation ? (<p><strong>Explanation:</strong> {currentQuestion.explanation}</p>) : null
                }
              </div>
            )}
          </div>
          <div className={`p-6 border-t border-opacity-10 flex justify-between items-center ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0 || isAnimating}
              className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                currentIndex === 0 || isAnimating
                ? isDarkMode ? 'text-gray-600' : 'text-gray-400'
                : isDarkMode
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-100'
              } cursor-${currentIndex === 0 || isAnimating ? 'not-allowed' : 'pointer'}`}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Previous
            </button>

            {/* <div className={`text-sm ${
              isFocusMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Press Ctrl+F to toggle focus mode
            </div> */}

            <button
              onClick={(practice && showAnswer === false) ? (() => setShowAnswer(true)) : handleNext}
              disabled={!currentAnswer.trim() || isAnimating}
              className={`flex items-center px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                currentAnswer.trim() && !isAnimating
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                : isDarkMode
                    ? 'bg-gray-800 text-gray-500'
                    : 'bg-gray-200 text-gray-400'
              } cursor-${currentAnswer.trim() && !isAnimating ? 'pointer' : 'not-allowed'}`}
            >
              {isLastQuestion ? 'Complete' : practice && showAnswer === false ? 'Show Answer' : 'Next'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DefaultView() {
  const router = useRouter();
  const goBackToHome = () => router.push('/');
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Übung macht den Meister
        </h1>

        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          We couldn't find any questions to practice. Please go back and try again.
        </p>

        <div className="mb-8">
          <button
            onClick={goBackToHome}
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200 group"
          >
            Go Back Home
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </div>
  );
}

function QuizResult({ answers, questions }: { answers: Answer[]; questions: Question[] }) {
  function isAnswerCorrect(question: Question, userAnswer: string) {
    if (question.type === 'multiple-choice') {
      return question.choices?.find((choice) => choice.id === userAnswer)?.text === 'True';
    } else {
      return question.answers.includes(userAnswer);
    }
  }
  const questionWithAnswers = questions.map((question) => {
    const answer = answers.find((a) => a.questionId === question.id);
    return {
      ...question,
      userAnswer: answer?.answer,
      isCorrect: answer?.answer ? isAnswerCorrect(question, answer?.answer) : false,
    };
  });
  const correctAnswers = answers.filter((answer) => {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) return false;
    return isAnswerCorrect(question, answer.answer);
  });

  const totalQuestions = questions.length;
  const totalCorrect = correctAnswers.length;
  const totalWrong = totalQuestions - totalCorrect;
  const totalPercentage = (totalCorrect / totalQuestions) * 100;

  return (
    <div>
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-2xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Quiz Results
          </h1>
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xl text-gray-800">Total Questions</div>
              <div className="text-xl font-bold text-gray-800">{totalQuestions}</div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="text-xl text-gray-800">Correct Answers</div>
              <div className="text-xl font-bold text-green-600">{totalCorrect}</div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="text-xl text-gray-800">Wrong Answers</div>
              <div className="text-xl font-bold text-red-600">{totalWrong}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-xl text-gray-800">Percentage</div>
              <div className="text-xl font-bold text-blue-600">{totalPercentage}%</div>
            </div>
          </div>

          </div>
          <div className="w-full max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Review Your Answers</h2>
            {questionWithAnswers.map((question, index) => {
              const userAnswer = question.userAnswer;
              const isCorrect = question.isCorrect;
              return (
                <div key={question.id} className={`p-4 mb-4 rounded-lg shadow-lg ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                  <h3 className="text-xl font-semibold mb-2">{index + 1}. {question.text}</h3>
                  {question.choices && (
                    <ul className="list-disc list-inside">
                      {question.choices.map(choice => (
                        <li key={choice.id} className={`${choice.text === userAnswer ? 'font-bold' : ''}`}>
                          {choice.text}
                        </li>
                      ))}
                    </ul>
                  )}
                  {question.explanation && (
                    <p className="mt-2 text-gray-700"><strong>Explanation:</strong> {question.explanation}</p>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}