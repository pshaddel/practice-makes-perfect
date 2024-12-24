import QuizComponent from "../components/QuizComponent";
import { getQuestions } from "../actions/getQuestions";

export default async function Questions({ searchParams }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const searchTags = (await searchParams).tags as string;
    const tags = searchTags ? searchTags.split(',') : [];
    const questions = await getQuestions(tags);

    return (
        <QuizComponent config={
            {
                questions
            }
        } />
    );
}