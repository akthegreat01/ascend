import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, User, ChevronRight, Search } from 'lucide-react';

import { blogPosts } from '@/data/blog-data';

const categories = [
  "All", "Productivity", "Focus", "Self Improvement", "Dopamine Detox", "Habits", "Deep Work", "Study Techniques", "Mental Clarity", "Goal Setting", "Time Management"
];

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div>
          <h1 className="text-5xl font-black text-white mb-4 font-['Outfit'] tracking-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Ascend Journal</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Insights, strategies, and science-backed protocols to level up your focus and life.
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search articles..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white/20 transition-all"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-3 overflow-x-auto pb-4 mb-12 no-scrollbar">
        {categories.map((cat) => (
          <button 
            key={cat}
            className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${
              cat === "All" 
                ? "bg-white text-black border-white" 
                : "bg-white/[0.03] text-gray-400 border-white/10 hover:border-white/20 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Post */}
      <div className="mb-16">
        <Link href={`/blog/${blogPosts[0].slug}`} className="group block">
          <div className="relative h-[500px] rounded-[2.5rem] overflow-hidden border border-white/10">
            <Image 
              src={blogPosts[0].image} 
              alt={blogPosts[0].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-10 max-w-3xl">
              <span className="px-4 py-1.5 rounded-full bg-white text-black text-xs font-black uppercase tracking-widest mb-6 inline-block">
                {blogPosts[0].category}
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight group-hover:text-gray-300 transition-colors">
                {blogPosts[0].title}
              </h2>
              <p className="text-lg text-gray-300 mb-8 line-clamp-2">
                {blogPosts[0].excerpt}
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>{blogPosts[0].author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{blogPosts[0].readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.slice(1).map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <div className="flex flex-col h-full bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden hover:border-white/20 transition-all hover:-translate-y-1">
              <div className="relative h-56">
                <Image 
                  src={post.image} 
                  alt={post.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest border border-white/10">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-4">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-700" />
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gray-300 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
                  <span className="text-xs font-medium text-gray-500">{post.author}</span>
                  <ChevronRight size={16} className="text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
