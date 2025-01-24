import QuizComponent, { Quiz } from "../components/QuizComponent";
import { getQuestions } from "../actions/getQuestions";

export default async function Practice({ searchParams }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const searchTags = (await searchParams).tags as string;
    const tags = searchTags ? searchTags.split(',') : [];
    const questions = await getQuestions({ tags, page: 1 });
    return (
        <Quiz config={
            {
                questions,
                practice: true
            }
        } />
    );
}