import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';


export default function StartButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  //
  const handleClick = () => {
    // get previous URL to keep the url params
    const params = searchParams.get('tags');
    const url = params ? `/questions?tags=${params}` : '/questions';
    router.push(url);
  };
  return (
    <button
      type='button'
      onClick={handleClick}
      className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200 group"
    >
      Start Practice
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
    </button>
  );
}