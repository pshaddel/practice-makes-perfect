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
    tags: string[];
}

export async function getQuestions(tags: string[] = []): Promise<Question[]> {

    // Filter questions based on the tags
    const filteredQuestions = questions.filter((question: Question) => {
        return tags.every((tag) => question.tags.includes(tag));
    });

    return Promise.resolve(filteredQuestions);
}