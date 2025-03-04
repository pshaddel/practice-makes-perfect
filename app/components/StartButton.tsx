'use client'
import React, { Suspense } from 'react';
import { ArrowRight } from 'lucide-react';
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Link from 'next/link';

export function goToQuestionsList(searchParams: ReadonlyURLSearchParams, router: AppRouterInstance) {
  // get previous URL to keep the url params
  const params = searchParams.get('tags');
  //  const url = params ? `/questions?tags=${params}` : '/questions';
  const url = '/questions' + (params ? `?tags=${params}` : '');

  return url
  // router.push(url);
};

export function Start() {
  const router = useRouter();
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  return (
    <div>


    <button
      type='button'
        className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200 group m-[10px]"
      >
        <Link href={'/practice?tags=' + searchParams.get('tags')} prefetch={true}>
          Start Practicing
        </Link>
      </button>
      <button type='button'
        className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200 group m-[10px]"
      >
      <Link href={goToQuestionsList(searchParams, router)} prefetch={true}>
          Create Quize
      </Link>
    </button>
    </div>
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