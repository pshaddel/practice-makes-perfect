'use client'
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import Logo from './components/Logo';
import Footer from './components/Footer';
import StartButton from './components/StartButton';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-5xl mx-auto text-center">
        <Logo />

        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Übung macht den Meister
        </h1>

        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Wählen Sie Ihre Interessengebiete aus und beginnen Sie mit dem Üben von Deutsche Sprache.
        </p>

        <div className="mb-8">
          <SearchBar autoFocus={true} />
        </div>
        <StartButton />

      </div>

      <Footer />
    </div>
  );
}