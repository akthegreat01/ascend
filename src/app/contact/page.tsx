"use client";

import React, { useState } from 'react';
import { Mail, MessageSquare, X, GitBranch, Globe, Send, ChevronDown, ChevronUp, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "Is Ascend Focus free to use?",
    answer: "Ascend Focus offers a robust free tier that includes basic task management, habit tracking, and focus timers. Our Pro Elite plan provides advanced analytics, AI-driven insights, and exclusive content."
  },
  {
    question: "How do I sync my data across devices?",
    answer: "Your data is automatically synced to your account in real-time. Simply log in on any device to access your personalized dashboard and progress."
  },
  {
    question: "Can I use Ascend Focus offline?",
    answer: "Yes, our platform is designed as a PWA (Progressive Web App), allowing you to manage your tasks and focus sessions even without an internet connection. Data will sync once you're back online."
  },
  {
    question: "Is my data secure?",
    answer: "Security is our top priority. We use industry-standard encryption and follow strict privacy protocols to ensure your data remains yours and yours alone."
  }
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="max-w-6xl mx-auto py-20 px-6">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-white mb-6 font-['Outfit'] tracking-tight">
          Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Touch</span>
        </h1>
        <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
          Have questions or feedback? We'd love to hear from you. Reach out to our team or find answers in our FAQ.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        {/* Contact Form */}
        <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10">
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-1">Full Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white focus:outline-none focus:border-white/30 transition-all" 
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-1">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white focus:outline-none focus:border-white/30 transition-all" 
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Subject</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white focus:outline-none focus:border-white/30 transition-all" 
                placeholder="How can we help?"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Message</label>
              <textarea 
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white focus:outline-none focus:border-white/30 transition-all resize-none" 
                placeholder="Your message here..."
              />
            </div>
            <button className="w-full py-4 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-all group">
              Send Message
              <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* Info & Socials */}
        <div className="flex flex-col justify-between">
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors cursor-pointer group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Email Us</p>
                    <p className="text-lg">support@ascendfocus.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors cursor-pointer group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Vision & Partnerships</p>
                    <p className="text-lg">akshath@ascendfocus.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors cursor-pointer group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Chat with Us</p>
                    <p className="text-lg">Available 24/7 in-app</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Connect with Us</h3>
              <div className="flex gap-4">
                {[
                  { icon: X, href: "#" },
                  { icon: GitBranch, href: "#" },
                  { icon: Globe, href: "#" }
                ].map((social, i) => (
                  <a 
                    key={i} 
                    href={social.href} 
                    className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white hover:scale-110 transition-all"
                  >
                    <social.icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden"
            >
              <button 
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/[0.02] transition-all"
              >
                <span className="text-lg font-semibold text-white">{faq.question}</span>
                {openFaq === i ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-5 text-gray-400 leading-relaxed"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
