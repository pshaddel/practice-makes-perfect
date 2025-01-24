'use server'
import { questions } from "../data/sampleQuestions"
interface Question {
    id: string;
    text: string;
    type: 'multiple-choice' | 'text';
    choices?: {
        id: string;
        text: string;
    }[];
    duration?: number;
    isSingleAnswer?: boolean;
    answers: string[];
    tags: string[];
}

export async function getQuestions({
    tags = [],
    page = 1
}: {
    tags: string[];
    page?: number;
}): Promise<Question[]> {
    // Filter questions based on the tags
    // sleep(1000);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const filteredQuestions = questions.filter((question: Question) => {
        return tags.every((tag) => question.tags.includes(tag));
    });
    return Promise.resolve(filteredQuestions);
}