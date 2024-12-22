import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import QuizComponent from '../QuizComponent';
import type { QuizConfig } from '../../types/quiz';

const mockQuizConfig: QuizConfig = {
  totalDuration: 120,
  questions: [
    {
      id: '1',
      text: 'What is your name?',
      type: 'text',
      duration: 30
    },
    {
      id: '2',
      text: 'Choose a color',
      type: 'multiple-choice',
      duration: 30,
      choices: [
        { id: 'red', text: 'Red' },
        { id: 'blue', text: 'Blue' }
      ]
    }
  ]
};

describe('QuizComponent', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('renders the first question', () => {
    render(<QuizComponent config={mockQuizConfig} onComplete={() => {}} />);
    
    expect(screen.getByText('Question 1')).toBeInTheDocument();
    expect(screen.getByText('What is your name?')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type your answer here...')).toBeInTheDocument();
  });

  it('handles text input questions', async () => {
    const user = userEvent.setup();
    render(<QuizComponent config={mockQuizConfig} onComplete={() => {}} />);
    
    const input = screen.getByPlaceholderText('Type your answer here...');
    await user.type(input, 'John Doe');
    expect(input).toHaveValue('John Doe');
  });

  it('navigates to next question after submitting answer', async () => {
    const user = userEvent.setup();
    render(<QuizComponent config={mockQuizConfig} onComplete={() => {}} />);
    
    const input = screen.getByPlaceholderText('Type your answer here...');
    await user.type(input, 'John Doe{enter}');
    
    expect(screen.getByText('Question 2')).toBeInTheDocument();
    expect(screen.getByText('Choose a color')).toBeInTheDocument();
  });

  it('handles multiple choice questions', async () => {
    const user = userEvent.setup();
    render(<QuizComponent config={mockQuizConfig} onComplete={() => {}} />);
    
    // Navigate to second question
    const input = screen.getByPlaceholderText('Type your answer here...');
    await user.type(input, 'John Doe{enter}');
    
    // Check multiple choice options
    expect(screen.getByText('Red')).toBeInTheDocument();
    expect(screen.getByText('Blue')).toBeInTheDocument();
    
    // Select an option
    await user.click(screen.getByText('Red'));
    expect(screen.getByText('Red').closest('button')).toHaveClass('border-blue-500');
  });

  it('handles keyboard navigation for multiple choice', async () => {
    const user = userEvent.setup();
    render(<QuizComponent config={mockQuizConfig} onComplete={() => {}} />);
    
    // Navigate to second question
    await user.type(screen.getByPlaceholderText('Type your answer here...'), 'John Doe{enter}');
    
    // Use number key to select option
    await user.keyboard('1');
    expect(screen.getByText('Red').closest('button')).toHaveClass('border-blue-500');
  });

  it('calls onComplete with all answers when finished', async () => {
    const user = userEvent.setup();
    const handleComplete = vi.fn();
    render(<QuizComponent config={mockQuizConfig} onComplete={handleComplete} />);
    
    // Answer first question
    await user.type(screen.getByPlaceholderText('Type your answer here...'), 'John Doe{enter}');
    
    // Answer second question
    await user.click(screen.getByText('Red'));
    await user.click(screen.getByText('Complete'));
    
    expect(handleComplete).toHaveBeenCalledWith([
      { questionId: '1', answer: 'John Doe' },
      { questionId: '2', answer: 'red' }
    ]);
  });

  it('handles question timer expiration', () => {
    const handleComplete = vi.fn();
    render(<QuizComponent config={mockQuizConfig} onComplete={handleComplete} />);
    
    // Advance timer to trigger question timeout
    act(() => {
      vi.advanceTimersByTime(30000);
    });
    
    expect(screen.getByText('Question 2')).toBeInTheDocument();
  });

  it('handles total timer expiration', () => {
    const handleComplete = vi.fn();
    render(<QuizComponent config={mockQuizConfig} onComplete={handleComplete} />);
    
    // Advance timer to trigger total timeout
    act(() => {
      vi.advanceTimersByTime(120000);
    });
    
    expect(handleComplete).toHaveBeenCalled();
  });
});