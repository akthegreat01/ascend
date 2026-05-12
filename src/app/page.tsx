"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Target, Shield, Sparkles, BarChart3, CheckCircle2, Star, Users, ArrowUpRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-widest mb-8"
          >
            V2.0 is now live — Built by Akshath Kataria
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tight font-['Outfit']"
          >
            Level up your <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">focus, discipline</span>, and life.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            The ultimate productivity platform for high performers. scientifically-backed tools to reclaim your attention and achieve your highest potential.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              href="/dashboard" 
              className="w-full sm:w-auto px-10 py-5 bg-white text-black font-black text-lg rounded-2xl flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              Start Your Ascent
              <ArrowRight size={20} />
            </Link>
            <Link 
              href="/blog" 
              className="w-full sm:w-auto px-10 py-5 bg-white/5 text-white font-bold text-lg rounded-2xl border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-3"
            >
              Read the Guides
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-24 relative max-w-5xl mx-auto"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-white/20 via-white/5 to-white/20 rounded-[2.5rem] blur-xl opacity-50" />
            <div className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl">
              <Image 
                src="/images/dashboard-hero.png" 
                alt="Ascend Focus Dashboard" 
                width={1200} 
                height={800}
                className="w-full opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
        
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-white/5 to-transparent blur-[120px] pointer-events-none" />
      </section>

      {/* Social Proof */}
      <section className="py-20 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-gray-500 text-sm font-bold uppercase tracking-[0.3em] mb-12">Trusted by 50,000+ high performers worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-30 grayscale invert">
            {/* Mock logos */}
            <span className="text-2xl font-black italic">LINEAR</span>
            <span className="text-2xl font-black italic">NOTION</span>
            <span className="text-2xl font-black italic">ARC</span>
            <span className="text-2xl font-black italic">HEADSPACE</span>
            <span className="text-2xl font-black italic">STRIPE</span>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <h3 className="text-6xl font-black text-white mb-4 font-['Outfit']">4.2M+</h3>
              <p className="text-gray-500 uppercase tracking-widest text-sm font-bold">Focus Minutes Logged</p>
            </div>
            <div>
              <h3 className="text-6xl font-black text-white mb-4 font-['Outfit']">87%</h3>
              <p className="text-gray-500 uppercase tracking-widest text-sm font-bold">Improved Productivity</p>
            </div>
            <div>
              <h3 className="text-6xl font-black text-white mb-4 font-['Outfit']">150K</h3>
              <p className="text-gray-500 uppercase tracking-widest text-sm font-bold">Goals Achieved Daily</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 font-['Outfit']">Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Peak Performance</span></h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">Everything you need to master your time and mind, in one unified interface.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Zap className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Neural Execution</h3>
              <p className="text-gray-500 leading-relaxed">Advanced task tracking with priority weighting and execution velocity metrics.</p>
            </div>
            <div className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Target className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Strategic Roadmap</h3>
              <p className="text-gray-500 leading-relaxed">Map your long-term vision to daily habits and quarterly milestones with ease.</p>
            </div>
            <div className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Shield className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Deep Work Shield</h3>
              <p className="text-gray-500 leading-relaxed">Distraction-free focus timers integrated with immersive ambient soundscapes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Rich Section */}
      <section className="py-32 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <span className="px-4 py-1.5 rounded-full bg-white/5 text-white text-xs font-black uppercase tracking-widest mb-6 inline-block">Learn & Grow</span>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 font-['Outfit']">More than just a tool. <br/>A lifestyle.</h2>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Explore our extensive library of guides on Dopamine Detox, Deep Work, and Behavioral Science. We provide the knowledge to match the power of our tools.
            </p>
            <Link href="/blog" className="inline-flex items-center gap-2 text-white font-bold text-lg group">
              Browse the library
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="space-y-4 translate-y-8">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden relative">
                <Image src="https://images.unsplash.com/photo-1516339901600-2e3a82df9fd6?auto=format&fit=crop&q=80&w=400" alt="Blog" fill className="object-cover" />
              </div>
              <div className="aspect-square rounded-3xl overflow-hidden relative">
                <Image src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=400" alt="Blog" fill className="object-cover" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="aspect-square rounded-3xl overflow-hidden relative">
                <Image src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=400" alt="Blog" fill className="object-cover" />
              </div>
              <div className="aspect-[4/5] rounded-3xl overflow-hidden relative">
                <Image src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=400" alt="Blog" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 font-['Outfit']">Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Achievers</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Anonymous User",
                role: "Verified Achiever",
                text: "Ascend Focus is the only app that managed to get me off my phone and into a flow state. The velocity tracking is a game changer.",
                avatar: "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LqbHPxZ0WvgZATwWUXecS9EFRdKzU0S7.jpg"
              },
              {
                name: "Anonymous User",
                role: "Verified Achiever",
                text: "The study techniques blog and the habit tracker have literally transformed my grades. I feel so much more in control.",
                avatar: "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LqbHPxZ0WvgZATwWUXecS9EFRdKzU0S7.jpg"
              },
              {
                name: "Anonymous User",
                role: "Verified Achiever",
                text: "I've tried every productivity app. Ascend is the only one that feels like it was designed for how my brain actually works.",
                avatar: "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LqbHPxZ0WvgZATwWUXecS9EFRdKzU0S7.jpg"
              }
            ].map((t, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5">
                <div className="flex gap-1 mb-6 text-emerald-500">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-400 text-lg mb-8 italic">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10">
                    <img src={t.avatar} alt={t.name} />
                  </div>
                  <div>
                    <p className="text-white font-bold">{t.name}</p>
                    <p className="text-gray-500 text-xs uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto p-12 md:p-24 rounded-[3rem] bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 font-['Outfit']">Ready to ascend?</h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">Join thousands of others who have reclaimed their focus and transformed their lives.</p>
          <Link 
            href="/dashboard" 
            className="px-12 py-6 bg-white text-black font-black text-xl rounded-2xl inline-flex items-center gap-3 hover:scale-105 transition-all shadow-[0_0_50px_rgba(255,255,255,0.3)]"
          >
            Get Started for Free
            <ArrowRight size={24} />
          </Link>
        </div>
      </section>
    </div>
  );
}
