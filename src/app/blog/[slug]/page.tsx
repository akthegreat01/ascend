import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/data/blog-data';
import { Clock, ArrowLeft, Share2, MessageSquare, X, Globe } from 'lucide-react';
import AdSlot from '@/components/AdSlot';

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  return (
    <article className="max-w-7xl mx-auto py-12 px-6">
      {/* Back Link */}
      <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 group">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-bold uppercase tracking-widest">Back to Articles</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8">
          {/* Header */}
          <div className="mb-12">
            <span className="px-4 py-1.5 rounded-full bg-white text-black text-xs font-black uppercase tracking-widest mb-6 inline-block">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight font-['Outfit']">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-between gap-6 py-8 border-y border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-gray-700 to-gray-500 flex items-center justify-center font-bold text-white">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-white font-bold">{post.author}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">{post.authorRole}</p>
                </div>
              </div>
              <div className="flex items-center gap-8 text-sm text-gray-400 font-medium">
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{post.readTime}</span>
                </div>
                <div>
                  <span>Published on {post.date}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-[450px] md:h-[600px] rounded-[2.5rem] overflow-hidden mb-16 border border-white/10">
            <Image 
              src={post.image} 
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Table of Contents Mockup */}
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 mb-12">
            <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-sm">Table of Contents</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><span className="text-xs opacity-30">01</span> Introduction</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><span className="text-xs opacity-30">02</span> The Core Principles</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><span className="text-xs opacity-30">03</span> Implementation Strategies</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><span className="text-xs opacity-30">04</span> Common Pitfalls</a></li>
            </ul>
          </div>

          {/* Ad Slot */}
          <div className="mb-12">
            <AdSlot format="horizontal" />
          </div>

          {/* Content */}
          <div 
            className="prose prose-invert prose-white max-w-none 
              prose-headings:text-white prose-headings:font-bold prose-headings:font-['Outfit'] prose-headings:mt-12
              prose-p:text-gray-300 prose-p:text-xl prose-p:leading-relaxed prose-p:mb-8
              prose-li:text-gray-300 prose-li:text-xl prose-li:mb-4
              prose-strong:text-white prose-strong:font-bold
              prose-img:rounded-3xl prose-img:border prose-img:border-white/10"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Ad Slot */}
          <div className="my-16">
            <AdSlot format="horizontal" />
          </div>

          {/* FAQ Section */}
          {post.faq && post.faq.length > 0 && (
            <div className="mt-20 pt-20 border-t border-white/10">
              <h2 className="text-3xl font-bold text-white mb-10">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {post.faq.map((item, i) => (
                  <div key={i} className="p-8 rounded-3xl bg-white/[0.03] border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-4">{item.question}</h3>
                    <p className="text-gray-400 text-lg leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Share Buttons */}
          <div className="mt-20 flex items-center gap-6">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Share this article:</span>
            <div className="flex gap-4">
              {[X, MessageSquare, Globe, Share2].map((Icon, i) => (
                <button key={i} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white hover:scale-110 transition-all">
                  <Icon size={20} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-12">
          {/* Ad Slot */}
          <AdSlot format="sidebar" />

          {/* Related Articles */}
          <div>
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
              <div className="w-2 h-8 bg-white rounded-full" />
              Related Articles
            </h3>
            <div className="space-y-8">
              {relatedPosts.map((rp) => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group block">
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10">
                      <Image src={rp.image} alt={rp.title} fill className="object-cover transition-transform group-hover:scale-110" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">{rp.category}</span>
                      <h4 className="text-white font-bold group-hover:text-gray-300 transition-colors line-clamp-2">{rp.title}</h4>
                    </div>
                  </div>
                </Link>
              ))}
              {relatedPosts.length === 0 && (
                <p className="text-gray-500 text-sm italic">No related articles yet.</p>
              )}
            </div>
          </div>

          {/* Newsletter Card */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors" />
            <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Ascend Weekly</h3>
            <p className="text-gray-400 mb-8 relative z-10">Get the latest focus protocols and productivity hacks delivered to your inbox.</p>
            <form className="space-y-4 relative z-10">
              <input 
                type="email" 
                placeholder="email@example.com"
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-white/30 transition-all"
              />
              <button className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all">
                Subscribe Now
              </button>
            </form>
          </div>

          {/* Ad Slot */}
          <AdSlot format="sidebar" />
        </aside>
      </div>
    </article>
  );
}
