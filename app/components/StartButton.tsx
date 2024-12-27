'use client'
import React, { Suspense } from 'react';
import { ArrowRight } from 'lucide-react';
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export function goToQuestionsList(searchParams: ReadonlyURLSearchParams, router: AppRouterInstance) {
  // get previous URL to keep the url params
  const params = searchParams.get('tags');
  const url = params ? `/questions?tags=${params}` : '/questions';
  router.push(url);
};

export function Start() {
  const router = useRouter();
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  return (
    <button
      type='button'
      onClick={() => goToQuestionsList(searchParams, router)}
      className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200 group"
    >
      Start Practice
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
    </button>
  );
}

export default function StartButton() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <Start />
    </Suspense>
  )
}