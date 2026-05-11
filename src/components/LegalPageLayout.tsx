import React from 'react';

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-white mb-4 font-['Outfit'] tracking-tight">
          {title}
        </h1>
        <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">
          Last Updated: {lastUpdated}
        </p>
      </div>
      
      <div className="prose prose-invert prose-white max-w-none 
        prose-headings:text-white prose-headings:font-bold prose-headings:font-['Outfit']
        prose-p:text-gray-400 prose-p:leading-relaxed prose-p:mb-6
        prose-li:text-gray-400 prose-li:mb-2
        prose-strong:text-white prose-strong:font-bold
        prose-a:text-white prose-a:underline hover:prose-a:text-gray-300 transition-colors
        border-t border-white/10 pt-12">
        {children}
      </div>
    </div>
  );
}
