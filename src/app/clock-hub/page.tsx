'use client';

import Link from 'next/link';
import { useState } from 'react';

const ClockHub = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-4">🕐 Time Tools Hub</h1>
          <p className="text-xl text-gray-300">Your complete time management solution</p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              id: 'clock',
              icon: '🌍',
              title: 'World Clock',
              desc: 'View time across multiple time zones simultaneously',
              color: 'from-blue-500 to-cyan-500',
              link: '/clock',
            },
            {
              id: 'alarm',
              icon: '⏰',
              title: 'Alarm Clock',
              desc: 'Set and manage alarms for different time zones',
              color: 'from-purple-500 to-pink-500',
              link: '/alarm',
            },
            {
              id: 'timer',
              icon: '⏱',
              title: 'Timer',
              desc: 'Create and manage multiple countdown timers',
              color: 'from-orange-500 to-red-500',
              link: '/timer',
            },
          ].map((card) => (
            <Link
              key={card.id}
              href={card.link}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`backdrop-blur-xl bg-gradient-to-br ${card.color} bg-opacity-10 border-2 border-white/20 rounded-3xl p-8 h-full transition-all duration-300 hover:border-white/40 hover:scale-105 cursor-pointer group`}>
                <div className="text-7xl mb-4 transform group-hover:scale-125 transition-transform">
                  {card.icon}
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">{card.title}</h2>
                <p className="text-gray-300 text-lg">{card.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-blue-400 font-semibold group-hover:gap-4 transition-all">
                  <span>Explore</span>
                  <span className="text-2xl">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Features Section */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-12 mb-12">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">✨ Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🌐', title: 'Global Time Zones', desc: '17+ major time zones' },
              { icon: '⚡', title: 'Real-time Updates', desc: 'Accurate to the second' },
              { icon: '🎨', title: 'Beautiful UI', desc: 'Modern glassmorphism design' },
              { icon: '📱', title: 'Responsive', desc: 'Works on all devices' },
              { icon: '⭐', title: 'Favorites', desc: 'Mark your preferred zones' },
              { icon: '🔔', title: 'Alarms', desc: 'Set timezone-aware alerts' },
              { icon: '⏲', title: 'Timers', desc: 'Multiple timer support' },
              { icon: '🚀', title: 'Fast & Smooth', desc: 'Optimized performance' },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white/10 border border-white/20 rounded-xl p-4 hover:bg-white/15 hover:border-white/40 transition"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="font-bold text-white mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How to Use */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/20 rounded-3xl p-12">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">📖 How to Use</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1️⃣',
                title: 'Choose a Tool',
                desc: 'Select from World Clock, Alarm Clock, or Timer from the options above',
              },
              {
                step: '2️⃣',
                title: 'Configure Settings',
                desc: 'Select time zones, set alarms, or create timers based on your needs',
              },
              {
                step: '3️⃣',
                title: 'Use & Enjoy',
                desc: 'Real-time updates keep everything synchronized automatically',
              },
            ].map((guide, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl mb-4">{guide.step}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{guide.title}</h3>
                <p className="text-gray-300">{guide.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClockHub;
