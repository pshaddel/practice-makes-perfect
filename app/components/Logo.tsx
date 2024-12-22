import React from 'react';
import { Brain } from 'lucide-react';

export default function Logo() {
  return (
    <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-2xl mb-8">
      <Brain className="w-8 h-8 text-blue-500" />
    </div>
  );
}