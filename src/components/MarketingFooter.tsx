import React from 'react';
import Link from 'next/link';
import { Twitter, Github, Linkedin, Mail } from 'lucide-react';

export default function MarketingFooter() {
  const currentYear = new Date().getFullYear();

  const links = {
    Platform: [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Focus Timer', href: '/timer' },
      { name: 'Habit Tracker', href: '/habits' },
      { name: 'Analytics', href: '/analytics' },
    ],
    Content: [
      { name: 'Blog', href: '/blog' },
      { name: 'Guides', href: '/learn' },
      { name: 'Dopamine Detox', href: '/blog/dopamine-detox-for-students' },
      { name: 'Deep Work', href: '/blog/science-of-deep-work' },
    ],
    Company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Careers', href: '#' },
      { name: 'Brand Kit', href: '#' },
    ],
    Legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookie-policy' },
      { name: 'Disclaimer', href: '/disclaimer' },
    ],
  };

  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                <span className="text-black font-black text-sm">A</span>
              </div>
              <span className="text-lg font-bold tracking-[0.2em] text-white font-['Outfit']">ASCEND FOCUS</span>
            </Link>
            <p className="text-gray-500 max-w-xs mb-8 leading-relaxed">
              Level up your focus, discipline, and life. The ultimate operating system for high performers and lifelong learners.
            </p>
            <div className="flex gap-4">
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 hover:bg-white hover:text-black transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">{title}</h4>
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-gray-500 hover:text-white transition-colors text-sm">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 text-sm">
            © {currentYear} Ascend Focus. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-gray-600 text-xs font-medium uppercase tracking-tighter">System Operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
