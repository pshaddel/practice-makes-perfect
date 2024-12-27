import React from 'react';
import SearchBar from './components/SearchBar';
import Logo from './components/Logo';
import Footer from './components/Footer';
import StartButton from './components/StartButton';
import AnimatedText from './components/AnimatedText';

export default async function HomePage({ searchParams }: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchTags = (await searchParams).tags as string | string[] | undefined;
  let tags: string[] = [];

  if (typeof searchTags === 'string') {
    tags = [searchTags];
  }

  if (Array.isArray(searchTags)) {
    tags = searchTags;
  }

  if (tags.length === 0 || tags[0] === '') {
    tags = [];
  }
  return (
    <div className="min-h-screen bg-gradient-animation flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-5xl mx-auto text-center">
        <Logo />

        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          <AnimatedText texts={['Übung macht den Meister', 'Practice Makes Perfect']} />
        </h1>
        <h1 className="text-2xl font-bold text-gray-900 mb-6 hidden">
          Practice makes perfect
        </h1>
        <h1 className="text-2xl font-bold text-gray-900 mb-6 hidden">
          Übung macht den Meister
        </h1>

        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Wählen Sie Ihre Interessengebiete aus und beginnen Sie mit dem Üben von Deutsche Sprache.
        </p>

        <div className="mb-8">
          <SearchBar autoFocus={true} tags={tags} />
        </div>
        <StartButton />

      </div>

      <Footer />
    </div>
  )
}