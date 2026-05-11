import React from 'react';
import { Target, Users, Shield, Rocket } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-white mb-6 font-['Outfit'] tracking-tight">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Ascend Focus</span>
        </h1>
        <p className="text-xl text-gray-400 leading-relaxed">
          Our mission is to help people improve focus, discipline, productivity, and personal growth through a scientifically-backed digital ecosystem.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Target className="text-white" size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Our Mission</h3>
          <p className="text-gray-400 leading-relaxed">
            We believe that focus is the superpower of the 21st century. In an age of distraction, we provide the tools and knowledge to reclaim your attention and achieve your highest potential.
          </p>
        </div>
        <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Users className="text-white" size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Our Community</h3>
          <p className="text-gray-400 leading-relaxed">
            Ascend Focus is built for students, professionals, and lifelong learners who are committed to continuous improvement and radical accountability.
          </p>
        </div>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-3xl font-bold text-white mb-6">Why Ascend Focus?</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            Most productivity tools are just digital versions of paper planners. Ascend Focus is different. We combine behavioral psychology, neurobiology, and elegant design to create a "Life Operating System" that actually works with your brain, not against it.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Scientifically-backed focus protocols",
              "Dopamine-optimized habit tracking",
              "Deep work integration",
              "Personalized productivity insights"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-white/80">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="pt-12 border-t border-white/10">
          <h2 className="text-3xl font-bold text-white mb-6">Our Commitment to Quality</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            We are dedicated to providing high-value, original content and tools. Our platform is continuously evolving based on the latest research in human performance and user feedback. We don't just build software; we build systems for life.
          </p>
        </section>
      </div>
    </div>
  );
}
