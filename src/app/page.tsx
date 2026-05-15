"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Zap, Target, Shield, Sparkles, BarChart3, Brain, Timer, Activity, Star, Trophy, Flame, ArrowUpRight, ChevronRight } from 'lucide-react';

/* ═══════════════════════════════════════════════════════
   ANIMATED COUNTER — Counts up on scroll into view
   ═══════════════════════════════════════════════════════ */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ═══════════════════════════════════════════════════════
   STAGGER ANIMATION WRAPPER
   ═══════════════════════════════════════════════════════ */
function FadeInWhenVisible({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function LandingPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="overflow-hidden">
      {/* ═══════════════════════════════════════
          HERO SECTION — Cinematic
          ═══════════════════════════════════════ */}
      <section ref={heroRef} className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-7xl mx-auto text-center relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-white text-xs font-bold uppercase tracking-[0.2em] mb-10 backdrop-blur-xl"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
            V2.0 is now live — Built by Akshath Kataria
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-8xl font-black text-white mb-8 tracking-tight font-['Outfit'] leading-[0.95]"
          >
            The future of{' '}
            <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-500 animate-gradient-shift">focus & discipline.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-14 leading-relaxed font-light"
          >
            An immersive productivity operating system designed to help you build discipline, 
            master deep work, and achieve your highest potential.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              href="/dashboard" 
              className="w-full sm:w-auto px-10 py-5 bg-white text-black font-black text-lg rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.03] transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)] group"
            >
              Start Your Ascent
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/blog" 
              className="w-full sm:w-auto px-10 py-5 bg-white/[0.03] text-white font-bold text-lg rounded-2xl border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-xl"
            >
              Read the Guides
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-24 relative max-w-5xl mx-auto"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-white/10 via-white/[0.02] to-white/10 rounded-[2.5rem] blur-2xl opacity-60" />
            <div className="relative rounded-[2rem] overflow-hidden border border-white/[0.08] bg-[#0a0a0a] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">
              <Image 
                src="/images/dashboard-hero.png" 
                alt="Ascend Focus Dashboard — Premium Productivity Platform" 
                width={1200} 
                height={800}
                className="w-full opacity-90"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
            </div>
          </motion.div>
        </motion.div>
        
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-white/[0.03] to-transparent blur-[120px] pointer-events-none" />
      </section>

      {/* ═══════════════════════════════════════
          SOCIAL PROOF — Minimal
          ═══════════════════════════════════════ */}
      <section className="py-20 border-y border-white/[0.03] bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-gray-500 text-[11px] font-black uppercase tracking-[0.4em] mb-12">Trusted by 50,000+ high performers worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-20 grayscale invert">
            <span className="text-2xl font-black italic">LINEAR</span>
            <span className="text-2xl font-black italic">NOTION</span>
            <span className="text-2xl font-black italic">ARC</span>
            <span className="text-2xl font-black italic">HEADSPACE</span>
            <span className="text-2xl font-black italic">STRIPE</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STATISTICS — Animated Counters
          ═══════════════════════════════════════ */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <FadeInWhenVisible delay={0}>
              <h3 className="text-6xl font-black text-white mb-4 font-['Outfit']">
                <AnimatedCounter target={4200000} suffix="+" />
              </h3>
              <p className="text-gray-500 uppercase tracking-[0.2em] text-[11px] font-black">Focus Minutes Logged</p>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.15}>
              <h3 className="text-6xl font-black text-white mb-4 font-['Outfit']">
                <AnimatedCounter target={87} suffix="%" />
              </h3>
              <p className="text-gray-500 uppercase tracking-[0.2em] text-[11px] font-black">Improved Productivity</p>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.3}>
              <h3 className="text-6xl font-black text-white mb-4 font-['Outfit']">
                <AnimatedCounter target={150} suffix="K" />
              </h3>
              <p className="text-gray-500 uppercase tracking-[0.2em] text-[11px] font-black">Goals Achieved Daily</p>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURES — Premium Cards
          ═══════════════════════════════════════ */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeInWhenVisible>
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 font-['Outfit']">Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Peak Performance</span></h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light">Everything you need to master your time and mind, in one unified interface.</p>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Timer, title: "Immersive Focus Mode", desc: "Cinematic timer with ambient soundscapes, breathing effects, and 6 atmosphere themes. Stay in flow for hours.", gradient: "from-rose-500/10 to-transparent" },
              { icon: Trophy, title: "XP & Gamification", desc: "Earn XP, unlock achievements, climb ranks from Initiate to Transcendent. Your discipline, quantified.", gradient: "from-amber-500/10 to-transparent" },
              { icon: Brain, title: "AI Productivity Coach", desc: "Personalized insights, burnout detection, streak analysis, and motivational guidance — all powered locally.", gradient: "from-violet-500/10 to-transparent" },
              { icon: Zap, title: "Neural Execution", desc: "Advanced task tracking with priority weighting, smart routing, and execution velocity metrics.", gradient: "from-cyan-500/10 to-transparent" },
              { icon: Target, title: "Strategic Roadmap", desc: "Map your long-term vision to daily habits and quarterly milestones with intelligent goal tracking.", gradient: "from-emerald-500/10 to-transparent" },
              { icon: Shield, title: "Deep Work Shield", desc: "Distraction-free focus timers integrated with ambient sounds, Spotify, and Zen Mode.", gradient: "from-blue-500/10 to-transparent" },
            ].map((feature, i) => (
              <FadeInWhenVisible key={i} delay={i * 0.08}>
                <div className="p-8 rounded-[2rem] bg-white/[0.015] border border-white/[0.05] hover:border-white/[0.15] transition-all duration-500 group relative overflow-hidden h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.05] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/[0.08] transition-all duration-500 border border-white/[0.05]">
                      <feature.icon className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-500 leading-relaxed text-sm">{feature.desc}</p>
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CONTENT SECTION
          ═══════════════════════════════════════ */}
      <section className="py-32 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <FadeInWhenVisible className="flex-1">
            <span className="px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6 inline-block">Learn & Grow</span>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 font-['Outfit']">More than just a tool. <br/>A lifestyle.</h2>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed font-light">
              Explore our extensive library of guides on Dopamine Detox, Deep Work, and Behavioral Science. We provide the knowledge to match the power of our tools.
            </p>
            <Link href="/blog" className="inline-flex items-center gap-2 text-white font-bold text-lg group">
              Browse the library
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.2} className="flex-1 grid grid-cols-2 gap-4">
            <div className="space-y-4 translate-y-8">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden relative">
                <Image src="https://images.unsplash.com/photo-1516339901600-2e3a82df9fd6?auto=format&fit=crop&q=80&w=400" alt="Productivity mindset and focus techniques guide" fill className="object-cover" />
              </div>
              <div className="aspect-square rounded-3xl overflow-hidden relative">
                <Image src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=400" alt="Deep work techniques and study environment" fill className="object-cover" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="aspect-square rounded-3xl overflow-hidden relative">
                <Image src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=400" alt="Mindfulness and mental clarity practices" fill className="object-cover" />
              </div>
              <div className="aspect-[4/5] rounded-3xl overflow-hidden relative">
                <Image src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=400" alt="Goal setting and habit tracking journal" fill className="object-cover" />
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SEO ARTICLES SECTION (For AdSense)
          ═══════════════════════════════════════ */}
      <section className="py-32 px-6 border-y border-white/[0.03] bg-black/20">
        <div className="max-w-7xl mx-auto">
          <FadeInWhenVisible>
            <div className="flex justify-between items-end mb-16">
              <div className="max-w-2xl">
                <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 inline-block">Knowledge Base</span>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-['Outfit']">Personal Growth & Self-Help Hub</h2>
                <p className="text-gray-400 font-light leading-relaxed">
                  Discover our comprehensive library of research-backed articles on building habits, achieving deep focus, and cultivating unbreakable discipline. 
                  Master the psychology of high performance.
                </p>
              </div>
              <Link href="/blog" className="hidden md:flex items-center gap-2 text-white font-bold hover:text-[var(--color-accent)] transition-colors group border border-white/10 px-6 py-3 rounded-xl hover:bg-white/5">
                View All Articles
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "The Neuroscience of Deep Work: Rewire Your Brain for Extreme Focus",
                excerpt: "Learn how neuroplasticity and structured flow states can permanently increase your attention span and help you accomplish 10x more in less time.",
                category: "Focus & Flow",
                time: "8 min read",
                image: "https://images.unsplash.com/photo-1550592704-6c76defa99ce?auto=format&fit=crop&q=80&w=600",
                color: "text-emerald-400 bg-emerald-400/10"
              },
              {
                title: "Dopamine Detox 101: Reclaiming Your Attention in a Digital World",
                excerpt: "A step-by-step psychological guide to resetting your brain's reward system, breaking social media addiction, and finding joy in hard work.",
                category: "Mental Health",
                time: "12 min read",
                image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=600",
                color: "text-purple-400 bg-purple-400/10"
              },
              {
                title: "Building Unbreakable Discipline: The 1% Better Every Day Strategy",
                excerpt: "Motivation is fleeting, but systems are permanent. Discover the scientifically proven methods to build habits that stick for a lifetime.",
                category: "Habits",
                time: "6 min read",
                image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600",
                color: "text-amber-400 bg-amber-400/10"
              },
              {
                title: "The Morning Routine of High Performers: A Masterclass",
                excerpt: "Analyze the morning rituals of top CEOs, athletes, and creatives. How the first 60 minutes of your day dictates your ultimate success.",
                category: "Self Improvement",
                time: "10 min read",
                image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&q=80&w=600",
                color: "text-rose-400 bg-rose-400/10"
              },
              {
                title: "Top 10 Books on Personal Development and Productivity in 2026",
                excerpt: "Our curated list of must-read books that will radically shift your perspective on time management, emotional intelligence, and wealth creation.",
                category: "Book Summaries",
                time: "15 min read",
                image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600",
                color: "text-blue-400 bg-blue-400/10"
              },
              {
                title: "Overcoming Procrastination: The Psychology of Taking Action",
                excerpt: "Procrastination isn't a time management issue; it's an emotion regulation problem. Here are 5 psychological tools to beat it permanently.",
                category: "Psychology",
                time: "9 min read",
                image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=600",
                color: "text-cyan-400 bg-cyan-400/10"
              }
            ].map((article, i) => (
              <FadeInWhenVisible key={i} delay={i * 0.1}>
                <Link href="/blog" className="block h-full">
                  <div className="rounded-[2rem] bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.15] transition-all duration-500 overflow-hidden group h-full flex flex-col hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                    <div className="h-48 relative overflow-hidden">
                      <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
                    <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${article.color}`}>
                          {article.category}
                        </span>
                        <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{article.time}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[var(--color-accent)] transition-colors leading-snug">{article.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1 font-light">{article.excerpt}</p>
                      <div className="flex items-center text-sm font-bold text-white/70 group-hover:text-white transition-colors">
                        Read Article <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeInWhenVisible>
            ))}
          </div>
          
          <div className="mt-12 flex justify-center md:hidden">
            <Link href="/blog" className="flex items-center gap-2 text-white font-bold hover:text-[var(--color-accent)] transition-colors group border border-white/10 px-6 py-3 rounded-xl hover:bg-white/5">
              View All Articles
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TESTIMONIALS
          ═══════════════════════════════════════ */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeInWhenVisible>
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 font-['Outfit']">Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Achievers</span></h2>
            </div>
          </FadeInWhenVisible>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <FadeInWhenVisible key={i} delay={i * 0.1}>
                <div className="p-8 rounded-[2rem] bg-white/[0.015] border border-white/[0.05] hover:border-white/[0.1] transition-all duration-500 h-full">
                  <div className="flex gap-1 mb-6 text-emerald-500">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-gray-400 text-[15px] mb-8 leading-relaxed italic font-light">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
                      <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{t.name}</p>
                      <p className="text-gray-500 text-[10px] uppercase tracking-[0.15em] font-bold">{t.role}</p>
                    </div>
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FINAL CTA — Cinematic
          ═══════════════════════════════════════ */}
      <section className="py-32 px-6">
        <FadeInWhenVisible>
          <div className="max-w-5xl mx-auto p-12 md:p-24 rounded-[3rem] bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent border border-white/[0.06] text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
            {/* Ambient orbs */}
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-[var(--color-accent)] rounded-full blur-[120px] opacity-10 pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-violet-500 rounded-full blur-[120px] opacity-10 pointer-events-none" />
            
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 font-['Outfit'] relative z-10">Ready to ascend?</h2>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto relative z-10 font-light">Join thousands of others who have reclaimed their focus and transformed their lives.</p>
            <Link 
              href="/dashboard" 
              className="relative z-10 px-12 py-6 bg-white text-black font-black text-xl rounded-2xl inline-flex items-center gap-3 hover:scale-[1.03] transition-all duration-300 shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:shadow-[0_0_80px_rgba(255,255,255,0.3)] group"
            >
              Get Started for Free
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeInWhenVisible>
      </section>
    </div>
  );
}
